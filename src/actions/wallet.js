// TODO: Refactoring and replace to walletSimple

import api from '../api';
import loader from '../utils/loader';

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
    loader.done();
  }
};
