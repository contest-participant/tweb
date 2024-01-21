import ButtonIcon from './buttonIcon';
import {avatarNew} from './avatarNew';
import {getMiddleware} from '../helpers/middleware';
import apiManagerProxy from '../lib/mtproto/mtprotoworker';
import ProgressivePreloader from './preloader';
import {AppManagers} from '../lib/appManagers/managers';
import getPeerPhoto from '../lib/appManagers/utils/peers/getPeerPhoto';
import Icon from './icon';
import VolumeSelector from './volumeSelector';
import ListenerSetter from '../helpers/listenerSetter';
import appMediaPlaybackController from './appMediaPlaybackController';
import ButtonMenuToggle from './buttonMenuToggle';
import {i18n} from '../lib/langPack';
import {ButtonMenuItemOptionsVerifiable} from './buttonMenu';
import rootScope from '../lib/rootScope';
import {GroupCallStreamChannel, InputGroupCall} from '../layer';
import bigInt from 'big-integer';
import noop from '../helpers/noop';
import LiveStreamPipBar from './liveStreamPipBar';
import PopupElement from './popups';
import PopupStreamSettings from './popups/streamSettings';
import {StreamCredential} from './groupCall/streamCredential';
import PopupStreamOutputDevice from './popups/streamOutputDevice';
import PopupStreamRecording from './popups/streamRecording';
import {IS_SAFARI} from '../environment/userAgent';
import PopupPeer from './popups/peer';
import {toastNew} from './toast';
import appNavigationController, {NavigationItem} from './appNavigationController';
import hasRights from '../lib/appManagers/utils/chats/hasRights';

const CLASS = 'live-stream-view'
const CLASS_PREFIX = CLASS + '-';

function Spacer() {
  const spacer = document.createElement('div');
  spacer.classList.add(CLASS_PREFIX + 'spacer');
  return spacer;
}

function Preloader() {
  const preloader = new ProgressivePreloader({cancelable:false});
  preloader.constructContainer({color: 'transparent', bold: true});
  preloader.construct();
  preloader.preloader.classList.add('is-visible', 'will-animate', CLASS_PREFIX + 'no-stream-preloader');
  return preloader.preloader;
}

function Oops() {
  const oops = document.createElement('div');
  oops.classList.add(CLASS_PREFIX + 'oops')
  const container = document.createElement('div')
  container.classList.add(CLASS_PREFIX + 'oops-container')
  oops.append(container);
  {
    const div = document.createElement('div')
    div.classList.add(CLASS_PREFIX + 'X')
    div.append(Preloader());
    div.append(i18n('LiveStream.NoStream.Title'));
    container.append(div)
  }
  {
    const div = document.createElement('div');
    div.append(i18n('LiveStream.NoStream.Description'));
    container.append(div);
  }

  const [streamUrl, setStreamUrl] = StreamCredential('', 'url')
  const [streamKey, setStreamKey] = StreamCredential('', 'key')
  container.append(streamUrl, streamKey);

  return {
    element: oops,
    setCredentials({url, key}: {url: string, key: string}) {
      setStreamUrl(url);
      setStreamKey(key);
    }
  };
}

const lastFrames = new Map<number, Blob>();

export class LiveStreamView {
  public container: HTMLElement;
  public avatar: ReturnType<typeof avatarNew>
  public cover: HTMLImageElement
  public peerName: HTMLElement;
  public closeButton: HTMLButtonElement;
  public video: HTMLVideoElement;
  public open = false;
  public videoContainer: HTMLElement;
  public oops: {element: HTMLElement, setCredentials(credentials: {url: string, key: string}): void};
  public status: HTMLElement;
  public watchCounter: HTMLElement;
  public menuToggle: HTMLElement;
  public right: HTMLElement;
  public onClose = () => {};
  public call: InputGroupCall.inputGroupCall | null = null;
  public pipButton: HTMLButtonElement;
  public isRecording: boolean;
  public shareButton: HTMLButtonElement

