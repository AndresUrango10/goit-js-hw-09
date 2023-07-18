import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      // console.log(shouldResolve);

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();

  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);

  for (let i = 0; i < amount.value; i += 1) {
    const position = i + 1;
    const delay = firstDelay + i * delayStep;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  form.reset();
});
