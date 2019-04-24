const getInitialState = () => ({
  visible: false,
});

export default (state = getInitialState(), action) => {
  switch (action.type) {
    case 'SETTINGS_SHOW':
      return {
        ...state,
        visible: true,
      };

    case 'SETTINGS_HIDE':
      return {
        ...state,
        visible: false,
      };

    default:
      return state;
  }
};
