import _ from 'lodash';

export const getEntryImageAttr = (entry, type, attr, index) => {
  try {
    return entry.entityImages[type][index][attr];
  } catch (e) {
    return null;
  }
};

export const removeCoverImage = entry => ({ ...entry, articleTitle: [] });

export const changeCoverImageUrl = (entry, url) => {
  if (_.isString(entry)) {
    entry = JSON.parse(entry);
  }

  return {
    ...entry,
    articleTitle: [{ url }],
  };
};

export const getCoverImage = entry =>
  getEntryImageAttr(entry, 'articleTitle', 'url', 0);

export const getGalleryImage = entry =>
  getEntryImageAttr(entry, 'gallery', 'url', 0);

