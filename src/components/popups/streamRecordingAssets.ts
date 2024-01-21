import {i18n} from '../../lib/langPack';

export function AudioFile() {
  const div = document.createElement('div');
  div.classList.add('stream-recording-details');
  div.innerHTML = `<svg width="176" height="72" viewBox="0 0 176 72" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_1_614)">  <rect x="4" y="3" width="168" height="64" rx="10" fill="currentColor"/>  <circle cx="39" cy="35" r="20" fill="#4E8EE5"/>  <path fill-rule="evenodd" clip-rule="evenodd" d="M39 25C36.7909 25 35 26.7909 35 29V34C35 36.2091 36.7909 38 39 38C41.2091 38 43 36.2091 43 34V29C43 26.7909 41.2091 25 39 25ZM31.5 33C32.0523 33 32.5 33.4477 32.5 34C32.5 37.5899 35.4101 40.5 39 40.5C42.5899 40.5 45.5 37.5899 45.5 34C45.5 33.4477 45.9477 33 46.5 33C47.0523 33 47.5 33.4477 47.5 34C47.5 38.3561 44.2232 41.9469 40 42.4418V44.5C40 45.0523 39.5523 45.5 39 45.5C38.4477 45.5 38 45.0523 38 44.5V42.4418C33.7768 41.9469 30.5 38.3561 30.5 34C30.5 33.4477 30.9477 33 31.5 33Z" fill="currentColor"/>  <path d="M74 29V39" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M81 24V44" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M88 27V41" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M95 29V39" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M102 24V44" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M109 27V41" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M116 29V39" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M123 24V44" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M130 27V41" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M137 29V39" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M144 24V44" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M151 27V41" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  <path d="M158 29V39" stroke="#4E8EE5" stroke-width="4" stroke-linecap="round"/>  </g>  <defs>  <filter id="filter0_d_1_614" x="0" y="0" width="176" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">  <feFlood flood-opacity="0" result="BackgroundImageFix"/>  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>  <feOffset dy="1"/>  <feGaussianBlur stdDeviation="2"/>  <feComposite in2="hardAlpha" operator="out"/>  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_614"/>  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_614" result="shape"/>  </filter>  </defs>  </svg>`;

  const p = document.createElement('p');
  p.append(i18n('LiveStream.Recording.AudioDetail'));
  div.append(p);

  return div;
}


export function VideoOrientation(onChange: (isPortrait: boolean) => void) {
  const div = document.createElement('div');
  div.innerHTML = horizontal + vertical;

  div.children[0].classList.add('video-orientation', 'chosen-video-orientation')

  div.children[1].classList.add('video-orientation')

  div.children[0].addEventListener('click', () => {
    div.children[0].classList.add('chosen-video-orientation')
    div.children[1].classList.remove('chosen-video-orientation');
    onChange(false);
  });

  div.children[1].addEventListener('click', () => {
    div.children[1].classList.add('chosen-video-orientation')
    div.children[0].classList.remove('chosen-video-orientation')
    onChange(true);
  });

  const p = document.createElement('p');
  p.append(i18n('LiveStream.Recording.VideoDetail'));

  const container = document.createElement('div');
  container.classList.add('stream-recording-details');

  container.append(div, p);
  return container;
}


