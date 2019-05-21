import api from '../api';
import snakes from '../utils/snakes';
import { parseErrors } from '../utils/errors';
import { saveToken } from '../utils/token';
import { saveActiveKey, getActivePrivateKey } from '../utils/keys';
import loader from '../utils/loader';

export const authReset = () => ({ type: 'AUTH_RESET' });
export const authSetData = payload => ({ type: 'AUTH_SET_DATA', payload });
export const authSetForm = payload => ({ type: 'AUTH_SET_FORM', payload });
export const authSetVisibility = visibility => dispatch => dispatch(authSetData({ visibility }));

export const authShowPopup = () => (dispatch) => {
  dispatch(authReset());
  dispatch(authSetVisibility(true));
};

export const authHidePopup = () => (dispatch) => {
  dispatch(authSetVisibility(false));
};

export const authLogin = () => async (dispatch, getState) => {
  const state = getState();

  dispatch(authSetData({ loading: true }));
  loader.start();

  setTimeout(async () => {
    try {
      const data = await api.login(snakes(state.auth.form));
      saveToken(data.token);
      saveActiveKey(getActivePrivateKey(state.auth.form.brainkey));
      window.location.reload();
    } catch (e) {
      loader.done();
      dispatch(authSetData({
        serverErrors: parseErrors(e),
        loading: false,
      }));
    }
  }, 0);
};
