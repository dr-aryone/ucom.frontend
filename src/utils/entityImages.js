import _ from 'lodash';

export const getEntryImageAttr = (entry, type, attr, index) => {
  try {
    return entry.entityImages[type][index][attr];
  } catch (e) {
    return null;
  }
};

export const removeCoverImage = entry => ({ ...entry, articleTitle: [] });
export const removeGalleryImage = (entry, index) => ({ ...entry, gallery: entry.gallery.filter((image, id) => id !== index) });

export const changeCoverImageUrl = (entry, url) => {
  if (_.isString(entry)) {
    entry = JSON.parse(entry);
  }

  return {
    ...entry,
    articleTitle: [{ url }],
  };
};

export const addGalleryImages = (entry, gallery) => {
  if (_.isString(entry)) {
    entry = JSON.parse(entry);
  }

  return entry.gallery ? {
    ...entry,
    gallery: [...entry.gallery, ...gallery],
  } : {
    ...entry,
    gallery,
  };
};


export const getCoverImage = entry =>
  getEntryImageAttr(entry, 'articleTitle', 'url', 0);

export const getGalleryImages = (entry) => {
  try {
    return entry.entityImages.gallery.map(image => image.url);
  } catch (e) {
    return [];
  }
};
