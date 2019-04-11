import api from '../api';
import { selectUser } from '../store/selectors/user';
import { parseWalletErros } from '../utils/errors';
import { addSuccessNotification } from './notifications';
import loader from '../utils/loader';

export const resetWalletState = payload => ({ type: 'RESET_WALLET_STATE', payload });
export const setWalletStateData = payload => ({ type: 'SET_WALLET_STATE_DATA', payload });
export const resetWalletSendTokens = payload => ({ type: 'RESET_WALLET_SEND_TOKENS', payload });
export const setWalletSendTokensData = payload => ({ type: 'SET_WALLET_SEND_TOKENS_DATA', payload });
export const setWalletSendTokensLoading = payload => ({ type: 'SET_WALLET_SEND_TOKENS_LOADING', payload });
export const resetWalletEditStake = payload => ({ type: 'RESET_WALLET_EDIT_STAKE', payload });
export const setWalletEditStakeData = payload => ({ type: 'SET_WALLET_EDIT_STAKE_DATA', payload });
export const setWalletEditStakeLoading = payload => ({ type: 'SET_WALLET_EDIT_STAKE_LOADING', payload });
export const resetWalletTradeRam = payload => ({ type: 'RESET_WALLET_TRADE_RAM', payload });
export const setWalletTradeRamLoading = payload => ({ type: 'SET_WALLET_TRADE_RAM_LOADING', payload });
export const setWalletTradeRamData = payload => ({ type: 'SET_WALLET_TRADE_RAM_DATA', payload });
export const setWalletTradeRamIsBuy = payload => ({ type: 'SET_WALLET_TRADE_RAM_IS_BUY', payload });
export const setWalletTradeRamServerErrors = payload => ({ type: 'SET_WALLET_TRADE_RAM_SERVER_ERRORS', payload });
export const setWalletSendTokensServerErrors = payload => ({ type: 'SET_WALLET_SEND_TOKENS_SERVER_ERRORS', payload });
export const setWalletEditStakeServerErrors = payload => ({ type: 'SET_WALLET_EDIT_STAKE_SERVER_ERRORS', payload });
export const walletTransactionsSetData = payload => ({ type: 'WALLET_TRANSACTIONS_SET_DATA', payload });
export const walletTransactionsReset = payload => ({ type: 'WALLET_TRANSACTIONS_RESET', payload });

export const fetchTransactionsList = (perPage, page) => async (dispatch) => {
  try {
    loader.start();
    const res = await api.getTransactions(perPage, page);
    dispatch(walletTransactionsSetData(res));
    loader.done();
  } catch (e) {
    console.error(e);
    const errors = parseWalletErros(e);
    dispatch(setWalletEditStakeServerErrors(errors));
    loader.done();
  }
};

export const setWalletSendTokensVisible = payload => (dispatch) => {
  dispatch(resetWalletSendTokens());
  dispatch(({ type: 'SET_WALLET_SEND_TOKENS_VISIBLE', payload }));
};

export const setWalletTradeRamVisible = payload => (dispatch) => {
  dispatch(resetWalletTradeRam());
  dispatch(({ type: 'SET_WALLET_TRADE_RAM_VISIBLE', payload }));
};

export const getCurrentNetAndCpuStakedTokens = () => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);

  if (!user.accountName) {
    return;
  }

  try {
    loader.start();
    const data = await api.getCurrentNetAndCpuStakedTokens(user.accountName);
    dispatch(setWalletEditStakeLoading(true));
    dispatch(setWalletEditStakeData({
      netAmount: String(data.net),
      cpuAmount: String(data.cpu),
    }));
    loader.done();
    dispatch(setWalletEditStakeLoading(false));
  } catch (e) {
    console.error(e);
    const errors = parseWalletErros(e);
    dispatch(setWalletEditStakeServerErrors(errors));
    loader.done();
  }
};

export const setWalletEditStakeVisible = payload => async (dispatch) => {
  dispatch(resetWalletEditStake());
  dispatch({ type: 'SET_WALLET_EDIT_STAKE_VISIBLE', payload });

  if (!payload) {
    return;
  }

  dispatch(getCurrentNetAndCpuStakedTokens());
};

