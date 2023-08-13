import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
const select = document.querySelector(`.breed-select`);

const catInfo = document.querySelector(`.cat-info`);

select.addEventListener(`change`, onSelect);

const loader = document.querySelector(`.loader`);
const error = document.querySelector(`.error`);

fetchBreeds()
  .then(arr => {
    onLoad();
    select.innerHTML = createMarkup(arr.data);
    slim();
  })
  .catch(fetchError);

function onSelect(event) {
  const id = event.target.value;
  fetchCatByBreed(id)
    .then(cat => {
      onLoad();
      catInfo.innerHTML = createMarkupCat(cat.data);
    })
    .catch(fetchError);
}
function fetchError() {
  error.hidden = false;
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function onLoad() {
  loader.textContent = ``;
}
function createMarkup(arr) {
  return arr
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
}

function createMarkupCat({
  0: {
    breeds: {
      0: { temperament, name, description },
    },
    url,
  },
}) {
  return `<img src="${url}" alt="${name}" width="800" height="500" />
  <div class="wrapper">
  <h1 class="title">${name}</h1>
  <p class="description">${description}</p>
  <h2>Temperament:</h2>
  <p class="description">${temperament}</p></div>`;
}
function slim() {
  new SlimSelect({
    select: select,
  });
}
