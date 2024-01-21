import PopupElement from '.';
import {i18n} from '../../lib/langPack';
import Button from '../button';
import {StreamCredential} from '../groupCall/streamCredential';

export default class PopupStreamWith extends PopupElement {
  protected description: HTMLParagraphElement;

  constructor(credentials: {key: string, url: string}, onStart: () => void) {
    super('popup-stream-with', {
      overlayClosable: true,
      title: 'LiveStream.StreamWith',
      closable: true
    });


    const fragment = document.createDocumentFragment();

    const p = document.createElement('p');
    p.append(i18n('LiveStream.StreamWith.TopText'));
    fragment.append(p);
    fragment.append(StreamCredential(credentials.url, 'url')[0]);
    fragment.append(StreamCredential(credentials.key, 'key')[0]);

    const p2 = document.createElement('p');
    p2.append(i18n('LiveStream.StreamWith.BottomText'));
    fragment.append(p2);

    const startButton = Button('btn-primary btn-color-primary', {text: 'LiveStream.StreamWith.StartStreaming'});
    startButton.onclick = () => {
      onStart();
      this.hide();
    };

    fragment.append(startButton);

    this.header.after(fragment);
  }
}
