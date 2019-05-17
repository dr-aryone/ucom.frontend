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

export const addGalleryImages = (entry, newGallery) => {
  if (_.isString(entry)) {
    entry = JSON.parse(entry);
  }

  const gallery = entry && entry.gallery ? [...entry.gallery, ...newGallery] : newGallery;
  const err = 'Error: more than 10 images';

  if (gallery.length > 10) {
    throw err;
  }

  return {
    ...entry,
    gallery,
  };
};

export const addGalleryImagesWithCatch = callback => (entry, gallery) => {
  try {
    return addGalleryImages(entry, gallery);
  } catch (e) {
    callback(e);
    return entry;
  }
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
