
import * as overviewUtils from '../utils/overview';
import graphql from '../api/graphql';

export const tagsFeedReset = () => ({ type: 'TAGS_FEED_RESET' });
export const tagsFeedSetLoading = payload => ({ type: 'TAGS_FEED_SET_LOADING', payload });
export const tagsFeedSetMetadata = payload => ({ type: 'TAGS_FEED_SET_METADATA', payload });
export const tagsFeedSetIds = payload => ({ type: 'TAGS_FEED_SET_IDS', payload });
export const tagsFeedPrependIds = payload => ({ type: 'TAGS_FEED_PREPEND_IDS', payload });
export const tagsFeedAppendIds = payload => ({ type: 'TAGS_FEED_APPEND_IDS', payload });
export const tagsFeedSetSideUsers = payload => ({ type: 'TAGS_FEED_SET_SIDE_USERS', payload });

export const tagsFeedGet = ({
  page,
  perPage,
  categoryId,
}) => async (dispatch) => {
  const filter = {
    [overviewUtils.OVERVIEW_CATEGORIES_HOT_ID]: 'Hot',
    [overviewUtils.OVERVIEW_CATEGORIES_TRENDING_ID]: 'Trending',
    [overviewUtils.OVERVIEW_CATEGORIES_FRESH_ID]: 'Fresh',
    [overviewUtils.OVERVIEW_CATEGORIES_TOP_ID]: 'Top',
  };

  const params = {
    page,
    perPage,
    filter: filter[categoryId],
    tab: 'Tags',
  };


  dispatch(tagsFeedSetLoading(true));

  try {
    const data = await graphql.getOverview(params);
    dispatch(tagsFeedAppendIds(data.manyTags.data));
    dispatch(tagsFeedSetMetadata(data.manyTags.metadata));
    // dispatch(tagsFeedSetSideUsers(data.manyUsers.data));
    // dispatch(addUsers(data.manyUsers.data));
  } catch (e) {
    console.error(e);
  }

  dispatch(tagsFeedSetLoading(false));
};