const horizontal = `<svg xmlns="http://www.w3.org/2000/svg" width="122" height="84" fill="none"><g filter="url(#a)"><rect width="110" height="72" x="6" y="5" fill="currentColor" rx="10"/><g clip-path="url(#b)"><path fill="#0999D6" d="M10 15a6 6 0 0 1 6-6h74v64H16a6 6 0 0 1-6-6V15Z"/><path fill="#fff" fill-rule="evenodd" d="M77.45 43.292c0 .014.155.59.14.563.296 1.18.479 2.18.479 2.165.14.69.239 1.308.239 1.294 0 .014.084.534.084.506.07.52.127.872.127.858.126.97.154 1.406.154 1.392.057.59.085 1.097.085 1.083 0 .014.028.436.028.408 0 .014.028.422.014.394l.014.478c.042 1.406.099 3.319-2.869 6.328.028-.014-.182.21-1.772 1.589 2.405 5.16 3.08 11.77 2.49 16.65H23.196c-.605-5.006.126-11.588 2.489-16.664-.014-.014-.83-.69-.816-.69-.365-.323-.689-.632-.675-.618-1.589-1.547-3.164-3.586-3.164-5.794v-.337c0-.014.014-.38.014-.352a27.167 27.167 0 0 1 .042-.843c0-.014.029-.422.029-.394l.042-.619c0-.014.042-.464.042-.436 0-.014.042-.464.042-.436.042-.365.099-.816.099-.801 0-.014.07-.507.056-.478a38.7 38.7 0 0 1 .352-2.11 42.048 42.048 0 0 1 1.082-4.444c.07-.253.085-.295.183-.689 3.783-13.373 16.72-29.123 21.08-28.139 1.125.253 2.236 1.603 3.248 3.6.619 1.266.985 2.25.97 2.236 0 .014.183.478.17.45.14.366.224.633.365 1.04 2.475-.027 2.039 0 2.264 0 .492-1.448.83-2.235.816-2.221.689-1.674 2.151-4.697 3.923-5.105 4.5-1.012 18.352 15.849 21.6 30.136Z" clip-rule="evenodd"/><path stroke="#CABCB4" stroke-linecap="round" stroke-width="2.531" d="M45.303 21.017c-.267-.351-.534-.689-.801-.97-.69-.745-1.364-1.21-1.885-1.167-.576.042-1.294.815-1.997 2.01-.253.422-.492.9-.731 1.42M31.972 63.177c6.736 3.67 14.794 5.751 18.042 5.751 3.248 0 11.264-2.095 17.958-5.765"/><path fill="#F23C57" fill-rule="evenodd" d="M49.128 47.666c1.04 1.462 2.953 2.489 5.203 2.615v.633c0 3.994-1.181 7.228-4.373 7.228-3.15 0-4.346-3.178-4.374-7.116V50c1.52-.408 2.77-1.237 3.544-2.334Z" clip-rule="evenodd"/><path stroke="#000" stroke-linecap="round" stroke-width="2.531" d="M37.034 44.91c.45 1.968 1.575 3.74 3.235 4.837 3.318 2.194 7.58.872 9.506-2.94"/><path stroke="#000" stroke-linecap="round" stroke-width="2.531" d="M62.22 44.91c-.45 1.968-1.575 3.74-3.234 4.837-3.319 2.194-7.58.872-9.506-2.94"/><path fill="#000" fill-rule="evenodd" d="M49.733 47.708c1.94 0 4.655-2.84 4.655-5.245 0-2.405-1.688-2.658-4.725-2.658-3.038 0-4.725.253-4.725 2.657 0 2.405 2.854 5.246 4.795 5.246ZM40.634 33.913c-1.94.52-3.023 2.77-2.77 3.712.253.942 2.11 1.575 4.05 1.055s3.206-2.11 2.981-2.94c-.225-.843-2.32-2.348-4.26-1.828ZM59.337 33.913c1.941.52 3.024 2.77 2.77 3.712-.252.942-2.109 1.575-4.05 1.055-1.94-.52-3.206-2.11-2.98-2.94.224-.83 2.306-2.348 4.26-1.828Z" clip-rule="evenodd"/><path stroke="#CABCB4" stroke-linecap="round" stroke-width="2.531" d="M54.486 21.017c.267-.351.534-.689.802-.97.689-.745 1.364-1.21 1.884-1.167.577.042 1.294.815 1.997 2.01.253.422.492.9.731 1.42"/><path fill="#fff" d="M41.033 36.393c.55-.549.728-1.261.398-1.59-.33-.33-1.041-.152-1.59.397-.55.55-.728 1.261-.398 1.59.33.33 1.041.152 1.59-.397ZM57.911 36.505c.652-.423.974-1.083.72-1.474-.253-.39-.987-.364-1.639.059-.651.423-.973 1.082-.72 1.473.254.391.988.365 1.64-.058Z"/></g><g clip-path="url(#c)"><path fill="#D23939" d="M92 9h14a6 6 0 0 1 6 6v14H92V9Z"/><path fill="#D23939" d="M92 9h14a6 6 0 0 1 6 6v14H92V9Z"/><path fill="#D23939" d="M92 9h14a6 6 0 0 1 6 6v14H92V9Z"/><g clip-path="url(#d)"><path fill="#FBC93C" d="M112 9H92v20h20V9Z"/><path fill="#FBC93C" d="M112 9H92v20h20V9Z"/><path fill="#4CBFEA" fill-rule="evenodd" d="M102.398 12.516c4.071 0 6.225 2.756 6.417 5.808.186 2.965.021 7.237-1.041 10.676H96.949c-.759-2.722-1.042-5.981-1.032-8.688l-.069-.04-.069-.04-.07-.04-.138-.078-.208-.118-.103-.059-.068-.04-.102-.058-.067-.04-.049-.029-.049-.03-.048-.029-.024-.014-.047-.03-.047-.03-.024-.015-.046-.03-.023-.015-.045-.03-.023-.015-.044-.03c-.587-.407-.99-.86-.87-1.478.235-1.208 1.2-1.405 2.575-1.25.72-2.375 2.775-4.258 6.139-4.258Z" clip-rule="evenodd"/><path fill="#fff" fill-rule="evenodd" d="M93.673 18.384c.904.006 1.816.181 2.672.416l.096.027.24.069.094.028.094.029.094.029.093.029.092.03.046.014.091.03.09.03.09.03.135.045.198.068.13.046.128.045.188.067.478.17.17.061.143.05.13.045.096.033.094.03.06.02.06.02.03.009.058.018.028.008.056.017.056.016.054.015c.124.034.24.062.344.08.851.15 1.443-.02 1.777-.51l.004.307.005.303.003.3.005.443.003.291.003.288.002.285.001.14.001.28.001.139v.274l.001.271v.4l-.001.263-.001.259-.002.256-.001.252-.003.249-.002.246-.004.242-.004.298-.005.293-.005.23-.002.114-.005.225-.003.111-.006.22-.006.218-.003.107-.007.212-.004.104-.007.207-.006.15-.006.147-.009.219-.006.143-.007.141-.007.14-.007.138-.008.136-.007.134-.008.132-.008.13-.004.065h-4.804c-.759-2.722-1.042-5.981-1.032-8.688l-.069-.04-.069-.04-.07-.04-.138-.078-.208-.118-.103-.059-.068-.04-.102-.058-.088-.052-.042-.025-.062-.038-.04-.025-.041-.025-.04-.026-.04-.025-.04-.025-.039-.026-.058-.039-.056-.039-.047-.032-.045-.033-.018-.013-.036-.027-.035-.026a3.664 3.664 0 0 1-.051-.04l-.033-.028-.017-.014-.032-.027a1.693 1.693 0 0 1-.032-.028l-.03-.027c-.266-.242-.45-.507-.495-.815Z" clip-rule="evenodd"/><path stroke="#000" stroke-linecap="round" stroke-width=".703" d="M104.844 18.71a1.66 1.66 0 0 0-3.223-.804"/><path stroke="#1683AC" stroke-linecap="round" stroke-width=".703" d="M93.971 18.275c3.06.375 5.028 1.462 6.308 1.688.853.15 1.291-.047 1.316-.59"/><path stroke="#1683AC" stroke-linecap="round" stroke-linejoin="round" stroke-width=".703" d="m104.539 21.656 1.68 1.094v4.414c-2.11-.443-3.164-2.279-3.164-5.508"/><path stroke="#fff" stroke-linecap="round" stroke-width=".703" d="M107.666 17.552a4.597 4.597 0 0 0-.25-.73 5.634 5.634 0 0 0-.988-1.52 5.663 5.663 0 0 0-1.407-1.141 4.597 4.597 0 0 0-.701-.325"/></g></g><g clip-path="url(#e)"><path fill="#D23939" d="M92 31h20v20H92z"/><path fill="#D23939" d="M92 31h20v20H92z"/><path fill="#D23939" d="M92 31h20v20H92z"/><g clip-path="url(#f)"><path fill="#FD57A4" d="M112 31H92v20h20V31Z"/><path fill="#FFE934" fill-rule="evenodd" d="M101.98 34.36c3.743 0 6.778 3.015 6.778 6.738a6.683 6.683 0 0 1-1.492 4.218c1.086 1.23 1.57 2.918 1.57 4.786 0 .304-.02.605-.059.898H95.184a6.8 6.8 0 0 1-.059-.898c0-1.868.484-3.555 1.57-4.786a6.68 6.68 0 0 1-1.492-4.218c0-3.723 3.035-6.739 6.777-6.739Z" clip-rule="evenodd"/><path stroke="#FF9000" stroke-linecap="round" stroke-width=".703" d="M97.758 45.902c.37.242.77.453 1.199.63a8.02 8.02 0 0 0 3.023.581 8.02 8.02 0 0 0 3.024-.582 7.26 7.26 0 0 0 1.199-.629"/><path fill="#000" d="M99.285 41.86c.572 0 1.035-.543 1.035-1.212 0-.668-.463-1.21-1.035-1.21-.572 0-1.035.542-1.035 1.21 0 .67.463 1.211 1.035 1.211Z"/><path fill="#fff" d="M99.05 40.844c.227 0 .41-.219.41-.489s-.183-.488-.41-.488c-.226 0-.41.219-.41.489s.184.488.41.488Z"/><path fill="#000" d="M104.676 41.86c.571 0 1.035-.543 1.035-1.212 0-.668-.464-1.21-1.035-1.21-.572 0-1.035.542-1.035 1.21 0 .67.463 1.211 1.035 1.211Z"/><path fill="#FF4B00" fill-rule="evenodd" d="M102.02 41.195c.582 0 .851.242 1.074.492l.027.032.09.105.027.032.028.027c.164.183.339.328.652.328 1.027 0 1.512.316 1.523.957v.05c-.039 1.06-1.89 1.673-3.39 1.688H101.965c-1.508 0-3.399-.617-3.438-1.687v-.032c0-.656.489-.976 1.524-.976.297 0 .469-.133.625-.3l.027-.028.027-.028.028-.03.09-.106c.004-.004.007-.012.011-.016l.028-.031c.218-.242.488-.477 1.058-.477h.075Z" clip-rule="evenodd"/><path stroke="#921000" stroke-linecap="round" stroke-width=".703" d="M99.617 43.227c.621.285 1.414.43 2.383.43.969 0 1.762-.145 2.383-.43"/><path fill="#fff" d="M104.402 40.844c.227 0 .41-.219.41-.489s-.183-.488-.41-.488c-.226 0-.41.219-.41.489s.184.488.41.488Z"/></g></g><g clip-path="url(#g)"><path fill="#D23939" d="M92 53h20v14a6 6 0 0 1-6 6H92V53Z"/><path fill="#D23939" d="M92 53h20v14a6 6 0 0 1-6 6H92V53Z"/><path fill="#D23939" d="M92 53h20v14a6 6 0 0 1-6 6H92V53Z"/><g clip-path="url(#h)"><path fill="#42CD7C" d="M112 53H92v20h20V53Z"/><path fill="#42CD7C" d="M112 53H92v20h20V53Z"/><path fill="#112F40" fill-rule="evenodd" d="M102 53.664c1.853 0 4.333 2.179 5.451 4.731 1.365 3.115 2.205 7.567 2.205 8.511 0 .4-.29.82-.764 1.23l-.042.036-.021.018-.043.036a6.264 6.264 0 0 1-.35.264l-.05.035-.051.035-.052.035-.052.034-.026.017-.054.035c.469 1.005.685 2.173.685 3.42 0 .305-.02.605-.059.899H95.184a6.793 6.793 0 0 1-.059-.898c0-1.217.206-2.36.65-3.347l-.025-.017-.05-.034c-.017-.01-.034-.022-.05-.034l-.05-.034c-.758-.53-1.256-1.123-1.256-1.73 0-1.086.834-5.477 2.174-8.533 1.117-2.546 3.629-4.709 5.482-4.709Z" clip-rule="evenodd"/><path fill="#000" fill-rule="evenodd" d="M102.012 62.739c.64 0 1.068-.087 1.423-.19l.052-.014.05-.016.05-.015.049-.015.072-.023.142-.046.069-.022.047-.014.023-.007.046-.014.047-.013c.249-.07.509-.12.846-.114 1.64.026 1.82 3.694 1.808 5.39-.009 1.311-3.486 2.483-4.736 2.483-1.25 0-4.922-1.171-4.922-2.539v-.208l.002-.094.001-.1c.024-1.553.237-4.95 2.028-4.95.226 0 .425.036.623.088l.046.012.046.013.046.013.046.014.07.022.118.037.146.046.076.024.052.015.052.016.027.008.054.015.027.007.056.015c.366.097.81.176 1.418.176Z" clip-rule="evenodd"/><path fill="#fff" fill-rule="evenodd" d="M99.11 62.219c.225 0 .424.035.622.087l.046.012.046.013.046.013.046.014.07.022.118.037.146.046.076.024.052.015.052.016.027.008.054.015.027.007.056.015c.366.097.81.176 1.418.176.64 0 1.068-.087 1.423-.19l.052-.014.05-.016.05-.015.049-.015.072-.023.142-.046.069-.022.047-.014.023-.007.046-.014.047-.013c.249-.07.509-.12.846-.114.367.006.662.194.897.503l-.002.099-.004.146-.002.096-.003.095-.004.14-.005.136-.006.134-.006.132-.004.086-.004.084-.005.084-.004.082-.005.081-.006.08-.005.078-.005.078-.006.075-.006.075-.006.074-.007.072-.006.071-.007.07-.007.068-.007.067-.007.067-.008.064-.008.064a.33.33 0 0 1-.004.031l-.008.062-.004.03-.008.06-.009.058-.009.058-.009.056-.009.054-.009.054-.005.026-.01.052-.01.05-.01.05a.198.198 0 0 1-.005.024l-.01.047-.011.046-.011.045a.165.165 0 0 1-.005.022l-.011.043a2.674 2.674 0 0 1-.035.121l-.011.038c-.695 2.16-1.85 2.773-3.457 2.773-1.608 0-2.754-.613-3.448-2.773l-.012-.04a.956.956 0 0 1-.006-.02l-.012-.04a1.298 1.298 0 0 1-.006-.021l-.011-.044-.006-.022-.012-.045-.01-.046-.012-.048a4.505 4.505 0 0 1-.016-.074l-.01-.051-.01-.053-.01-.053-.01-.055-.01-.057-.009-.058-.009-.058-.004-.03-.01-.062-.008-.062a25.95 25.95 0 0 1-.004-.032l-.008-.064-.008-.066-.008-.067-.004-.034-.007-.069-.004-.035-.007-.07-.007-.073-.007-.074a26.518 26.518 0 0 1-.004-.037l-.006-.076-.006-.076-.007-.079-.008-.12-.006-.081-.005-.083-.005-.084-.005-.086-.005-.087-.004-.088-.005-.09-.006-.136-.004-.093-.005-.142-.005-.145-.004-.148-.004-.15-.002-.102-.002-.104-.001-.052c.242-.228.536-.363.893-.363Z" clip-rule="evenodd"/><path fill="#0D222E" fill-rule="evenodd" d="M102 68c1.122 0 2.031-1.133 2.031-1.797 0-1.122-.909-1.328-2.031-1.328s-2.031.206-2.031 1.328c0 .664.909 1.797 2.031 1.797Z" clip-rule="evenodd"/><path stroke="#405B7D" stroke-linecap="round" stroke-width=".703" d="M101.565 67.065c-.371-.204-.634-.562-.715-.822M102.642 65.626c.207.062.377.156.479.252"/><path stroke="#000" stroke-linecap="round" stroke-width=".703" d="M96.991 69.591c1.871 1.02 4.11 1.6 5.01 1.6.901 0 3.13-.581 4.99-1.602"/><path fill="#B4C0C9" fill-rule="evenodd" d="M99.11 62.219c.225 0 .424.035.622.087l.046.012.046.013.046.013.046.014.07.022.118.037.146.046.076.024.052.015.052.016.027.008.054.015.027.007.056.015c.366.097.81.176 1.418.176.64 0 1.068-.087 1.423-.19l.052-.014.05-.016.05-.015.049-.015.072-.023.142-.046.069-.022.047-.014.023-.007.046-.014.047-.013c.249-.07.509-.12.846-.114.367.006.662.194.897.503l-.003.127-.003.124-.003.123-.004.12-.002.06-.004.118-.004.116-.005.113-.005.112-.003.055a1.467 1.467 0 0 0-.436-.07 5.062 5.062 0 0 0-1.042.1l-.06.012-.03.006-.06.013-.06.012-.06.013-.119.026-.212.047-.092.02-.062.013-.062.013-.063.013-.032.006-.064.013a6.723 6.723 0 0 1-1.308.127c-.456 0-.855-.044-1.217-.104l-.07-.012a11.11 11.11 0 0 1-.136-.025l-.067-.013-.067-.013-.066-.013-.065-.014-.064-.013-.127-.027-.278-.06-.06-.013-.09-.02-.06-.011-.06-.012-.03-.005-.058-.012-.06-.01-.058-.01a4.132 4.132 0 0 0-.678-.061c-.165 0-.319.019-.46.055l-.006-.105-.005-.107-.004-.11-.003-.054-.004-.112-.003-.113-.004-.116-.003-.117-.003-.119-.003-.12-.002-.123c.242-.228.536-.363.893-.363Z" clip-rule="evenodd"/></g></g></g><defs><clipPath id="b"><path fill="#fff" d="M10 15a6 6 0 0 1 6-6h74v64H16a6 6 0 0 1-6-6V15Z"/></clipPath><clipPath id="c"><path fill="#fff" d="M92 9h14a6 6 0 0 1 6 6v14H92V9Z"/></clipPath><clipPath id="d"><path fill="#fff" d="M92 9h20v20H92z"/></clipPath><clipPath id="e"><path fill="#fff" d="M92 31h20v20H92z"/></clipPath><clipPath id="f"><path fill="#fff" d="M92 31h20v20H92z"/></clipPath><clipPath id="g"><path fill="#fff" d="M92 53h20v14a6 6 0 0 1-6 6H92V53Z"/></clipPath><clipPath id="h"><path fill="#fff" d="M92 53h20v20H92z"/></clipPath><filter id="a" width="122" height="84" x="0" y="0" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_5461_1747"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_5461_1747" result="shape"/></filter></defs></svg>`;
const vertical = `<svg width="80" height="118" viewBox="0 0 80 118" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_5462_1800)"><g clip-path="url(#clip0_5462_1800)"><rect x="76" y="3" width="110" height="72" rx="10" transform="rotate(90 76 3)" fill="currentColor"/><g clip-path="url(#clip1_5462_1800)"><path d="M66 7C69.3137 7 72 9.68629 72 13V87H8L8 13C8 9.68629 10.6863 7 14 7L66 7Z" fill="#0999D6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M67.45 49.2922C67.45 49.3062 67.6047 49.8828 67.5906 49.8547C67.8859 51.0359 68.0688 52.0344 68.0688 52.0203C68.2094 52.7094 68.3078 53.3281 68.3078 53.314C68.3078 53.3281 68.3922 53.8484 68.3922 53.8203C68.4625 54.3406 68.5187 54.6922 68.5187 54.6781C68.6453 55.6484 68.6734 56.0844 68.6734 56.0703C68.7297 56.6609 68.7578 57.1672 68.7578 57.1531C68.7578 57.1672 68.7859 57.589 68.7859 57.5609C68.7859 57.575 68.8141 57.9828 68.8 57.9547C68.8 57.9687 68.8141 58.4609 68.8141 58.4328C68.8562 59.839 68.9125 61.7515 65.9453 64.7609C65.9734 64.7469 65.7625 64.9719 64.1734 66.35C66.5781 71.5109 67.2531 83.1203 66.6625 88H13.1969C12.5922 82.9937 13.3234 71.4125 15.6859 66.3359C15.6719 66.3219 14.8563 65.6469 14.8703 65.6469C14.5047 65.3234 14.1812 65.0141 14.1953 65.0281C12.6062 63.4812 11.0312 61.4422 11.0312 59.2344C11.0312 59.2203 11.0312 58.8687 11.0312 58.8969C11.0312 58.8828 11.0453 58.5172 11.0453 58.5453C11.0453 58.5312 11.0594 58.1515 11.0594 58.1797C11.0594 58.1656 11.0875 57.6734 11.0875 57.7015C11.0875 57.6875 11.1156 57.2797 11.1156 57.3078C11.1156 57.2937 11.1578 56.675 11.1578 56.689C11.1578 56.675 11.2 56.225 11.2 56.2531C11.2 56.239 11.2422 55.7891 11.2422 55.8172C11.2844 55.4516 11.3406 55.0015 11.3406 55.0156C11.3406 55.0015 11.4109 54.5094 11.3969 54.5375C11.4953 53.8062 11.6078 53.1734 11.6078 53.1875C11.6078 53.1734 11.7484 52.414 11.7484 52.4281C12.1984 50.0094 12.8312 47.9703 12.8312 47.9844C12.9016 47.7312 12.9156 47.689 13.0141 47.2953C16.7969 33.9219 29.7344 18.1719 34.0938 19.1562C35.2188 19.4094 36.3297 20.7594 37.3422 22.7562C37.9609 24.0219 38.3266 25.0062 38.3125 24.9922C38.3125 25.0062 38.4953 25.4703 38.4812 25.4422C38.6219 25.8078 38.7063 26.075 38.8469 26.4828C41.3219 26.4547 40.8859 26.4828 41.1109 26.4828C41.6031 25.0344 41.9406 24.2469 41.9266 24.2609C42.6156 22.5875 44.0781 19.564 45.85 19.1562C50.35 18.1437 64.2016 35.0047 67.45 49.2922Z" fill="white"/><path d="M35.3031 27.0172C35.0359 26.6656 34.7687 26.3281 34.5015 26.0469C33.8125 25.3016 33.1375 24.8375 32.6172 24.8797C32.0406 24.9219 31.3234 25.6953 30.6203 26.8906C30.3672 27.3125 30.1281 27.7906 29.889 28.3109" stroke="#CABCB4" stroke-width="2.53125" stroke-linecap="round"/><path d="M21.9718 69.1766C28.7077 72.8469 36.7656 74.9281 40.014 74.9281C43.2624 74.9281 51.278 72.8328 57.9718 69.1625" stroke="#CABCB4" stroke-width="2.53125" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M39.1281 53.6656C40.1687 55.1281 42.0812 56.1547 44.3312 56.2812V56.5625V56.914C44.3312 60.9078 43.15 64.1422 39.9578 64.1422C36.8078 64.1422 35.6125 60.964 35.5844 57.0265V56.9V56.5484C35.5844 56.3656 35.5844 56.1828 35.5844 56C37.1031 55.5922 38.3547 54.7625 39.1281 53.6656Z" fill="#F23C57"/><path d="M27.0343 50.9093C27.4843 52.8781 28.6093 54.65 30.2687 55.7469C33.5874 57.9406 37.8484 56.6187 39.7749 52.8078" stroke="black" stroke-width="2.53125" stroke-linecap="round"/><path d="M52.2202 50.9093C51.7702 52.8781 50.6452 54.65 48.9859 55.7469C45.6671 57.9406 41.4062 56.6187 39.4796 52.8078" stroke="black" stroke-width="2.53125" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M39.7328 53.7078C41.6734 53.7078 44.3875 50.8672 44.3875 48.4625C44.3875 46.0578 42.7 45.8047 39.6625 45.8047C36.625 45.8047 34.9375 46.0578 34.9375 48.4625C34.9375 50.8672 37.7922 53.7078 39.7328 53.7078Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M30.6343 39.9125C28.6937 40.4328 27.6109 42.6828 27.864 43.625C28.1171 44.5672 29.9734 45.2 31.914 44.6797C33.8546 44.1594 35.1203 42.5703 34.8953 41.7406C34.6703 40.8969 32.575 39.3922 30.6343 39.9125Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M49.3374 39.9125C51.2781 40.4328 52.3609 42.6828 52.1077 43.625C51.8546 44.5672 49.9984 45.2 48.0577 44.6797C46.1171 44.1594 44.8515 42.5703 45.0765 41.7406C45.3015 40.9109 47.3827 39.3922 49.3374 39.9125Z" fill="black"/><path d="M44.486 27.0172C44.7531 26.6656 45.0203 26.3281 45.2875 26.0469C45.9766 25.3016 46.6516 24.8375 47.1719 24.8797C47.7485 24.9219 48.4657 25.6953 49.1688 26.8906C49.4219 27.3125 49.661 27.7906 49.9 28.3109" stroke="#CABCB4" stroke-width="2.53125" stroke-linecap="round"/><path d="M31.0335 42.3932C31.5827 41.844 31.7608 41.1317 31.4313 40.8022C31.1018 40.4727 30.3895 40.6508 29.8403 41.1999C29.2911 41.7491 29.1131 42.4614 29.4426 42.7909C29.7721 43.1204 30.4844 42.9423 31.0335 42.3932Z" fill="white"/><path d="M47.9114 42.505C48.5628 42.082 48.8851 41.4223 48.6313 41.0315C48.3776 40.6407 47.6438 40.6667 46.9924 41.0897C46.341 41.5126 46.0187 42.1723 46.2725 42.5632C46.5263 42.954 47.26 42.9279 47.9114 42.505Z" fill="white"/></g><g clip-path="url(#clip2_5462_1800)"><path d="M72 89V103C72 106.314 69.3137 109 66 109H52V89H72Z" fill="#D23939"/><path d="M72 89V103C72 106.314 69.3137 109 66 109H52V89H72Z" fill="#D23939"/><path d="M72 89V103C72 106.314 69.3137 109 66 109H52V89H72Z" fill="#D23939"/><g clip-path="url(#clip3_5462_1800)"><path d="M72 89H52V109H72V89Z" fill="#FBC93C"/><path d="M72 89H52V109H72V89Z" fill="#FBC93C"/><path fill-rule="evenodd" clip-rule="evenodd" d="M62.3984 92.5156C66.4695 92.5156 68.6227 95.2722 68.8148 98.324C69.0014 101.289 68.8364 105.561 67.7739 109H56.9494C56.1904 106.278 55.9071 103.019 55.9172 100.312L55.8483 100.272L55.7792 100.232L55.7098 100.193L55.5709 100.114L55.363 99.9959L55.2599 99.9371L55.1916 99.8978L55.0901 99.8388L55.0232 99.7994L54.9741 99.7701L54.9254 99.7407L54.8771 99.7113C54.8691 99.7064 54.8611 99.7015 54.8531 99.6965L54.8056 99.6669L54.7585 99.6372C54.7507 99.6323 54.743 99.6273 54.7352 99.6223L54.689 99.5924C54.6813 99.5874 54.6737 99.5824 54.6661 99.5774L54.6208 99.5473C54.6133 99.5422 54.6058 99.5372 54.5984 99.5321L54.554 99.5017C53.9673 99.0954 53.5639 98.6416 53.6841 98.0238C53.9189 96.8159 54.8838 96.6195 56.2588 96.7739C56.9788 94.3988 59.0343 92.5156 62.3984 92.5156Z" fill="#4CBFEA"/><path fill-rule="evenodd" clip-rule="evenodd" d="M53.6732 98.3837C54.5773 98.3897 55.4892 98.5653 56.3446 98.8L56.4411 98.8268C56.5214 98.8493 56.6012 98.8723 56.6804 98.8958L56.7751 98.9241L56.8693 98.9527L56.9628 98.9817C56.9939 98.9913 57.0249 99.0011 57.0558 99.0109L57.1481 99.0403C57.1634 99.0453 57.1787 99.0502 57.194 99.0551L57.2853 99.0849L57.3759 99.1148L57.4658 99.1448L57.6001 99.1902C57.6668 99.213 57.7329 99.2357 57.7983 99.2584L57.9282 99.3038L58.0561 99.3488L58.2442 99.4157L58.7221 99.5868L58.8918 99.647L59.0351 99.6972L59.1659 99.7423L59.2614 99.7746L59.3545 99.8055L59.4153 99.8253L59.475 99.8444C59.4849 99.8475 59.4947 99.8506 59.5044 99.8536L59.5625 99.8716C59.5721 99.8745 59.5816 99.8774 59.5911 99.8803L59.6474 99.8971C59.666 99.9025 59.6844 99.9078 59.7027 99.913L59.7567 99.9282C59.8814 99.9625 59.9965 99.9896 60.1011 100.008C60.9522 100.158 61.5444 99.9883 61.8776 99.4987L61.8822 99.8052L61.8865 100.108L61.8904 100.408L61.8954 100.851L61.8983 101.143L61.9007 101.43L61.9027 101.715L61.9036 101.856L61.905 102.135L61.9056 102.274L61.9064 102.548L61.9068 102.819V102.953L61.9065 103.219L61.9059 103.482L61.9048 103.741L61.9034 103.997L61.9015 104.249L61.8992 104.498L61.8965 104.744L61.8934 104.986L61.889 105.284L61.8839 105.577L61.8793 105.807L61.8769 105.921L61.8717 106.146L61.869 106.258L61.8632 106.478L61.857 106.695L61.8538 106.802L61.847 107.014L61.8434 107.118L61.836 107.325L61.8303 107.475L61.8244 107.622L61.8151 107.841L61.8086 107.984L61.8019 108.125L61.795 108.265L61.7878 108.403L61.7805 108.539L61.7729 108.673L61.7651 108.805L61.757 108.935C61.7557 108.957 61.7543 108.979 61.7529 109H56.9494C56.1904 106.278 55.9071 103.019 55.9172 100.312L55.8483 100.272L55.7792 100.232L55.7099 100.193L55.5709 100.114L55.363 99.9959L55.2599 99.937L55.1916 99.8978L55.0901 99.8388L55.0022 99.7869L54.9604 99.7619L54.8983 99.7243L54.8573 99.6991L54.8167 99.6739L54.7764 99.6485L54.7365 99.6231L54.697 99.5976L54.658 99.572L54.6002 99.5333L54.5436 99.4944L54.4972 99.4618L54.4517 99.4289L54.4337 99.4157L54.3982 99.3892L54.3633 99.3625C54.3459 99.3491 54.3289 99.3356 54.312 99.3221L54.2786 99.295L54.2622 99.2813L54.2298 99.2539C54.2191 99.2448 54.2085 99.2356 54.1981 99.2263L54.1671 99.1986C53.9016 98.9568 53.7176 98.6918 53.6732 98.3837Z" fill="white"/><path d="M64.844 98.7095C65.0659 97.8197 64.5243 96.9186 63.6341 96.6967C62.744 96.4749 61.8425 97.0163 61.6206 97.9061" stroke="black" stroke-width="0.703125" stroke-linecap="round"/><path d="M53.971 98.2754C57.0314 98.6503 58.9992 99.7373 60.2786 99.9628C61.1315 100.113 61.5703 99.9164 61.595 99.3724" stroke="#1683AC" stroke-width="0.703125" stroke-linecap="round"/><path d="M64.5391 101.656L66.2188 102.75V107.164C64.1094 106.721 63.0547 104.885 63.0547 101.656" stroke="#1683AC" stroke-width="0.703125" stroke-linecap="round" stroke-linejoin="round"/><path d="M67.6655 97.5522C67.606 97.311 67.5228 97.0659 67.4164 96.8212C67.1899 96.3 66.8586 95.7803 66.4281 95.3022C65.9977 94.8242 65.5155 94.4403 65.0208 94.1606C64.7885 94.0293 64.5535 93.9209 64.3199 93.8364" stroke="white" stroke-width="0.703125" stroke-linecap="round"/></g></g><g clip-path="url(#clip4_5462_1800)"><rect width="20" height="20" transform="matrix(0 1 -1 0 50 89)" fill="#D23939"/><rect width="20" height="20" transform="matrix(0 1 -1 0 50 89)" fill="#D23939"/><rect width="20" height="20" transform="matrix(0 1 -1 0 50 89)" fill="#D23939"/><g clip-path="url(#clip5_5462_1800)"><path d="M50 89H30V109H50V89Z" fill="#FD57A4"/><path fill-rule="evenodd" clip-rule="evenodd" d="M39.9805 92.3594C43.7227 92.3594 46.7578 95.375 46.7578 99.0977C46.7578 100.695 46.1992 102.164 45.2656 103.316C46.3516 104.547 46.8359 106.234 46.8359 108.102C46.8359 108.406 46.8164 108.707 46.7773 109H33.1836C33.1445 108.707 33.125 108.406 33.125 108.102C33.125 106.234 33.6094 104.547 34.6953 103.316C33.7617 102.164 33.2031 100.695 33.2031 99.0977C33.2031 95.375 36.2383 92.3594 39.9805 92.3594Z" fill="#FFE934"/><path d="M35.7578 103.902C36.1289 104.145 36.5273 104.355 36.957 104.531C37.8672 104.902 38.8945 105.113 39.9805 105.113C41.0664 105.113 42.0937 104.902 43.0039 104.531C43.4297 104.355 43.832 104.145 44.2031 103.902" stroke="#FF9000" stroke-width="0.703125" stroke-linecap="round"/><path d="M37.2852 99.8594C37.8569 99.8594 38.3203 99.3172 38.3203 98.6484C38.3203 97.9797 37.8569 97.4375 37.2852 97.4375C36.7135 97.4375 36.25 97.9797 36.25 98.6484C36.25 99.3172 36.7135 99.8594 37.2852 99.8594Z" fill="black"/><path d="M37.0508 98.8438C37.2773 98.8438 37.4609 98.6251 37.4609 98.3555C37.4609 98.0858 37.2773 97.8672 37.0508 97.8672C36.8243 97.8672 36.6406 98.0858 36.6406 98.3555C36.6406 98.6251 36.8243 98.8438 37.0508 98.8438Z" fill="white"/><path d="M42.6758 99.8594C43.2475 99.8594 43.7109 99.3172 43.7109 98.6484C43.7109 97.9797 43.2475 97.4375 42.6758 97.4375C42.1041 97.4375 41.6406 97.9797 41.6406 98.6484C41.6406 99.3172 42.1041 99.8594 42.6758 99.8594Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M40.0195 99.1953C40.6016 99.1953 40.8711 99.4375 41.0937 99.6875L41.1211 99.7187L41.2109 99.8242L41.2383 99.8555L41.2656 99.8828C41.4297 100.066 41.6055 100.211 41.918 100.211C42.9453 100.211 43.4297 100.527 43.4414 101.168V101.188V101.219C43.4023 102.277 41.5508 102.891 40.0508 102.906H40.0039H39.9844H39.9648C38.457 102.906 36.5664 102.289 36.5273 101.219V101.188C36.5273 100.531 37.0156 100.211 38.0508 100.211C38.3477 100.211 38.5195 100.078 38.6758 99.9102L38.7031 99.8828L38.7305 99.8555L38.7578 99.8242L38.8477 99.7187C38.8516 99.7148 38.8555 99.707 38.8594 99.7031L38.8867 99.6719C39.1055 99.4297 39.375 99.1953 39.9453 99.1953C39.957 99.1953 39.9727 99.1953 39.9844 99.1953C39.9922 99.1953 40.0078 99.1953 40.0195 99.1953Z" fill="#FF4B00"/><path d="M37.6172 101.227C38.2383 101.512 39.0313 101.656 40 101.656C40.9687 101.656 41.7617 101.512 42.3828 101.227" stroke="#921000" stroke-width="0.703125" stroke-linecap="round"/><path d="M42.4023 98.8438C42.6289 98.8438 42.8125 98.6251 42.8125 98.3555C42.8125 98.0858 42.6289 97.8672 42.4023 97.8672C42.1758 97.8672 41.9922 98.0858 41.9922 98.3555C41.9922 98.6251 42.1758 98.8438 42.4023 98.8438Z" fill="white"/></g></g><g clip-path="url(#clip6_5462_1800)"><path d="M28 89V109H14C10.6863 109 8 106.314 8 103V89H28Z" fill="#D23939"/><path d="M28 89V109H14C10.6863 109 8 106.314 8 103V89H28Z" fill="#D23939"/><path d="M28 89V109H14C10.6863 109 8 106.314 8 103V89H28Z" fill="#D23939"/><g clip-path="url(#clip7_5462_1800)"><path d="M28 89H8V109H28V89Z" fill="#42CD7C"/><path d="M28 89H8V109H28V89Z" fill="#42CD7C"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18 89.6641C19.8527 89.6641 22.3333 91.8429 23.4513 94.395C24.8157 97.5096 25.6562 101.962 25.6562 102.906C25.6562 103.306 25.3661 103.726 24.8921 104.137L24.8504 104.172C24.8433 104.178 24.8363 104.184 24.8292 104.19L24.7861 104.226C24.6774 104.315 24.5603 104.403 24.436 104.49L24.3859 104.525L24.3351 104.56L24.2835 104.595L24.2311 104.629C24.2223 104.635 24.2135 104.641 24.2047 104.646L24.1513 104.681C24.6197 105.685 24.8359 106.854 24.8359 108.102C24.8359 108.406 24.8157 108.706 24.7766 109H11.1844C11.1452 108.706 11.125 108.406 11.125 108.102C11.125 106.885 11.3308 105.743 11.7756 104.755L11.7501 104.738L11.6994 104.704C11.6826 104.693 11.666 104.682 11.6494 104.67L11.6002 104.636C10.8423 104.106 10.3438 103.513 10.3438 102.906C10.3438 101.82 11.1775 97.4295 12.5179 94.3734C13.6347 91.8269 16.1473 89.6641 18 89.6641Z" fill="#112F40"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0122 98.739C18.6517 98.739 19.08 98.6516 19.4354 98.5495L19.4869 98.5345L19.5374 98.5193L19.5871 98.504L19.6361 98.4887L19.7083 98.4657L19.8496 98.4203L19.9193 98.3983L19.9657 98.384C19.9734 98.3816 19.9812 98.3793 19.9889 98.3769L20.0353 98.3632L20.0819 98.3498C20.331 98.2799 20.5912 98.2303 20.928 98.2358C22.5684 98.2623 22.7478 101.93 22.7358 103.627C22.7266 104.937 19.25 106.109 18 106.109C16.75 106.109 13.0781 104.938 13.0781 103.57L13.0783 103.45L13.0788 103.362L13.0797 103.268L13.081 103.169C13.1049 101.615 13.3183 98.2188 15.1092 98.2188C15.3345 98.2188 15.5335 98.2539 15.7319 98.306L15.7777 98.3183L15.8236 98.3311L15.8696 98.3445L15.9158 98.3583L15.9856 98.3797L16.1039 98.417L16.2504 98.4633L16.3262 98.4867L16.3777 98.5023L16.4302 98.5178C16.4391 98.5203 16.448 98.5229 16.4569 98.5255L16.5109 98.5408C16.52 98.5433 16.5292 98.5458 16.5384 98.5484L16.5941 98.5633C16.9603 98.6599 17.4039 98.739 18.0122 98.739Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1092 98.2188C15.3345 98.2188 15.5335 98.2539 15.7319 98.306L15.7777 98.3183L15.8236 98.3311L15.8696 98.3445L15.9158 98.3583L15.9856 98.3797L16.1039 98.417L16.2504 98.4633L16.3262 98.4867L16.3777 98.5023L16.4302 98.5178C16.4391 98.5203 16.448 98.5229 16.4569 98.5255L16.5109 98.5408C16.52 98.5433 16.5292 98.5458 16.5384 98.5484L16.5941 98.5633C16.9603 98.6599 17.4039 98.739 18.0122 98.739C18.6517 98.739 19.08 98.6516 19.4354 98.5495L19.4869 98.5345L19.5374 98.5193L19.5871 98.504L19.6361 98.4887L19.7083 98.4657L19.8496 98.4203L19.9193 98.3983L19.9657 98.384C19.9734 98.3816 19.9812 98.3793 19.9889 98.3769L20.0353 98.3632L20.0819 98.3498C20.331 98.2799 20.5912 98.2303 20.928 98.2358C21.2955 98.2417 21.5896 98.4304 21.8247 98.7386L21.8227 98.8377L21.8193 98.984L21.8167 99.0799L21.814 99.1746L21.8095 99.3144L21.8046 99.4513L21.7992 99.5854L21.7933 99.7167L21.7892 99.8026L21.7849 99.8874L21.7803 99.9708L21.7756 100.053L21.7706 100.134L21.7655 100.214L21.7601 100.292L21.7545 100.37L21.7488 100.446L21.7428 100.52L21.7367 100.594L21.7303 100.666L21.7238 100.737L21.717 100.807L21.71 100.875L21.7029 100.943L21.6955 101.009L21.6879 101.073L21.6802 101.137C21.6789 101.147 21.6775 101.158 21.6762 101.168L21.6681 101.23C21.6668 101.24 21.6654 101.25 21.664 101.26L21.6557 101.32L21.6471 101.378L21.6383 101.436L21.6293 101.492L21.6202 101.547L21.6108 101.6C21.6092 101.609 21.6076 101.618 21.606 101.626L21.5963 101.678L21.5865 101.728L21.5764 101.778C21.5747 101.786 21.573 101.794 21.5713 101.802L21.5609 101.849C21.5574 101.865 21.5538 101.88 21.5503 101.895L21.5395 101.94C21.5377 101.947 21.5359 101.955 21.534 101.962L21.5229 102.005C21.5117 102.047 21.5003 102.088 21.4885 102.126L21.4766 102.164C20.7824 104.324 19.6267 104.938 18.0195 104.938C16.4123 104.938 15.2665 104.324 14.5723 102.164L14.5601 102.125C14.558 102.118 14.556 102.112 14.554 102.105L14.5421 102.064C14.5401 102.057 14.5381 102.05 14.5362 102.043L14.5245 101.999C14.5226 101.992 14.5207 101.985 14.5188 101.977L14.5075 101.932L14.4964 101.886L14.4854 101.838C14.48 101.814 14.4747 101.789 14.4695 101.764L14.4591 101.713L14.4489 101.66L14.439 101.607L14.4292 101.552L14.4197 101.495L14.4103 101.438L14.4012 101.378C14.3997 101.369 14.3982 101.359 14.3967 101.348L14.3879 101.287L14.3793 101.225C14.3779 101.215 14.3765 101.204 14.3751 101.193L14.3668 101.129L14.3587 101.063L14.3509 100.996C14.3496 100.985 14.3483 100.974 14.347 100.962L14.3395 100.893C14.3382 100.882 14.337 100.87 14.3358 100.858L14.3285 100.787L14.3215 100.715L14.3147 100.641C14.3136 100.629 14.3125 100.617 14.3114 100.604L14.3049 100.529L14.2986 100.452L14.2925 100.373L14.2837 100.253L14.2782 100.172L14.2728 100.089L14.2677 100.005L14.2628 99.9191L14.258 99.8322L14.2535 99.7439L14.2492 99.6544L14.2432 99.5176L14.2394 99.4247L14.2341 99.2829L14.2293 99.1382L14.225 98.9904L14.2211 98.8397L14.2188 98.7376L14.2167 98.6341C14.2163 98.6167 14.216 98.5993 14.2157 98.5818C14.4582 98.3536 14.7524 98.2188 15.1092 98.2188Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18 104C19.1218 104 20.0312 102.867 20.0312 102.203C20.0312 101.081 19.1218 100.875 18 100.875C16.8782 100.875 15.9688 101.081 15.9688 102.203C15.9688 102.867 16.8782 104 18 104Z" fill="#0D222E"/><path d="M17.5654 103.065C17.1943 102.861 16.9308 102.503 16.8496 102.243" stroke="#405B7D" stroke-width="0.703125" stroke-linecap="round"/><path d="M18.6419 101.626C18.8493 101.688 19.0191 101.782 19.1211 101.878" stroke="#405B7D" stroke-width="0.703125" stroke-linecap="round"/><path d="M12.991 105.591C14.862 106.611 17.1012 107.191 18.0014 107.191C18.9022 107.191 21.1311 106.61 22.991 105.589" stroke="black" stroke-width="0.703125" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1092 98.2188C15.3345 98.2188 15.5335 98.2539 15.732 98.306L15.7778 98.3183L15.8236 98.3311L15.8696 98.3445L15.9158 98.3583L15.9856 98.3797L16.1039 98.417L16.2505 98.4633L16.3262 98.4867L16.3778 98.5023L16.4303 98.5178C16.4391 98.5203 16.448 98.5229 16.4569 98.5255L16.5109 98.5408C16.52 98.5433 16.5292 98.5458 16.5384 98.5484L16.5941 98.5633C16.9603 98.6599 17.4039 98.739 18.0122 98.739C18.6518 98.739 19.0801 98.6516 19.4354 98.5495L19.4869 98.5345L19.5374 98.5193L19.5871 98.504L19.6361 98.4887L19.7083 98.4657L19.8496 98.4203L19.9194 98.3983L19.9657 98.384C19.9735 98.3816 19.9812 98.3793 19.9889 98.3769L20.0353 98.3632L20.0819 98.3498C20.3311 98.2799 20.5912 98.2303 20.9281 98.2358C21.2955 98.2417 21.5896 98.4304 21.8247 98.7386L21.8221 98.8655L21.8191 98.9904L21.8158 99.1132L21.8121 99.2339C21.8115 99.2539 21.8108 99.2737 21.8102 99.2935L21.8061 99.4112L21.8016 99.5268L21.7968 99.6403L21.7917 99.7518C21.7908 99.7702 21.7899 99.7885 21.789 99.8067C21.6547 99.7633 21.5095 99.7393 21.3526 99.7373C20.9645 99.7326 20.6321 99.7763 20.3107 99.8377L20.2506 99.8493C20.2406 99.8513 20.2306 99.8533 20.2206 99.8553L20.1607 99.8676L20.101 99.8801L20.0412 99.8929L19.9215 99.919L19.7102 99.9657L19.6183 99.9857L19.5564 99.9989L19.494 100.012L19.4309 100.025C19.4203 100.027 19.4098 100.029 19.3991 100.031L19.335 100.044C18.9588 100.115 18.5422 100.171 18.027 100.171C17.5706 100.171 17.1723 100.127 16.8101 100.067L16.7405 100.055C16.6943 100.047 16.6487 100.038 16.6037 100.03L16.5365 100.017L16.4701 100.004L16.4045 99.9906L16.3395 99.9772L16.2751 99.9637L16.1483 99.9365L15.8704 99.8765L15.8099 99.8636L15.7197 99.8449L15.6599 99.8328L15.6005 99.8211C15.5906 99.8192 15.5807 99.8173 15.5708 99.8155L15.5117 99.8045L15.4527 99.7939L15.3939 99.784C15.1686 99.7468 14.9456 99.7227 14.716 99.7227C14.5509 99.7227 14.3975 99.7418 14.2551 99.7777L14.25 99.6726L14.2451 99.5656L14.2406 99.4568C14.2398 99.4385 14.2391 99.4201 14.2384 99.4017L14.2343 99.2901L14.2305 99.1767L14.2269 99.0614L14.2237 98.9443L14.2207 98.8253L14.2181 98.7045C14.2172 98.664 14.2164 98.6231 14.2157 98.5819C14.4582 98.3536 14.7524 98.2188 15.1092 98.2188Z" fill="#B4C0C9"/></g></g></g></g><defs><filter id="filter0_d_5462_1800" x="0" y="0" width="80" height="118" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5462_1800"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5462_1800" result="shape"/></filter><clipPath id="clip0_5462_1800"><rect x="76" y="3" width="110" height="72" rx="10" transform="rotate(90 76 3)" fill="white"/></clipPath><clipPath id="clip1_5462_1800"><path d="M66 7C69.3137 7 72 9.68629 72 13V87H8L8 13C8 9.68629 10.6863 7 14 7L66 7Z" fill="white"/></clipPath><clipPath id="clip2_5462_1800"><path d="M72 89V103C72 106.314 69.3137 109 66 109H52V89H72Z" fill="white"/></clipPath><clipPath id="clip3_5462_1800"><rect width="20" height="20" fill="white" transform="translate(52 89)"/></clipPath><clipPath id="clip4_5462_1800"><rect width="20" height="20" fill="white" transform="matrix(0 1 -1 0 50 89)"/></clipPath><clipPath id="clip5_5462_1800"><rect width="20" height="20" fill="white" transform="translate(30 89)"/></clipPath><clipPath id="clip6_5462_1800"><path d="M28 89V109H14C10.6863 109 8 106.314 8 103V89H28Z" fill="white"/></clipPath><clipPath id="clip7_5462_1800"><rect width="20" height="20" fill="white" transform="translate(8 89)"/></clipPath></defs></svg>`;