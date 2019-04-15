export const removeCoverImages = entry => ({ ...entry, articleTitle: [] });
export const changeCoverImagesUrl = (entry, url) => ({
  ...entry,
  articleTitle: [{ url }],
});
