import "./index.css";
import summerSound from './assets/sounds/summer.mp3';
import rainySound from './assets/sounds/rain.mp3';
import winterSound from './assets/sounds/winter.mp3';

const backgroundElement: HTMLDivElement = document.querySelector('.background');
const sunnyButton: HTMLButtonElement = document.querySelector('.card-sunny');
const rainyButton: HTMLButtonElement = document.querySelector('.card-rainy');
const winterButton: HTMLButtonElement = document.querySelector('.card-winter');

const summerAudio: HTMLAudioElement = new Audio(summerSound);
const rainyAudio: HTMLAudioElement = new Audio(rainySound);
const winterAudio: HTMLAudioElement = new Audio(winterSound);

summerAudio.volume = 0.5;
rainyAudio.volume = 0.5;
winterAudio.volume = 0.5;

let isSummerPlaying: boolean = false;
let isRainyPlaying: boolean = false;
let isWinterPlaying: boolean = false;

const removeAllBgClasses = (): void => {
  backgroundElement.classList.remove('sunny-bg', 'rainy-bg', 'winter-bg');
}

sunnyButton.addEventListener('click', (): void => {
  removeAllBgClasses();
  backgroundElement.classList.add('sunny-bg');

  if (isSummerPlaying) {
    summerAudio.pause();
    isSummerPlaying = false;
  } else {
    rainyAudio.pause();
    winterAudio.pause();
    summerAudio.play();
    isSummerPlaying = true;
    isRainyPlaying = false;
    isWinterPlaying = false;
  }
});

rainyButton.addEventListener('click', (): void => {
  removeAllBgClasses();
  backgroundElement.classList.add('rainy-bg');
  
  if (isRainyPlaying) {
    rainyAudio.pause();
    isRainyPlaying = false;
  } else {
    summerAudio.pause();
    winterAudio.pause();
    rainyAudio.play();
    isSummerPlaying = false;
    isRainyPlaying = true;
    isWinterPlaying = false;
  }
});

winterButton.addEventListener('click', (): void => {
  removeAllBgClasses();
  backgroundElement.classList.add('winter-bg');
  
  if (isWinterPlaying) {
    winterAudio.pause();
    isWinterPlaying = false;
  } else {
    summerAudio.pause();
    rainyAudio.pause();
    winterAudio.play();
    isSummerPlaying = false;
    isRainyPlaying = false;
    isWinterPlaying = true;
  }
});

const volumeElement: HTMLDivElement = document.querySelector('.volume');
const volumeFilled: HTMLDivElement = volumeElement.querySelector('.volume-filled');
const thumbElement: HTMLDivElement = volumeElement.querySelector('.thumb');
const volumeValueElement: HTMLDivElement = document.querySelector('.volume-value');

volumeValueElement.innerText = '50 %';

volumeElement.onmouseenter = (): void => {
  volumeValueElement.classList.remove('volume-value_hidden');
}

volumeElement.onmouseleave = (): void => {
  volumeValueElement.classList.add('volume-value_hidden');
}

thumbElement.onmousedown = (event: MouseEvent): void => {
  event.preventDefault();

  let shiftX: number = event.clientX - thumbElement.getBoundingClientRect().left;

  const onMouseMove = (event: MouseEvent) => {

    let newLeft: number = event.clientX - shiftX - volumeElement.getBoundingClientRect().left;
    if (newLeft < 0) {
      newLeft = 0;
    }

    let rightEdge: number = volumeElement.offsetWidth - thumbElement.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumbElement.style.left = newLeft + 'px';
    volumeFilled.style.right = volumeElement.offsetWidth - thumbElement.offsetWidth - newLeft + 'px';

    const volumeValueRatio = newLeft / (volumeElement.offsetWidth  - thumbElement.offsetWidth);

    summerAudio.volume = volumeValueRatio;
    rainyAudio.volume = volumeValueRatio;
    winterAudio.volume = volumeValueRatio;

    volumeValueElement.innerText = (100 * volumeValueRatio).toFixed(0) + ' %';
  }

  const onMouseUp = (): void => {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

thumbElement.ondragstart = (): boolean => {
  return false;
};