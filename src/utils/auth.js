import { removeToken } from './token';
import { removeActiveKey } from './keys';

export const logout = () => {
  removeActiveKey();
  removeToken();
  window.location.reload();
};
