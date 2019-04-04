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
