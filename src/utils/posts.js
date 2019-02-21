import { truncate } from 'lodash';
import urls from './urls';

export const UPVOTE_STATUS = 'upvote';
export const DOWNVOTE_STATUS = 'downvote';
export const NOVOTE_STATUS = 'no_vote';

export const POST_TYPE_MEDIA_ID = 1;
export const POST_TYPE_OFFER_ID = 2;
export const POST_TYPE_DIRECT_ID = 10;
export const POST_TYPE_REPOST_ID = 11;

export const POSTS_CATREGORIES_HOT_ID = 1;
export const POSTS_CATREGORIES_TRENDING_ID = 2;
export const POSTS_CATREGORIES_FRESH_ID = 3;
export const POSTS_CATREGORIES_TOP_ID = 4;

export const POSTS_TITLE_MAX_LENGTH = 255;
export const POSTS_LEADING_TEXT_MAX_LENGTH = 255;

export const POSTS_DRAFT_LOCALSTORAGE_KEY = 'post_data_v_1';

export const POSTS_DESCRIPTION_PREVIEW_LIMIT = 400;

export const POSTS_CATREGORIES = [{
  id: POSTS_CATREGORIES_TRENDING_ID,
  name: 'trending',
}, {
  id: POSTS_CATREGORIES_HOT_ID,
  name: 'hot',
}, {
  id: POSTS_CATREGORIES_FRESH_ID,
  name: 'fresh',
}, {
  id: POSTS_CATREGORIES_TOP_ID,
  name: 'top',
}];

export const getPostUrl = (postId) => {
  if (!postId) {
    return null;
  }

  return `/posts/${postId}`;
};

export const getPostEditUrl = (postId) => {
  if (!postId) {
    return null;
  }

  return `/posts/${postId}/edit`;
};

export const getPostTypeById = (postTypeId) => {
  switch (postTypeId) {
    case POST_TYPE_DIRECT_ID:
      return 'post';
    case POST_TYPE_OFFER_ID:
      return 'offer';
    case POST_TYPE_MEDIA_ID:
      return 'story';
    case POST_TYPE_REPOST_ID:
      return 'repost';
    default:
      return null;
  }
};

export const postIsEditable = (createdAt) => {
  if (!createdAt) {
    return false;
  }

  return (new Date()).getTime() - (new Date(createdAt)).getTime() < 600000;
};

export const getPostBody = (post) => {
  const createdAtTime = Number.isInteger(+post.createdAt) ? +post.createdAt : new Date(post.createdAt);
  const newPostsTime = 1545226768471;
  const postIsNewEditor = createdAtTime - newPostsTime > 0;

  if (postIsNewEditor) {
    return post.description;
  }

  let postBody = post.description;

  if (post.mainImageFilename) {
    postBody = `<p><img src="${urls.getFileUrl(post.mainImageFilename)}" /></p>`.concat(postBody);
  }

  if (post.leadingText) {
    postBody = `<h2>${post.leadingText}</h2>`.concat(postBody);
  }

  if (post.title) {
    postBody = `<h1>${post.title}</h1>`.concat(postBody);
  }

  return postBody;
};

export const getPostCover = (post) => {
  try {
    return post.entityImages.articleTitle[0].url;
  } catch (e) {
    return null;
  }
};

export const parseMediumContent = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  const childNodes = Array.from(div.childNodes);
  const img = div.querySelector('img');

  let title = null;
  let leadingText = null;
  let entityImages = null;

  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].textContent) {
      title = truncate(childNodes[i].textContent, {
        length: POSTS_TITLE_MAX_LENGTH,
        separator: ' ',
      });
      childNodes.splice(i, 1);
      break;
    }
  }

  for (let i = 0; i < childNodes.length; i++) {
    if (childNodes[i].textContent) {
      leadingText = truncate(childNodes[i].textContent, {
        length: POSTS_LEADING_TEXT_MAX_LENGTH,
        separator: ' ',
      });
      break;
    }
  }

  if (!leadingText) {
    leadingText = title;
  }

  if (img) {
    entityImages = {
      articleTitle: [{
        url: img.src,
      }],
    };
  }

  return ({
    title, leadingText, entityImages, description: html,
  });
};

export const getContentMetaTags = (post) => {
  const articleTitle = post.entityImages && post.entityImages.articleTitle;
  const image = articleTitle && articleTitle[0] && articleTitle[0].url;

  return {
    image,
    type: 'article',
    title: post.title,
    description: post.leadingText,
    path: urls.getPostUrl(post),
  };
};
