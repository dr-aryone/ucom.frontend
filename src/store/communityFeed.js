import { uniq, merge } from 'lodash';

const getInitialState = () => ({
  loading: false,
  communityIds: [],
  manyUsers: [],
  metadata: {
    hasMore: false,
    page: 1,
  },
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'ORGANIZATIONS_FEED_RESET':
      return getInitialState();

    case 'ORGANIZATIONS_FEED_SET_IDS':
      return { ...state, communityIds: action.payload };

    case 'ORGANIZATIONS_FEED_PREPEND_IDS':
      return { ...state, communityIds: uniq(action.payload.concat(state.communityIds)) };

    case 'ORGANIZATIONS_FEED_APPEND_IDS':
      return { ...state, communityIds: uniq(state.communityIds.concat(action.payload)) };

    case 'ORGANIZATIONS_FEED_SET_METADATA':
      return { ...state, metadata: action.payload };

    case 'ORGANIZATIONS_FEED_SET_LOADING':
      return { ...state, loading: action.payload };

    case 'ORGANIZATIONS_FEED_SET_SIDE_USERS':
      return { ...state, manyUsers: merge(state.manyUsers, action.payload) };

    default:
      return state;
  }
};
