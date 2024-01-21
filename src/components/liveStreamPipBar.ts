import {i18n} from '../lib/langPack';

const CLASS = 'live-stream-pip-bar';
const CLASS_PREFIX = CLASS + '-';

export default class LiveStreamPipBar {
  public container: HTMLElement;
  public watchCount: HTMLElement;
  public watchCountI18n?: HTMLElement;
  public peerTitle: HTMLElement;

  constructor() {
    const container = this.container = document.createElement('div');
    container.classList.add(CLASS, CLASS_PREFIX + 'hidden');

    container.addEventListener('click', () => {
      document.exitPictureInPicture();
    });

    const left = document.createElement('div');
    left .append(i18n('LiveStream.Live'));
    container.append(left);

    const status = document.createElement('div');
    status.classList.add(CLASS_PREFIX + 'status');
    this.peerTitle = document.createElement('span');
    status.append(this.peerTitle);
    this.watchCount = document.createElement('span');
    status.append(this.watchCount);

    container.append(status);

    container.append(document.createElement('div')); // right spacer
  }

  get hidden() {
    return this.container.classList.contains(CLASS_PREFIX + 'hidden');
  }

  show(peerTitle: string, watchCount: number) {
    this.setPeerTitle(peerTitle);
    this.setWatchCount(watchCount);
    this.container.classList.remove(CLASS_PREFIX + 'hidden');
  }

  hide() {
    this.container.classList.add(CLASS_PREFIX + 'hidden');
  }

  setPeerTitle(peerTitle: string) {
    this.peerTitle.textContent = peerTitle
  }

  setWatchCount(watchCount: number) {
    this.watchCountI18n?.remove();
    this.watchCountI18n = i18n('LiveStream.WatchCount', [new Intl.NumberFormat().format(watchCount)]);
    this.watchCount.append(this.watchCountI18n);
  }
}
