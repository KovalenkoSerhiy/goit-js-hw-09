// Імпорт flatpickr
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів flatpickr
import 'flatpickr/dist/flatpickr.min.css';
// Імпорт Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  btnStart: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};


refs.btnStart.addEventListener('click', onBtnClick);

// 
let timeInterval = null;
refs.btnStart.setAttribute('disabled', true);
const INTERVAL = 1000;

let chosenDate = null;
let actualDate = null;
let timeToFinish = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    actualDate = new Date();
    timeToFinish = chosenDate - actualDate;

    if (timeToFinish > 0) {
      Notify.success('You can start countdown');
      refs.btnStart.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.setAttribute('disabled', true);
    }
  },
};

flatpickr(refs.input, options);


function onBtnClick() {
  actualDate = new Date();
  timeToFinish = chosenDate - actualDate;
  if (timeToFinish > 0) {
    Notify.success('We are starting countdown');
    startCountdown();
    refs.btnStart.setAttribute('disabled', true);
    refs.input.setAttribute('disabled', true);
  } else {
    Notify.failure('Please choose a date in the future');
    refs.btnStart.setAttribute('disabled', true);
  }
}

function startCountdown() {
  interfaceUpdate(addLeadingZero(convertMs(timeToFinish)));
  timeInterval = setInterval(() => {
    timeToFinish -= INTERVAL;

    interfaceUpdate(addLeadingZero(convertMs(timeToFinish)));

    if (timeToFinish < INTERVAL) {
      stopCountdown();
      Notify.success('TIME IS OVER');
      refs.btnStart.removeAttribute('disabled');
      refs.input.removeAttribute('disabled');
    }
  }, INTERVAL);
}

function stopCountdown() {
  clearInterval(timeInterval);
}

function interfaceUpdate({
  formatDays,
  formatHours,
  formatMinutes,
  formatSeconds,
}) {
  refs.days.textContent = formatDays;
  refs.hours.textContent = formatHours;
  refs.minutes.textContent = formatMinutes;
  refs.seconds.textContent = formatSeconds;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = INTERVAL;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функції для форматування часу 
function formatTime(time) {
  return String(time).padStart(2, '0');
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const formatDays = formatTime(days);
  const formatHours = formatTime(hours);
  const formatMinutes = formatTime(minutes);
  const formatSeconds = formatTime(seconds);

  return { formatDays, formatHours, formatMinutes, formatSeconds };
}