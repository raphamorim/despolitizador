import filter from 'lodash/filter';
import json from '../library.json';
import { debounce } from './debounce.js';
import { capitalizeFirstLetter } from './capitalize';
import { removeAccent } from './convert';

const generateRandomKey = (data = []) => Math.floor(Math.random() * (data.length - 0) + 0);

export const translate = (library, inputText) => {
  let translatedText = inputText;
  filter(library, (politicalLanguage, peopleLanguage) => {
    const peopleLanguageRegex = new RegExp(peopleLanguage, 'gm');
    const peopleLanguageWithoutAccentRegex = new RegExp(removeAccent(peopleLanguage), 'gm');

    translatedText = translatedText
      .replace(peopleLanguageRegex, politicalLanguage)
      .replace(peopleLanguageWithoutAccentRegex, politicalLanguage);
  });
  return translatedText;
};

export const translator = (e) => {
  const $translator = document.querySelector('[data-translator="input"]');
  const $result = document.querySelector('[data-translator="result"]');
  const $reload = document.querySelector('[data-translator="reload"]');

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
  $reload.addEventListener('click', () => getRandomText());
  window.addEventListener('load', () => getRandomText());
};
