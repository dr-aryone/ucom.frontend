import crypto from 'crypto';
import wordsDict from './wordsDict';

export const BRAINKEY_SYMBOLS_REGEXP = /^[a-zA-Z_ ]*$/;
export const BRAINKEY_LENGTH = 12;

export const saveBrainkey = (token) => {
  localStorage.setItem('brainkey', token);
};

export const getBrainkey = () => (
  localStorage.getItem('brainkey')
);

export const removeBrainkey = () => (
  localStorage.removeItem('brainkey')
);

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
