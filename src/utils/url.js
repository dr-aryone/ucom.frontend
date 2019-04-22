import { memoize } from 'lodash';

export const extractHostname = (url) => {
  if (!url) {
    return null;
  }

  let hostname;

  if (url.indexOf('//') > -1) {
    [, , hostname] = url.split('/');
  } else {
    [hostname] = url.split('/');
  }

  [hostname] = hostname.split(':');
  [hostname] = hostname.split('?');

  const name = hostname.replace('www.', '').split('.');

  return name.join('.');
};

export const extractSitename = (url) => {
  const hostname = extractHostname(url);

  if (!hostname) {
    return null;
  }

  return hostname.split('.')[0];
};

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/49849482
/* eslint-disable */
export const validURL = memoize((str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  return !!pattern.test(str);
});
/* eslint-enable */

export const filterURL = (url) => {
  if (validURL(url)) {
    return url;
  }

  return '';
};
