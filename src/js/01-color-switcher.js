
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', onClickChangeColor);
stopBtn.addEventListener('click', onClickStopColor);

let intervalId = null;
stopBtn.setAttribute('disabled', true);

function onClickChangeColor() {
    stopBtn.removeAttribute('disabled');
    intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
    }, 1000);
    startBtn.setAttribute('disabled', true);
}

function onClickStopColor() {
    startBtn.removeAttribute('disabled');
    clearInterval(intervalId);
    stopBtn.setAttribute('disabled', true);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}


