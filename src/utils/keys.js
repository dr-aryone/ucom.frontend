import CryptoJS from 'crypto-js';
import ecc from 'eosjs-ecc';
import { memoize } from 'lodash';

export const getActivePrivateKey = memoize((brainkey) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);

  return activeKey;
});

export const getSocialPrivateKey = memoize((brainkey) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);
  const socialKey = ecc.seedPrivate(activeKey);

  return socialKey;
});

export const privateKeyIsValid = (value) => {
  try {
    return value.length > 0;
  } catch (e) {
    return false;
  }
};

export const passwordIsValid = (password) => {
  try {
    return password.length > 0;
  } catch (e) {
    return false;
  }
};

export const activeKeyIsExists = () => {
  try {
    return localStorage.getItem('activeKey').length;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const saveActiveKey = (activeKey, password) => {
  if (!activeKey) {
    throw new Error('Active Key is required');
  }

  if (!password) {
    throw new Error('Password is required');
  }

  try {
    const encryptedActiveKey = CryptoJS.AES.encrypt(activeKey, password).toString();
    localStorage.setItem('activeKey', encryptedActiveKey);
  } catch (e) {
    console.error(e);
    throw new Error('Save active key failed');
  }
};

export const restoreActiveKey = (password) => {
  if (!password) {
    throw new Error('Password is required');
  }

  const passwordDoesNotMatchError = new Error('Password does not match');
  let encryptedActiveKey;
  let activeKey;

  try {
    encryptedActiveKey = localStorage.getItem('activeKey');
  } catch (e) {
    console.error(e);
    throw new Error('Restore active key failed');
  }

  if (!encryptedActiveKey) {
    throw new Error('Active key not found');
  }

  try {
    activeKey = CryptoJS.AES.decrypt(encryptedActiveKey, `${password}`).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    throw passwordDoesNotMatchError;
  }

  if (!activeKey) {
    throw passwordDoesNotMatchError;
  }

  return activeKey;
};

export const removeActiveKey = () => {
  try {
    localStorage.removeItem('activeKey');
  } catch (e) {
    console.error(e);
    throw new Error('Remove active key failed');
  }
};
