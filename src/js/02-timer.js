import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

btnStart.disabled = true;

Notiflix.Notify.failure('Por favor seleccione una fecha para iniciar');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Por favor seleccione una fecha en el futuro');
      btnStart.disabled = true;
    } else {
      Notiflix.Notify.success(
        'Fecha establecida, Haga clic en "Start" para comenzar'
      );
      btnStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  let timerId = setInterval(() => {
    // Calcula la cantidad de milisegundos restantes hasta la fecha seleccionada restando la fecha actual
    let countdown = new Date(text.value) - new Date();

    btnStart.disabled = true;

    if (countdown >= 0) {
      // toma el valor de countdown, que es la cantidad de milisegundos restantes hasta la fecha y hora seleccionada
      let timeObject = convertMs(countdown);

      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);

      if (countdown <= 10000) {
        timerHtml.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Cuenta regresiva terminada');
      timerHtml.style.color = 'black';
      clearInterval(timerId);
    }
  }, 1000);
});
