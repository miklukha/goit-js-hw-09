import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onClickBtnCreate);

function onClickBtnCreate(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  const delayStep = Number(e.currentTarget.step.value);
  const amountOfPromises = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amountOfPromises; position += 1) {
    checkStatusPromise(position, delay);
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function checkStatusPromise(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
