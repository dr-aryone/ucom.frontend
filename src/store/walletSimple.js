const getInitialState = () => ({
  buyRamVisible: false,
  sellRamVisible: false,
  editStakeVisible: false,
  sendTokensVisibility: false,
});

const wallet = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'WALLET_RESET':
      return getInitialState();

    case 'WALLET_SET_DATA':
      return {
        ...state,
        ...action.payload,
      };

    case 'WALLET_SET_BUY_RAM_VISIBLE':
      return {
        ...state,
        buyRamVisible: action.payload,
      };

    case 'WALLET_SET_SELL_RAM_VISIBLE':
      return {
        ...state,
        sellRamVisible: action.payload,
      };

    case 'WALLET_SET_EDIT_STAKE_VISIBLE':
      return {
        ...state,
        editStakeVisible: action.payload,
      };

    case 'WALLET_SET_SEND_TOKENS_VISIBLE':
      return {
        ...state,
        sendTokensVisibility: action.payload,
      };

    default:
      return state;
  }
};

export default wallet;
