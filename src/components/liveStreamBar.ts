import {AppManagers} from '../lib/appManagers/managers';
import {i18n} from '../lib/langPack';
import Button from './button';
import {LiveStreamView} from './liveStreamView';
import LiveStreamPipBar from './liveStreamPipBar';
import ListenerSetter from '../helpers/listenerSetter';

export default class LiveStreamBar {
  public container: HTMLElement;
  public subtitle: HTMLSpanElement;
  public watchCountI18n?: HTMLElement;
  public joinButton: HTMLButtonElement;
  public liveStreamView: LiveStreamView;

  constructor(public peerId: PeerId, public managers: AppManagers, public pipBar: LiveStreamPipBar, public listenerSetter: ListenerSetter) {
    const element = document.createElement('div');
    element.classList.add('live-stream-bar');

    const container = document.createElement('div');
    container.classList.add('live-stream-bar-container');

    const left = document.createElement('div');
    left.classList.add('left');

    const title = document.createElement('span');
    title.append(i18n('PeerInfo.Action.LiveStream'));
    title.classList.add('title');
    this.subtitle = document.createElement('span');
    this.subtitle.classList.add('subtitle');

    left.append(title, this.subtitle);
    container.append(left);

    this.joinButton = Button('btn-primary', {text: 'ChannelJoin'});
    container.append(this.joinButton);

    element.append(container);

    this.liveStreamView = new LiveStreamView(this.peerId, this.managers, listenerSetter, pipBar);
    this.liveStreamView.onClose = async() => {
      const chatFull = await this.managers.appProfileManager.getChatFull(this.peerId.toChatId());
      if('call' in chatFull && chatFull.call) {
        this.container.classList.add('visible')
      }
    };
    this.liveStreamView.onStartStreaming = () => {
      if(this.liveStreamView.peerId == this.peerId) {
        this.hide();
      }
    }
    this.container = element;

    this.joinButton.addEventListener('click', async() => {
      if(this.liveStreamView.open) {
        this.liveStreamView.close();
      }
      this.liveStreamView.close();
      this.liveStreamView.setPeerId(this.peerId);
      this.liveStreamView.show(this.watchCount);
      this.liveStreamView.startStreaming();
    });

    document.body.append(this.container);
  }

  show(watchCount: number) {
    this.updateWatchCount(watchCount);
    if(!this.liveStreamView.open || this.liveStreamView.peerId != this.peerId) {
      this.container.classList.add('visible');
    }
  }

  hide() {
    this.container.classList.remove('visible');
    if(!this.liveStreamView.open) {
      this.pipBar.hide();
      this.liveStreamView.hide();
    }
  }

  watchCount = 0
  updateWatchCount(watchCount: number) {
    this.watchCount = watchCount;
    this.watchCountI18n?.remove();
    this.watchCountI18n = i18n('LiveStream.WatchCount', [new Intl.NumberFormat().format(this.watchCount)]);
    this.subtitle.append(this.watchCountI18n);
  }

  setPeerId(peerId: PeerId) {
    this.peerId = peerId;
    this.liveStreamView.setPeerId(peerId);
  }
}
