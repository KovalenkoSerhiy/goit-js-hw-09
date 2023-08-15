// Імпорт flatpickr
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів для flatpickr
import 'flatpickr/dist/flatpickr.min.css';
// Імпорт Notify
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Селекторn DOM

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

// Disablet "Start"
refs.startBtn.setAttribute('disabled', true);