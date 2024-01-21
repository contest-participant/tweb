import PopupElement from '.';
import {LangPackKey, i18n} from '../../lib/langPack';
import {RadioFormFromValues} from '../row';


export default class PopupStreamOutputDevice extends PopupElement {
  constructor(devices: MediaDeviceInfo[], currentSink: string, element: HTMLMediaElement) {
    const OK = document.createDocumentFragment();
    OK.append(i18n('OK'));

    const radio = RadioFormFromValues(
      devices.filter(v=>v.kind == 'audiooutput').map((v, i)=>({langPackKey: (v.label || 'LiveStream.AudioOutput') as LangPackKey, langPackArgs: [i + 1], value: v.deviceId, checked: currentSink == v.deviceId})),
      (value)=>{
        if(!('setSinkId' in element)) return;
        // @ts-ignore
        element.setSinkId(value);
      }
    );

    super('popup-stream-output-device', {
      overlayClosable: true,
      title: 'LiveStream.Menu.OutputDevice',
      buttons: [{text: OK}],
      body: true
    });


    this.header.after(radio);
  }
}
