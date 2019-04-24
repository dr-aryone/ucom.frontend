const getInitialState = () => ({
  data: {},
  loading: true,
});

const auth = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    case 'REMOVE_USER':
      return {
        ...state,
        data: {},
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default auth;
