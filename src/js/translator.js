import filter from 'lodash/filter';
import json from '../library.json';
import { debounce } from './debounce.js';
import { capitalizeFirstLetter } from './capitalize';

const generateRandomKey = (data = []) => Math.floor(Math.random() * (data.length - 0) + 0);

const translate = (library, input) => {
  let text = input;
  filter(library, (value, key) => {
    const regex = new RegExp(key, 'gm');
    text = text.replace(regex, value);
  });
  return text;
};

export const translator = (e) => {
  const $translator = document.querySelector('[data-translator="input"]');
  const $result = document.querySelector('[data-translator="result"]');

  const textTranslate = (e) => {
    let text;
    text = $translator.value.toLowerCase();
    if(text === ''){
      $translator.placeholder = 'Digitar texto...';
      $result.value = 'Tradução';
      return;
    }
    text = translate(json, text);
    $result.value = capitalizeFirstLetter(text) || 'Tradução';
    $translator.value = capitalizeFirstLetter($translator.value);
  };

  const getRandomText = () => {
    const keys = Object.keys(json);
    const phrase = keys[generateRandomKey(keys)];
    $translator.placeholder = capitalizeFirstLetter(phrase);
    $result.value = capitalizeFirstLetter(translate(json, phrase));
  };

  $translator.addEventListener('keyup', (e) => debounce(textTranslate(), 600));
  window.addEventListener('load', () => getRandomText());
};
