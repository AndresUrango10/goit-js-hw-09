const START_BUTTON = document.querySelector('button[data-start]');
const STOP_BUTTON = document.querySelector('button[data-stop]');
STOP_BUTTON.disabled = true;
const BODY = document.querySelector('body');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function changeBackgroundColor() {
  const COLOR = getRandomHexColor();
  BODY.style.backgroundColor = COLOR;
}

START_BUTTON.addEventListener('click', () => {
  intervalId = setInterval(changeBackgroundColor, 1000);
  START_BUTTON.disabled = true;
  STOP_BUTTON.disabled = false;
});

STOP_BUTTON.addEventListener('click', () => {
  clearInterval(intervalId);
  START_BUTTON.disabled = false;
  STOP_BUTTON.disabled = true;
});
