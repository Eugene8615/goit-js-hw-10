import { Notify } from 'notiflix/build/notiflix-notify-aio';
export async function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  const response = await fetch(url);
  const countries = await response.json();

  if (response.ok === false) {
    throw new Error (Notify.failure('Oops, there is no country with that name'));
  }
  return countries;
}