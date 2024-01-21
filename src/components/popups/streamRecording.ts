import PopupElement from '.';
import {i18n} from '../../lib/langPack';
import Button from '../button';
import CheckboxField from '../checkboxField';
import InputField from '../inputField';
import Row from '../row';
import {AudioFile, VideoOrientation} from './streamRecordingAssets';

export default class PopupStreamRecording extends PopupElement {
  public titleField: InputField;
  public isPortrait: boolean;
  public video: boolean;

  constructor(callId: string | number) {
    super('popup-stream-recording', {
      overlayClosable: true,
      title: 'LiveStream.Menu.StartRecording',
      closable: true
    });

    const div = document.createElement('div');

    const inputField = this.titleField = new InputField({label: 'LiveStream.Recording.Title', autocomplete: 'off'});

    div.append(inputField.container);

    const div2 = document.createElement('div');
    div2.classList.add('popup-stream-recording-paragraphs');
    div.append(div2);
    const p = document.createElement('p');
    p.append(i18n('LiveStream.Recording.Note'));
    div2.append(p);

    const p2 = document.createElement('p');
    p2.append(i18n('LiveStream.Recording.Note2'));
    div2.append(p2);

    const row = new Row({
      checkboxField: new CheckboxField({toggle: true}),
      titleLangKey: 'LiveStream.Recording.RecordVideo',
      icon: 'videocamera',
      listenerSetter: this.listenerSetter
    });

    const details = document.createElement('div');
    details.classList.add('stream-recording-details-container');
    const af = AudioFile();
    const vo = VideoOrientation(v=>this.isPortrait = v);
    vo.style.opacity = '0';
    details.append();
    details.append(af, vo);

    this.listenerSetter.add(row.checkboxField.input)('change', () => {
      if(row.checkboxField.checked) {
        this.video = true;
        vo.style.opacity = '1';
        af.style.opacity = '0';
      } else {
        vo.style.opacity = '0';
        af.style.opacity = '1';
        this.video = false;
      }
    });

    div.append(row.container);

    div.append(details);

    const startButton = Button('btn-primary btn-color-primary', {text: 'LiveStream.Recording.StartRecording'});
    startButton.addEventListener('click', async()=> {
      await this.managers.appGroupCallsManager.toggleRecord(callId, true, inputField.value, this.video ?? false, this.isPortrait ?? false);
      this.hide();
    });
    div.append(startButton);

    this.header.after(div);
  }
}
