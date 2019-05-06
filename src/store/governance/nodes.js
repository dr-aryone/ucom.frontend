const getInitialState = () => ({
  data: {},
  votePopupVisibile: false,
  votePopupErrors: [],
  loading: false,
});

const governanceNodes = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'GOVERNANCE_NODES_RESET':
      return getInitialState();

    case 'GOVERNANCE_NODES_SET_DATA':
      return {
        ...state,
        data: action.payload,
      };

    case 'GOVERNANCE_NODES_SET_POPUP_VISIBILE':
      return {
        ...state,
        votePopupVisibile: action.payload,
      };

    case 'GOVERNANCE_NODES_SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'GOVERNANCE_NODES_SET_VOTE_POPUP_ERROR':
      return {
        ...state,
        votePopupErrors: action.payload,
      };

    case 'GOVERNANCE_NODES_SET_VOTE':
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.nodeType]: [...state.data[action.payload.nodeType].map((item) => {
            if (+item.id === +action.payload.id) {
              item.isVoted = action.payload.vote;
            }
            return item;
          })],

        },
      };

    default:
      return state;
  }
};

export default governanceNodes;
