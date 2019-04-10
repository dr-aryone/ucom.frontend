import { memoize } from 'lodash';
import sanitizeHtml from 'sanitize-html';
import urls from './urls';

const URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
export const IMG_URL_REGEXP = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;

export const escapeQuotes = memoize((text = '') => text.replace(/&quot;/g, '"'));

const makeLinkTag = (match) => {
  match = match.toLowerCase();
  const link = match.slice(0, 1) === '>' ? match.slice(1).replace('#', '').trim() : match.replace('#', '').trim();
  const result = match.slice(0, 1) === '>' ? `><a href='/tags/${link}' class='tag_link' target='_blank'>${match.slice(1)}</a>` :
    `<a href='/tags/${link}' class='tag_link' target='_blank'>${match}</a>`;
  return result;
};

export const checkHashTag = memoize((text = '') => text.replace(/(^|\s|>)#[a-zA-Z]\w*/gm, makeLinkTag));

export const existHashTag = (text, tag) => {
  const result = text.match(/#[a-zA-Z]\w*/gm);
  if (result) {
    return result.some(item => item === `#${tag}`);
  }
  return false;
};

const makeLinkMention = (match) => {
  match = match.toLowerCase();
  const accountName = match.slice(0, 1) === '>' ? match.slice(1).replace('@', '').trim() : match.replace('@', '').trim();
  const result = match.slice(0, 1) === '>' ? `><a href=${urls.getUserUrl(accountName)} class='mention_link' target='_blank'>${match.slice(1)}</a>` :
    `<a href=${urls.getUserUrl(accountName)} class='mention_link' target='_blank'>${match}</a>`;
  return result;
};

export const checkMentionTag = memoize((text = '') => text.replace(/(^|\s|>)@[a-zA-Z0-9]\w*/gm, makeLinkMention));

export const existMentionTag = (text, tag) => {
  const result = text.match(/@[a-zA-Z0-9]\w*/gm);
  if (result) {
    return result.some(item => item === `@${tag}`);
  }
  return false;
};

export const removeMultipleNewLines = memoize((str = '') => str.replace(/(\r\n|\r|\n){2,}/g, '$1\n'));

export const makeLink = memoize((text = '') => text.replace(URL_REGEX, url => `<a target="_blank" href="${url}">${url}</a>`));

export const getTextContent = memoize((content) => {
  const text = document.createElement('div');
  text.innerHTML = content;

  return text.textContent;
});

export const sanitizePostText = memoize(html => sanitizeHtml(html, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'h2', 'h1']),
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  allowedSchemes: ['http', 'https'],
  allowedAttributes: {
    iframe: ['src', 'allowfullscreen', 'allow'],
    a: ['href', 'name', 'target', 'class'],
    img: ['src'],
  },
  allowedClasses: {
    div: [
      'medium-insert-images',
      'medium-insert-images-grid',
      'medium-insert-images-wide',
      'medium-insert-embeds',
      'medium-insert-embeds-wide',
      'medium-insert-embed',
      'medium-upload-iframe-wrapper',
    ],
    a: [
      'tag_link',
      'mention_link',
    ],
    iframe: [
      'iframe-video',
    ],
  },
  transformTags: {
    'a': sanitizeHtml.simpleTransform('a', { target: '_blank' }),
  },
}));

export const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const sanitizeCommentText = memoize(html => sanitizeHtml(html, {
  allowedTags: ['a'],
  allowedSchemes: ['http', 'https'],
  allowedAttributes: {
    a: ['href', 'target', 'class'],
  },
  textFilter: text => escapeQuotes(removeMultipleNewLines(makeLink(text))),
}));

export const sanitizePostTitle = memoize(text => sanitizeHtml(text));

/* eslint-disable */
export const calculateClosestTo0 = arr => arr.reduce(
  (acc, x) =>
    (acc === 0 ? x :
      x > 0 && x <= Math.abs(acc) ? x :
        x < 0 && -x < Math.abs(acc) ? x : acc)
  , 0,
);
/* eslint-enable */

export const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);
