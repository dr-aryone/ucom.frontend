import api from '../api';

export const walletToggleBuyRam = visible => ({
  type: 'WALLET_SET_BUY_RAM_VISIBLE',
  payload: visible,
});

export const walletToggleSellRam = visible => ({
  type: 'WALLET_SET_SELL_RAM_VISIBLE',
  payload: visible,
});

export const walletToggleEditStake = visible => ({
  type: 'WALLET_SET_EDIT_STAKE_VISIBLE',
  payload: visible,
});

export const walletToggleSendTokens = visible => ({
  type: 'WALLET_SET_SEND_TOKENS_VISIBLE',
  payload: visible,
});

export const walletGetAccount = accountName => async (dispatch) => {
  try {
    const data = await api.getAccountState(accountName);
    data.tokens.uosFutures = await api.getAccountBalance(accountName, 'UOSF');
    dispatch({
      type: 'WALLET_SET_DATA',
      payload: data,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const walletBuyRam = (
  accountName,
  amount,
  privateKey,
) => async (dispatch) => {
  try {
    const data = await api.buyRam(accountName, amount, privateKey);
    dispatch(walletGetAccount(accountName));
    return data;
  } catch (e) {
    console.error(e);
    throw (e);
  }
};

export const walletSellRam = (
  accountName,
  amount,
  privateKey,
) => async (dispatch) => {
  try {
    const data = await api.sellRam(accountName, amount, privateKey);
    dispatch(walletGetAccount(accountName));
    return data;
  } catch (e) {
    console.error(e);
    throw (e);
  }
};

export const walletEditStake = (
  accountName,
  netAmount,
  cpuAmount,
  privateKey,
) => async (dispatch) => {
  try {
    const data = await api.stakeOrUnstakeTokens(accountName, netAmount, cpuAmount, privateKey);
    dispatch(walletGetAccount(accountName));
    return data;
  } catch (e) {
    console.error(e);
    throw (e);
  }
};

export const walletSendTokens = (
  accountNameFrom,
  accountNameTo,
  amount,
  memo,
  privateKey,
) => async (dispatch) => {
  try {
    const data = await api.sendTokens(accountNameFrom, accountNameTo, amount, memo, privateKey);
    dispatch(walletGetAccount(accountNameFrom));
    return data;
  } catch (e) {
    console.error(e);
    throw (e);
  }
};

export const walletGetEmission = (
  accountName,
  privateKey,
) => async (dispatch) => {
  try {
    const data = await api.claimEmission(accountName, privateKey);
    dispatch(walletGetAccount(accountName));
    return data;
  } catch (e) {
    console.error(e);
    throw (e);
  }
};
