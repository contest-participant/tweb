import PopupElement from '.';
import {i18n} from '../../lib/langPack';
import Button from '../button';
import {StreamCredential} from '../groupCall/streamCredential';
import Icon from '../icon';
import {toastNew} from '../toast';

export function RevokeButton() {
  const container = document.createElement('button');
  container.classList.add('revoke-button');
  const left = Icon('rotate_left', 'tgico');

  const center = document.createElement('div');
  center.append(i18n('LiveStream.StreamSettings.RevokeKey'));

  const right = document.createElement('div');

  container.append(left, center, right);
  return container;
}


export default class PopupStreamSettings extends PopupElement {
  setStreamUrl: (key: string) => void;
  setStreamKey: (key: string) => void;

  constructor(credentials: {key: string, url: string}, public peerId: number, public onNewCredentials: (credentials: {key: string, url: string}) => void, endLiveStream: () => void) {
    super('popup-stream-settings', {
      overlayClosable: true,
      title: 'LiveStream.Menu.StreamSettings',
      closable: true
    });


    const fragment = document.createDocumentFragment();

    const p = document.createElement('p');
    p.append(i18n('LiveStream.StreamWith.TopText'));
    fragment.append(p);
    const [streamUrl, setStreamUrl] = StreamCredential(credentials.url, 'url');
    const [streamKey, setStreamKey] = StreamCredential(credentials.key, 'key');
    this.setStreamUrl = setStreamUrl;
    this.setStreamKey = setStreamKey;
    fragment.append(streamUrl);
    fragment.append(streamKey);

    const revokeButton = RevokeButton();
    revokeButton.addEventListener('click', this.revokeKey.bind(this));

    fragment.append(revokeButton);

    const endButton = Button('btn-primary btn-color-primary end-live-stream-button', {text: 'LiveStream.StreamSettings.EndLiveStream'});
    endButton.addEventListener('click', () => {
      endLiveStream();
      this.hide();
    });
    fragment.append(endButton);

    this.header.after(fragment);
  }

  isRevoking = false
  async revokeKey() {
    const {key, url} = await this.managers.appChatsManager.getRtmpCredentials(this.peerId, true);
    this.onNewCredentials({key, url});
    this.setStreamKey(key);
    this.setStreamUrl(url);
    toastNew({langPackKey: 'LiveStream.StreamSettings.KeyRevoked'});
  }
}
