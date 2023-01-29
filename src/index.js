import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputField = document.getElementById('search-box');
inputField.addEventListener('input', debounce(onGetRequest, DEBOUNCE_DELAY));

const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

let name = '';

async function onGetRequest() {
  name = inputField.value.trim();

  if (inputField.value === '') {
    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';
    return;
  }

  const countriesResponce = await fetchCountries(name);
  listCountry.innerHTML = '';
  infoCountry.innerHTML = '';

  try {
  if (countriesResponce.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countriesResponce.length >= 2 && countriesResponce.length <= 10) {
    const listCountriesMarkup = countriesResponce
      .map(country => {
        return `<li>
            <img src='${country.flags.svg}' alt='Flag' width="80" height="40" />
          <p>${country.name}</p>
          </li>`;
      })
      .join('');}

    listCountry.insertAdjacentHTML('beforeend', listCountriesMarkup);
  }
catch(e){
  if (countriesResponce.length === 1) {
    const countryMarkup = countriesResponce.map(country => {
      return `<img src='${
        country.flags.svg
      }' alt='Flag' width="100" heigth"50" />
          <h2>${country.name}</h2>
          <p><span>Capital:</span>${country.capital}</p> 
          <p><span>Population:</span>${country.population}</p> 
          <p><span>Laguages:</span>${country.languages.map(
            name => name.name
          )}</p> `;
    });

    infoCountry.insertAdjacentHTML('beforeend', countryMarkup);
  }
} }