  constructor(public peerId: PeerId, public managers: AppManagers, public listenerSetter: ListenerSetter, public pipBar: LiveStreamPipBar) {
    this.container = document.createElement('div');
    this.container.classList.add(CLASS);
    this.hideContainer();

    const header = document.createElement('div');
    header.classList.add(CLASS_PREFIX + 'header');
    const left = document.createElement('div');
    left.classList.add(CLASS_PREFIX + 'header-left')
    const mw = getMiddleware()
    const avatar = this.avatar = avatarNew({
      middleware: (mw.get().create()).get(),
      size: 44,
      peerId: this.peerId
    });
    const info = document.createElement('div');
    info.classList.add(CLASS_PREFIX + 'header-info');

    {
      const peerName = document.createElement('span')
      peerName.classList.add('peer-title');
      this.peerName = peerName;
      info.append(this.peerName);

      const subtitle = document.createElement('span');
      subtitle.classList.add(CLASS_PREFIX + 'header-subtitle');
      subtitle.append(i18n('LiveStream.Streaming'));
      info.append(subtitle);
    }

    this.avatar.node.classList.add(CLASS_PREFIX + 'header-avatar');
    left.append(avatar.node);
    left.append(info);
    header.append(left);
    {
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add(CLASS_PREFIX + 'buttons');

      buttonContainer.append(this.shareButton = ButtonIcon('forward', {noRipple: true}));
      this.shareButton.addEventListener('click', async() => {
        const link = await this.getShareLink();
        if(link) {
          await navigator.clipboard.writeText(link);
          toastNew({langPackKey: 'LiveStream.LinkCopied'});
        }
      });
      this.shareButton.hidden = true;

      const closeButton = ButtonIcon('close', {noRipple:true});
      this.closeButton = closeButton;
      buttonContainer.append(closeButton);

      closeButton.addEventListener('click', this.onCloseClick.bind(this));

      header.append(buttonContainer);
    }

    this.container.append(header);

    const videoContainer = this.videoContainer = document.createElement('div');
    const cover = this.cover = document.createElement('img');
    videoContainer.append(cover);
    videoContainer.classList.add(CLASS_PREFIX + 'video-container', CLASS_PREFIX + 'video-container-loading');
    videoContainer.append(this.video = document.createElement('video'));
    this.video.addEventListener('click', (e)=>{
      e.preventDefault();
    });
    this.video.addEventListener('pause', (e)=>{
      e.preventDefault();
    });
    this.video.addEventListener('leavepictureinpicture', () => {
      this.pipBar.hide();
    });
    this.video.addEventListener('enterpictureinpicture', () => {
      const peerTitle = apiManagerProxy.getChat(this.peerId.toChatId()).title;
      this.pipBar.show(peerTitle, this.watchCount);
    });
    videoContainer.append((this.oops = Oops()).element);
    this.addListeners();

    {
      const bottomBar = document.createElement('div');
      bottomBar.classList.add(CLASS_PREFIX + 'video-container-bottom-bar');

      const left = document.createElement('div');
      left.classList.add('left');

      const status = this.status = document.createElement('div');
      status.append(i18n('LiveStream.Live'));
      status.classList.add(CLASS_PREFIX + 'video-container-bottom-bar-status')
      left.append(status);

      const volumeSelector = new VolumeSelector(listenerSetter);
      volumeSelector.btn.classList.remove('btn-icon');
      left.append(volumeSelector.btn);

      const watchCounter = this.watchCounter = document.createElement('span');
      left.append(watchCounter);

      const right = this.right = document.createElement('div');
      right.classList.add('right');

      const pipButton = this.pipButton = document.createElement('button');
      pipButton.classList.add('video-container-button');
      pipButton.append(Icon('pip', 'tgico'));
      pipButton.disabled = true;

      const fullScreenButton = document.createElement('button');
      fullScreenButton.classList.add('video-container-button');
      let icon = Icon('fullscreen', 'tgico');
      fullScreenButton.append(icon);
      let timeout: ReturnType<typeof setTimeout> | null = null;
      document.addEventListener('mousemove', () => {
        if(!this.open) {
          return;
        }
        this.videoContainer.style.cursor = 'default';
        const fsElement = document.fullscreenElement;
        if(!fsElement || fsElement != this.videoContainer) {
          return;
        }
        if(timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          this.videoContainer.style.cursor = 'none';
        }, 2500);
      });
      document.addEventListener('fullscreenchange', () => {
        if(!this.open) {
          return;
        }
        if(document.fullscreenElement) {
          icon.remove();
          icon = Icon('smallscreen', 'tgico');
          fullScreenButton.append(icon);
        } else {
          icon.remove();
          icon = Icon('fullscreen', 'tgico');
          fullScreenButton.append(icon);
          this.videoContainer.style.cursor = 'default';
        }
      });
      fullScreenButton.addEventListener('click', () => {
        if(document.fullscreenElement) {
          document.exitFullscreen();
        }
        return this.videoContainer.requestFullscreen();
      });

      pipButton.addEventListener('click', ()=>{
        if(document.fullscreenElement) {
          document.exitFullscreen();
        }
        return this.video.requestPictureInPicture();
      });
      this.menuToggle = ButtonMenuToggle({
        container: this.getMenuToggleContainer(),
        direction: 'top-left',
        buttons: this.initialMenuButtons
      });
      right.append(this.menuToggle);
      right.append(pipButton);
      right.append(fullScreenButton);

      bottomBar.append(left);
      bottomBar.append(right);
      videoContainer.append(bottomBar);
    }

