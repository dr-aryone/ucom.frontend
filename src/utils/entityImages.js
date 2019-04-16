export const getEntryImageAttr = (entry, type, attr, index) => {
  try {
    return entry.entityImages[type][index][attr];
  } catch (e) {
    return null;
  }
};

export const removeCoverImage = entry => ({ ...entry, articleTitle: [] });

export const changeCoverImageUrl = (entry, url) => ({
  ...entry,
  articleTitle: [{ url }],
});

export const getCoverImage = entry =>
  getEntryImageAttr(entry, 'articleTitle', 'url', 0);

