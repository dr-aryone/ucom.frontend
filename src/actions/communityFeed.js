
import * as overviewUtils from '../utils/overview';

import graphql from '../api/graphql';

export const communityFeedReset = () => ({ type: 'ORGANIZATIONS_FEED_RESET' });
export const communityFeedSetLoading = payload => ({ type: 'ORGANIZATIONS_FEED_SET_LOADING', payload });
export const communityFeedSetMetadata = payload => ({ type: 'ORGANIZATIONS_FEED_SET_METADATA', payload });
export const communityFeedSetIds = payload => ({ type: 'ORGANIZATIONS_FEED_SET_IDS', payload });
export const communityFeedPrependIds = payload => ({ type: 'ORGANIZATIONS_FEED_PREPEND_IDS', payload });
export const communityFeedAppendIds = payload => ({ type: 'ORGANIZATIONS_FEED_APPEND_IDS', payload });
export const communityFeedSetSideUsers = payload => ({ type: 'ORGANIZATIONS_FEED_SET_SIDE_USERS', payload });

export const communityFeedGet = ({
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
    tab: 'Organizations',
    filter: filter[categoryId],
    page,
    perPage,
  };
  dispatch(communityFeedSetLoading(true));

  try {
    const data = await graphql.getOverview(params);
    dispatch(communityFeedAppendIds(data.manyOrganizations.data));
    dispatch(communityFeedSetMetadata(data.manyOrganizations.metadata));
    // dispatch(communityFeedSetSideUsers(data.manyUsers.data));
    // dispatch(addUsers(data.manyUsers.data));
  } catch (e) {
    console.error(e);
  }

  dispatch(communityFeedSetLoading(false));
};
