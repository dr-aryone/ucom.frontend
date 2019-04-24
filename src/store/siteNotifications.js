import { uniqueId } from 'lodash';

export const CONGRATULATIONS_EVENT_ID = 10;
export const USER_FOLLOWS_YOU = 30;
export const USER_UPVOTES_YOUR_POST = 31;
export const USER_DOWNVOTES_YOUR_POST = 32;
export const USER_UPVOTES_YOUR_COMMENT = 33;
export const USER_DOWNVOTES_YOUR_COMMENT = 34;
export const USER_FOLLOWS_ORG = 50;
export const USER_UPVOTES_ORG_POST = 51;
export const USER_DOWNVOTES_ORG_POST = 52;
export const USER_UPVOTES_ORG_COMMENT = 53;
export const USER_DOWNVOTES_ORG_COMMENT = 54;
export const USER_CREATES_DIRECT_POST_FOR_YOU = 70;
export const USER_COMMENTS_YOUR_POST = 71;
export const USER_LEAVES_COMMENT_ON_YOUR_COMMENT = 72;
export const USER_CREATES_DIRECT_POST_FOR_ORG = 90;
export const USER_COMMENTS_ORG_POST = 91;
export const USER_LEAVES_COMMENT_ON_ORG_COMMENT = 92;
export const USER_SHARE_YOUR_POST = 73;
export const USER_SHARE_YOUR_MEDIA_POST = 93;
export const USER_HAS_MENTIONED_YOU_IN_POST = 120;
export const USER_HAS_MENTIONED_YOU_IN_COMMENT = 121;
export const USER_TRUST_YOU = 36;


const getInitialState = () => ({
  list: {},
  metadata: {},
  tooltipVisibilty: false,
  totalUnreadAmount: 0,
  loading: false,
  tempArray: [],
});

const siteNotifications = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SITE_NOTIFICATIONS__RESET_TOOLTIP': {
      return getInitialState();
    }

    case 'SITE_NOTIFICATIONS__RESET_TOOLTIP_DATA': {
      return {
        ...state,
        list: getInitialState().list,
        metadata: getInitialState().metadata,
      };
    }

    case 'SITE_NOTIFICATIONS__HIDE_TOOLTIP': {
      return {
        ...state,
        tooltipVisibilty: false,
      };
    }

    case 'SITE_NOTIFICATIONS__SHOW_TOOLTIP': {
      return {
        ...state, tooltipVisibilty: true,
      };
    }

    case 'SITE_NOTIFICATIONS__SET_UNREAD_AMOUNT': {
      return {
        ...state, totalUnreadAmount: action.payload,
      };
    }

    case 'SITE_NOTIFICATIONS__SET_TEMP_ARRAY': {
      return {
        ...state, tempArray: action.payload,
      };
    }

    case 'SITE_NOTIFICATIONS__SET_LOADING': {
      return {
        ...state, loading: action.payload,
      };
    }

    case 'SITE_NOTIFICATIONS__ADD_ITEMS': {
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload.data.reduce((accumulator, currentValue) => {
            const id = currentValue.id || uniqueId((new Date()).getTime());
            return { ...accumulator, [id]: { ...currentValue, id } };
          }, {}),
        },
        metadata: {
          ...state.metadata,
          ...action.payload.metadata,
        },
      };
    }

    case 'SITE_NOTIFICATIONS__DELETE_ITEMS': {
      const list = { ...state.list };
      delete list[action.payload.id];

      return {
        ...state,
        list,
      };
    }

    default: {
      return state;
    }
  }
};

export default siteNotifications;