    this.video.addEventListener('enterpictureinpicture', () => {
      this.hideContainer(true);
    });
    this.video.addEventListener('leavepictureinpicture', () => {
      this.open && this.showContainer(true);
    });

    this.container.append(videoContainer);
    this.container.append(Spacer());
  }

  watchCount = 0;
  setWatchCount(watchCount: number) {
    this.watchCounter.textContent = `${new Intl.NumberFormat().format(this.watchCount = watchCount)} watching`
    this.pipBar.setWatchCount(watchCount);
  }

  navigationItem: NavigationItem = {
    type: 'media',
    onPop: () => {
      if(!this.open) {
        return;
      }
      this.onCloseClick()
      if(this.canEnd()) {
        return false;
      }
      return true;
    }
  }

  show(watchCount: number) {
    if(this.open) {
      return;
    }
    this.setWatchCount(watchCount);
    this.cover.hidden = false;
    this.showContainer();
    appNavigationController.pushItem(this.navigationItem);
    this.open = true;
    this.video.addEventListener('loadeddata', () => {
      this.cover.hidden = true;
      this.pipButton.disabled = false;
      this.video.classList.add('active');
      this.videoContainer.classList.remove(CLASS_PREFIX + 'video-container-loading');
      this.setIsLive(true);

      const interval = setInterval(
        () => {
          if(!this.#streaming) {
            clearInterval(interval);
          }
          this.updateLastFrame();
        },
        2500
      )
    }, {once: true});
  }

  hide() {
    if(this.open) {
      return;
    }
    this.setIsLive(false);
    this.setOopsVisible(false, {url: '', key: ''});
    this.hideContainer();
    this.video.classList.remove('active');
  }

  close(discard?: boolean) {
    this.open = false;
    document.exitPictureInPicture().catch(noop);
    this.pipButton.disabled = true;
    this.hide();
    this.video.src = '';
    if(this.call) {
      this.managers.appGroupCallsManager.hangUp(this.call.id, discard).catch(noop);
    }
  }

  async setPeerId(peerId: PeerId) {
    if(this.open) {
      return;
    }
    this.peerId = peerId;
    this.avatar.render({peerId})
    this.peerName.textContent = await this.managers.appChatsManager.getChat(this.peerId.toChatId()).then(v=>'title' in v ? v.title : '');
    (async() => {
      await this.updateMenuButtons();
      const peer = await this.managers.appPeersManager.getPeer(peerId);
      const lastFrame = lastFrames.get(peerId);
      if(lastFrame) {
        const url = URL.createObjectURL(lastFrame);
        const errorListener = async(e: any) => {
          console.error(e)
          if(peerId != this.peerId) {
            return;
          }
          const avatar = await this.managers.appAvatarsManager.loadAvatar(peerId, getPeerPhoto(peer), 'photo_big');
          this.cover.src = avatar;
          URL.revokeObjectURL(url);
        };
        this.cover.addEventListener('error', errorListener, {once:true});
        this.cover.addEventListener('load', () => {
          this.cover.removeEventListener('error', errorListener);
          URL.revokeObjectURL(url);
        }, {once: true});
        this.cover.src = url;
      } else {
        const avatar = await this.managers.appAvatarsManager.loadAvatar(peerId, getPeerPhoto(peer), 'photo_big');
        this.cover.src = avatar;
      }
    })()
  }

  setOopsVisible(oopsVisible: boolean, credentials: {url: string, key: string}) {
    this.oops.setCredentials(credentials);
    if(oopsVisible) {
      this.videoContainer.classList.remove(CLASS_PREFIX + 'video-container-loading');
      this.oops.element.classList.add(CLASS_PREFIX + 'oops-visible');
    } else {
      this.videoContainer.classList.add(CLASS_PREFIX + 'video-container-loading');
      this.oops.element.classList.remove(CLASS_PREFIX + 'oops-visible');
    }
  }

  setIsLive(isLive: boolean) {
    if(isLive) {
      this.status.classList.add('LIVE');
    } else {
      this.status.classList.remove('LIVE')
    }
  }

  initialMenuButtons: Array<ButtonMenuItemOptionsVerifiable>  = IS_SAFARI ? [] : [
    {icon: 'volume_up', text: 'LiveStream.Menu.OutputDevice', onClick: async() => {
      PopupElement.createPopup(PopupStreamOutputDevice, await navigator.mediaDevices.enumerateDevices(), 'sinkId' in this.video ? this.video.sinkId as string : '', this.video).show();
    }}
  ];
  getMenuToggleContainer() {
    const container = document.createElement('button');
    container.classList.add('video-container-button');
    container.append(Icon('more', 'tgico'));
    return container;
  }

  async endLiveStream() {
    await this.managers.appGroupCallsManager.hangUp(this.call.id, true);
  }

  async updateMenuButtons() {
    if(await this.getShareLink()) {
      this.shareButton.hidden = false;
    }
    const buttons = new Array(...this.initialMenuButtons);
    if(await this.managers.appChatsManager.hasRights(this.peerId.toChatId(), 'delete_chat')) {
      buttons.push(
        this.isRecording ? {icon: 'radiooff', text: 'LiveStream.Menu.StopRecording', onClick: ()=>{
          this.managers.appGroupCallsManager.toggleRecord(this.call.id, false).then(()=>{
            this.isRecording = false;
            return this.updateMenuButtons()
          });
        }, danger: true} : {icon: 'radioon', text: 'LiveStream.Menu.StartRecording', onClick: () => {
          PopupElement.createPopup(PopupStreamRecording, this.call.id).show();
        }},
        {icon: 'settings', text: 'LiveStream.Menu.StreamSettings', onClick: async() => {
          const credentials = await this.managers.appChatsManager.getRtmpCredentials(this.peerId);
          PopupElement.createPopup(PopupStreamSettings, credentials, this.peerId, (credentials)=>{
            this.oops.setCredentials(credentials);
          }, this.endLiveStream.bind(this)).show();
        }},
        {icon: 'crossround', text: 'LiveStream.Menu.EndLiveStream', onClick: this.endLiveStream.bind(this), danger: true}
      )
    }
    this.menuToggle.remove();
    this.menuToggle = ButtonMenuToggle({
      container: this.getMenuToggleContainer(),
      direction: 'top-left',
      buttons
    });
    this.right.prepend(this.menuToggle)
    return buttons;
  }

  addListeners() {
    this.listenerSetter.add(appMediaPlaybackController)('playbackParams', ({volume}) => {
      this.video.volume = volume;
    });

    this.listenerSetter.add(rootScope)('chat_full_update', async(peerId)=> {
      if(this.peerId === peerId) {
        const chatFull = await this.managers.appProfileManager.getChatFull(this.peerId.toChatId())
        if('call' in chatFull) {
          const groupCall = await this.managers.appGroupCallsManager.getGroupCallFull(chatFull.call.id)
          if(groupCall._ == 'groupCall') {
            this.setWatchCount(groupCall.participants_count);
            this.isRecording = groupCall.pFlags.record_video_active;
            await this.updateMenuButtons();
          }
        }
      }
    });

    this.listenerSetter.add(rootScope)('group_call_update', async(groupCall) => {
      if(this.open && this.call && groupCall.id == this.call.id) {
        if(groupCall._ == 'groupCallDiscarded') {
          this.close()
        } else {
          this.setWatchCount(groupCall.participants_count);
          this.isRecording = groupCall.pFlags.record_video_active;
          await this.updateMenuButtons();
        }
      }
    })
  }

  async joinGroupCall() {
    const fullChannel = await this.managers.appProfileManager.getChatFull(
      this.peerId.toChatId()
    );
    if(fullChannel._ == 'channelFull' && 'call' in fullChannel) {
      const {id} = fullChannel.call;
      await this.managers.appGroupCallsManager.joinGroupCall(
        id,
        {
          _: 'dataJSON',
          data: JSON.stringify({ssrc: (Math.random() * 10_000) | 0})
        },
        {type: 'main'}
      );
      this.call = await this.managers.appGroupCallsManager.getGroupCallInput(id);
    }
  }

  #streaming = false
  onStartStreaming = () => {}
  async startStreaming() { // just in case
    if(this.#streaming) {
      return;
    }
    this.#streaming = true;
    await this.joinGroupCall();
    this.onStartStreaming();
    this.video.src = `/livestream/${this.call.id}`;
    this.video.play().catch(noop);
    try {
      let status: 'restart' | 'rejoin' | null = null;
      do {
        if(status == 'rejoin') {
          await this.joinGroupCall();
          if(!this.call) {
            break;
          }
        }
        status = await this.startStreamingInner();
      } while(status != null);
    } finally {
      this.#streaming = false;
    }
  }

  async startStreamingInner() {
    let channel: GroupCallStreamChannel.groupCallStreamChannel | null = null
    for(let i = 0; i < Infinity; i++) {
      if(!this.open) {
        return;
      }
      try {
        const streamChannels = await this.managers.apiManager.invokeApi(
          'phone.getGroupCallStreamChannels',
          {call: this.call}
        );
        channel = streamChannels.channels.find(v=>v.channel == 1);
        if(!channel) {
          if(i == 5) {
            const canGetCredentials = await this.managers.appChatsManager.hasRights(this.peerId.toChatId(), 'delete_chat');
            if(canGetCredentials) {
              const credentials = await this.managers.appChatsManager.getRtmpCredentials(this.peerId);
              this.setOopsVisible(true, credentials);
            }
          }
          await new Promise(r => setTimeout(r, i > 5 ? 4_000 : 2_000));
          continue;
        }
        this.setOopsVisible(false, {url: '', key: ''});
        break
      } catch(err) {
        if(err && typeof err == 'object' && 'type' in err && err.type == 'GROUP_CALL_INVALID') {
          const [call_, inputCall] = await Promise.all([
            this.managers.appGroupCallsManager.getGroupCallFull(this.call.id),
            this.managers.appGroupCallsManager.getGroupCallInput(this.call.id)
          ]);
          if(!call_  || !inputCall || call_._ == 'groupCallDiscarded') {
            this.isRecording = false;
            this.close();
            return;
          }
          this.call = inputCall
        }
      }
    }
    const callFull =
      await this.managers.appGroupCallsManager.getGroupCallFull(this.call.id);
    if(callFull._ == 'groupCallDiscarded') {
      this.close();
      return;
    }
    const dc = callFull.stream_dc_id;
    if(!dc) {
      return;
    }

    let ts = bigInt(channel.last_timestamp_ms + '');

    let first = true;
    const onFetch = async(chunk: Uint8Array, ts: string) => {
      const promise = this.managers.apiFileManager.appendLiveStreamChunk(chunk, this.call.id + '', ts);
      if(first) {
        await promise;
        first = false;
      }
    }

    while(this.open) {
      try {
        const then = performance.now();
        const chunk =
          await this.managers.appGroupCallsManager.getLiveStreamPart(this.call.id, ts + '', dc);
        const timeElapsed = performance.now() - then;
        onFetch(chunk, ts + '').catch((err) => {
          console.error('Live stream onFetch error', err);
        });
        if(timeElapsed <= 800) {
          await new Promise(r => setTimeout(r, 1000 - timeElapsed));
        }
        ts = ts.add(1000);
      } catch(err) {
        if(err && typeof err === 'object' && 'type' in err) {
          const err_ = (err as any).type;
          if(err_ == 'GROUPCALL_JOIN_MISSING') {
            return 'rejoin'; // should rejoin
          } else if(err_ == 'TIME_TOO_BIG') {
            return 'restart'; // should get ts again
          }
        }
        console.error('Live stream error', err, err && typeof err === 'object' && 'type' in err);
        continue;
      }
    }
  }

  canEnd() {
    return hasRights(apiManagerProxy.getChat(this.peerId.toChatId()), 'manage_call');
  }

  async getShareLink() {
    const chat = await this.managers.appChatsManager.getChat(this.peerId.toChatId());
    if(chat && chat._ == 'channel') {
      const username = chat.username || chat.usernames?.[0];
      if(username) {
        return `https://t.me/${username}?livestream`
      }
    }
    return null;
  }

  private onCloseClick() {
    if(!(this.canEnd())) {
      setTimeout(() => appNavigationController.back('media'), 0);
      this.close();
      this.onClose();
      return;
    }
    PopupElement.createPopup(PopupPeer, 'popup-end-video-chat popup-live-stream-end', {
      titleLangKey: 'VoiceChat.End.Title',
      descriptionLangKey: 'VoiceChat.End.Text',
      checkboxes: [{
        text: 'VoiceChat.End.Third'
      }],
      buttons: [{
        langKey: 'VoiceChat.End.OK',
        callback: (_e, checkboxes) => {
          setTimeout(() => appNavigationController.back('media'), 0);
          this.close(!!checkboxes.size);
          this.onClose();
        },
        isDanger: true
      }]
    }).show();
  }

  hideContainer(pip = false) {
    if(pip) {
      this.container.classList.add(CLASS_PREFIX + 'hidden');
    } else {
      this.container.remove();
    }
  }

  showContainer(pip = false) {
    if(pip) {
      this.container.classList.remove(CLASS_PREFIX + 'hidden');
    } else {
      document.body.append(this.container);
    }
  }

  updateLastFrame() {
    if(!this.#streaming) {
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
    canvas.toBlob((blob) => {
      if(!blob) return;
      lastFrames.set(this.peerId, blob);
    });
  }
}
