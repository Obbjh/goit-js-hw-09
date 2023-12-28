import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datePickerInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

startBtn.disabled = true;
let intervalId = null;
let chosenDate = 0;


const fp = flatpickr(datePickerInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime() - new Date().getTime(); 
    console.log(chosenDate);

    if (chosenDate > 0) {
        startBtn.disabled = false;
        startBtn.addEventListener('click', onStartTimer);
    } else {
        startBtn.disabled = true,
        Notiflix.Notify.failure('Please choose the future time');
    }
    } 
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function onStartTimer() {
    startBtn.disabled = true;
    intervalId = setInterval(() => {
    showTime();
    chosenDate -= 1000
        
    if (chosenDate <= 0) {
      clearInterval(intervalId);
      startBtn.disabled = true;  
    }
        
    }, 1000);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function showTime() {
    const timeComponents = convertMs(chosenDate);

    daysEl.textContent = addLeadingZero(timeComponents.days);
    hoursEl.textContent = addLeadingZero(timeComponents.hours);
    minutesEl.textContent = addLeadingZero(timeComponents.minutes);
    secondsEl.textContent = addLeadingZero(timeComponents.seconds);
}

