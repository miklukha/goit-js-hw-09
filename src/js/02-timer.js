import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    checkValidDate();
  },
};

flatpickr('#datetime-picker', options);

let selectedDate = null;
let counterId = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  daysText: document.querySelector('span[data-days]'),
  hoursText: document.querySelector('span[data-hours]'),
  minutesText: document.querySelector('span[data-minutes]'),
  secondsText: document.querySelector('span[data-seconds]'),
};

refs.btnStart.addEventListener('click', onClickBtnStart);

function checkValidDate() {
  const currentDate = options.defaultDate;

  if (currentDate > selectedDate) {
    Notify.failure('Please choose a date in the future');
    return;
  }

  refs.btnStart.removeAttribute('disabled');
}

function onClickBtnStart() {
  let deltaTime = selectedDate - options.defaultDate;
  startCountdown(deltaTime);

  refs.btnStart.setAttribute('disabled', 'disabled');

  counterId = setInterval(() => {
    deltaTime -= 1000;
    startCountdown(deltaTime);
  }, 1000);
}

function startCountdown(deltaTime) {
  if (deltaTime < 1000) {
    stopCountdown();
  }

  const formattedTime = convertMs(deltaTime);
  updateTimeText(formattedTime);
}

function stopCountdown() {
  clearInterval(counterId);
  refs.btnStart.removeAttribute('disabled');
}

function updateTimeText({ days, hours, minutes, seconds }) {
  refs.daysText.textContent = addLeadingZero(days);
  refs.hoursText.textContent = addLeadingZero(hours);
  refs.minutesText.textContent = addLeadingZero(minutes);
  refs.secondsText.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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