export const getAccountState = () => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);

  if (!user.accountName) {
    return;
  }

  try {
    loader.start();
    const data = await api.getAccountState(user.accountName);
    dispatch(setWalletStateData(data));
    loader.done();
  } catch (e) {
    loader.done();
    console.error(e);
  }
};

export const sendTokens = () => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);

  if (!user.accountName) {
    return;
  }

  const accountNameFrom = user.accountName;
  const accountNameTo = state.wallet.sendTokens.data.user.accountName;
  const { amount, memo } = state.wallet.sendTokens.data;

  try {
    loader.start();
    dispatch(setWalletSendTokensLoading(true));
    await api.sendTokens(accountNameFrom, accountNameTo, +amount, memo);
    dispatch(setWalletSendTokensVisible(false));
    dispatch(setWalletSendTokensLoading(false));
    dispatch(addSuccessNotification('Successfully sent tokens'));
    dispatch(walletTransactionsReset());
    dispatch(fetchTransactionsList());
    loader.done();
    dispatch(getAccountState());
  } catch (e) {
    const errors = parseWalletErros(e);
    dispatch(setWalletSendTokensServerErrors(errors));
    dispatch(setWalletSendTokensLoading(false));
    loader.done();
    console.error(e);
  }
};

export const stakeOrUnstakeTokens = () => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);

  if (!user.accountName) {
    return;
  }

  const { netAmount, cpuAmount } = state.wallet.editStake.data;
  const { accountName } = user;

  try {
    loader.start();
    dispatch(setWalletEditStakeLoading(true));
    await api.stakeOrUnstakeTokens(accountName, +netAmount, +cpuAmount);
    dispatch(setWalletEditStakeVisible(false));
    dispatch(setWalletEditStakeLoading(false));
    dispatch(addSuccessNotification('Successfully set stake'));
    dispatch(walletTransactionsReset());
    dispatch(fetchTransactionsList());
    loader.done();
    dispatch(getAccountState());
  } catch (e) {
    const errors = parseWalletErros(e);
    dispatch(setWalletEditStakeServerErrors(errors));
    dispatch(setWalletEditStakeLoading(false));
    loader.done();
    console.error(e);
  }
};

export const claimEmission = () => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);

  if (!user.accountName) {
    return;
  }

  try {
    loader.start();
    await api.claimEmission(user.accountName);
    dispatch(addSuccessNotification('Successfully get emission'));
    dispatch(walletTransactionsReset());
    dispatch(fetchTransactionsList());
    loader.done();
    dispatch(getAccountState());
  } catch (e) {
    console.error(e);
    loader.done();
  }
};

export const getApproximateRamPriceByBytesAmount = payload => async (dispatch) => {
  const { bytesAmount } = payload;

  if (+bytesAmount) {
    try {
      const price = await api.getApproximateRamPriceByBytesAmount(+bytesAmount);
      dispatch(setWalletTradeRamData({ price }));
    } catch (e) {
      console.error(e);
    }
  } else {
    dispatch(setWalletTradeRamData({ price: '' }));
  }
};

export const setWalletTradeRamDataAndGetPrice = payload => (dispatch) => {
  dispatch(getApproximateRamPriceByBytesAmount(payload));
  dispatch(setWalletTradeRamData(payload));
};

export const tradeRam = isBuy => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);

  if (!user.accountName) {
    return;
  }

  const trade = isBuy ? api.buyRam : api.sellRam;

  try {
    loader.start();
    dispatch(setWalletTradeRamLoading(true));
    await trade(user.accountName, +state.wallet.tradeRam.data.bytesAmount);
    dispatch(setWalletTradeRamVisible(false));
    dispatch(setWalletTradeRamLoading(false));
    dispatch(addSuccessNotification('Successfully trade ram'));
    dispatch(walletTransactionsReset());
    dispatch(fetchTransactionsList());
    loader.done();
    dispatch(getAccountState());
  } catch (e) {
    const errors = parseWalletErros(e);
    dispatch(setWalletTradeRamServerErrors(errors));
    dispatch(setWalletTradeRamLoading(false));
    loader.done();
    console.error(e);
  }
};
