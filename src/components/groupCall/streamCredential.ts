import {i18n} from '../../lib/langPack';
import Icon from '../icon';
import {toastNew} from '../toast';

export function StreamCredential(value: string, type: 'key' | 'url') {
  const container = document.createElement('div');
  container.classList.add('live-stream-credential');
  let hidden = type == 'key';
  if(hidden) {
    container.classList.add('live-stream-credential-hidden')
  }
  const left = Icon('link', 'tgico', 'live-stream-credential-icon');

  const center = document.createElement('div');
  const credential = document.createElement('span');
  credential.classList.add('live-stream-credential-credential');

  const credentialValue = document.createElement('span');
  credentialValue.textContent = value;
  credential.append(credentialValue);

  const span = document.createElement('span');
  const DOT = '\u2981';
  if(hidden) {
    span.textContent = DOT.repeat(value.length)
    span.append();
    credential.append(span);
  }

  const label = document.createElement('span');
  label.classList.add('live-stream-credential-label');
  label.append(i18n(type == 'key' ? 'LiveStream.Key' : 'LiveStream.URL'));
  if(hidden) {
    const eyeButton = document.createElement('button');
    eyeButton.classList.add('video-container-button', 'video-container-button-small');
    const icon = Icon('eye1', 'tgico');
    eyeButton.append(icon);
    label.append(eyeButton);
    eyeButton.addEventListener('click', ()=>{
      if(hidden) {
        container.classList.remove('live-stream-credential-hidden');
        hidden = false;
      } else {
        container.classList.add('live-stream-credential-hidden');
        hidden = true;
      }
    })
  }
  center.append(credential, label);

  const right = document.createElement('button');
  right.classList.add('live-stream-credential-copybtn', 'video-container-button')
  right.append(Icon('copy', 'live-stream-credential-icon'));

  right.addEventListener('click', async() => {
    await navigator.clipboard.writeText(credentialValue.textContent);
    toastNew({langPackKey: 'CopiedToClipboard'});
  })

  container.append(left, center, right);
  const initialHidden = hidden;
  return [container, (newValue: string) => {
    if(!newValue && initialHidden && !hidden) {
      container.classList.add('live-stream-credential-hidden');
      hidden = true;
    }
    credentialValue.textContent = newValue;
    span.textContent = DOT.repeat(newValue.length);
  }] as const;
}
