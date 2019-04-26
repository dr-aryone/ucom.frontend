import { authShowPopup } from './auth';
import { parseErrors } from '../utils/errors';
import { fetchTransactionsList, walletTransactionsReset } from './wallet';
import {
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_SUCCESS,
} from '../store/notifications';

export const addNotification = payload => ({ type: 'ADD_NOTIFICATION', payload });
export const closeNotification = payload => ({ type: 'CLOSE_NOTIFICATION', payload });

export const addWalletSuccessNotification = payload => (dispatch) => {
  dispatch(walletTransactionsReset());
  dispatch(fetchTransactionsList());
  dispatch(addNotification({
    type: NOTIFICATION_TYPE_SUCCESS,
    title: 'Success',
    message: payload.message,
  }));
};

export const addSuccessNotification = message => (dispatch) => {
  dispatch(addNotification({
    type: NOTIFICATION_TYPE_SUCCESS,
    title: 'Success',
    message,
  }));
};

export const addValidationErrorNotification = () => (dispatch) => {
  dispatch(addNotification({
    type: NOTIFICATION_TYPE_ERROR,
    title: 'Error',
    message: 'Some fields in the form are incorrect',
  }));
};

export const addServerErrorNotification = error => (dispatch) => {
  if ((error && error.response && error.response.status) === 401 || (error && error.status) === 401) {
    dispatch(authShowPopup());
  } else {
    dispatch(addNotification({ type: NOTIFICATION_TYPE_ERROR, message: parseErrors(error).general }));
  }
};

export const addErrorNotification = message => (dispatch) => {
  dispatch(addNotification({ type: NOTIFICATION_TYPE_ERROR, message }));
};
