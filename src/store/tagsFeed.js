import { uniq, merge } from 'lodash';

const getInitialState = () => ({
  loading: false,
  tagIds: [],
  manyUsers: [],
  metadata: {
    hasMore: false,
    page: 1,
  },
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'TAGS_FEED_RESET':
      return getInitialState();

    case 'TAGS_FEED_SET_IDS':
      return { ...state, tagIds: action.payload };

    case 'TAGS_FEED_PREPEND_IDS':
      return { ...state, tagIds: uniq(action.payload.concat(state.tagIds)) };

    case 'TAGS_FEED_APPEND_IDS':
      return { ...state, tagIds: uniq(state.tagIds.concat(action.payload)) };

    case 'TAGS_FEED_SET_METADATA':
      return { ...state, metadata: action.payload };

    case 'TAGS_FEED_SET_LOADING':
      return { ...state, loading: action.payload };

    case 'TAGS_FEED_SET_SIDE_USERS':
      return { ...state, manyUsers: merge(state.manyUsers, action.payload) };

    default:
      return state;
  }
};
