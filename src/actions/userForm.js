import api from '../api';
import snakes from '../utils/snakes';
import { parseErrors } from '../utils/errors';
import loader from '../utils/loader';
import { setUser } from './';

export const userFormReset = () => ({ type: 'USER_FORM__RESET' });
export const userFormSetForm = payload => ({ type: 'USER_FORM__SET_FORM', payload });
export const userFormSetData = payload => ({ type: 'USER_FORM__SET_DATA', payload });

export const userFormHandleSubmit = () => async (dispatch, getState) => {
  const state = getState();

  dispatch(userFormSetData({ loading: true }));
  loader.start();
  try {
    const fixedUsersSources = state.userForm.form.usersSources.filter(e => e.sourceUrl !== '');
    const data = await api.patchMyself(snakes({ ...state.userForm.form, usersSources: fixedUsersSources }));
    dispatch(setUser(data));
    dispatch(userFormSetData({ saved: true, loading: false }));
    dispatch(userFormReset());
  } catch (e) {
    dispatch(userFormSetData({
      serverErrors: parseErrors(e),
      loading: false,
    }));
  }
  loader.done();
};
