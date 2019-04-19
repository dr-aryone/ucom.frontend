import crypto from 'crypto';
import wordsDict from './wordsDict';

// Remove all earlier saved brainkey, today we don't save brainkey to localstorage
try {
  localStorage.removeItem('brainkey');
} catch (e) {
  console.error(e);
}

export const BRAINKEY_SYMBOLS_REGEXP = /^[a-zA-Z_ ]*$/;
export const BRAINKEY_LENGTH = 12;
export const ERROR_WRONG_BRAINKEY = 'Wrong brainkey format';

export const generateBrainkey = () => {
  const words = wordsDict.en.split(',');
  const bytes = [];

  for (let i = 0; i < 16; i++) {
    bytes.push(crypto.randomBytes(1)[0]);
  }

  const result = bytes.map((item) => {
    let index = Math.floor(Math.random() * words.length);

    if (index > item) {
      index -= item;
    } else {
      index = item - index;
    }

    return words[index];
  });

  result.splice(4, 4);

  return result.join(' ');
};

export const isBrainkeySymbolsValid = value =>
  BRAINKEY_SYMBOLS_REGEXP.test(value);

export const isBrainkeyLengthValid = value =>
  value.split(' ').length === BRAINKEY_LENGTH;
