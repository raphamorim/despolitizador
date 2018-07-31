import forEach from 'lodash/forEach';
import json from '../library.json';
import { removeAccent } from './convert.js'; 
import { debounce } from './debounce.js'; 
import { capitalizeFirstLetter } from './capitalize'; 

const generateRandomKey = (data = []) => Math.floor(Math.random() * (data.length - 0) + 0);

const translate = (library, input) => {
  let text = input;
  forEach(library, (value, key) => { 
    const regex = new RegExp(removeAccent(key), 'gm'); 
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
    $result.value = translate(json, capitalizeFirstLetter(phrase));
  };

  $translator.addEventListener('keyup', (e) => debounce(textTranslate(), 600));
  window.addEventListener('load', () => getRandomText());
};