import CryptoJS from 'crypto-js';
import ecc from 'eosjs-ecc';
import { memoize } from 'lodash';

export const privateKeyIsValid = memoize((value) => {
  try {
    return ecc.isValidPrivate(value);
  } catch (e) {
    return false;
  }
});

export const passwordIsValid = memoize((password) => {
  try {
    return password.length > 0;
  } catch (e) {
    return false;
  }
});

export const getActivePrivateKey = memoize((brainkey) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);
  return activeKey;
});

export const getSocialPrivateKeyByBrainkey = memoize((brainkey) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);
  const socialKey = ecc.seedPrivate(activeKey);
  return socialKey;
});

export const getSocialPrivateKeyByActiveKey = memoize((activeKey) => {
  const socialKey = ecc.seedPrivate(activeKey);
  return socialKey;
});

export const getSocialPublicKey = memoize((socialKey) => {
  try {
    return privateKeyIsValid(socialKey) ? ecc.privateToPublic(socialKey) : null;
  } catch (e) {
    return null;
  }
});

export const activeKeyIsExists = () => {
  try {
    const activeKey = localStorage.getItem('activeKey');
    return activeKey && activeKey.length;
  } catch (e) {
    return false;
  }
};

export const saveActiveKey = (activeKey, password) => {
  if (!activeKey) {
    throw new Error('Active Key is required');
  }

  if (!privateKeyIsValid(activeKey)) {
    throw new Error('Active Key is not valid');
  }

  if (!password) {
    throw new Error('Password is required');
  }

  if (passwordIsValid(!password)) {
    throw new Error('Password is not valid');
  }

  try {
    const encryptedActiveKey = CryptoJS.AES.encrypt(activeKey, password).toString();
    localStorage.setItem('activeKey', encryptedActiveKey);
  } catch (e) {
    console.error(e);
    throw new Error('Save active key failed');
  }
};

export const restoreEncryptedActiveKey = (password) => {
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

export const saveSocialKey = (socialKey) => {
  if (!socialKey) {
    throw new Error('Active Key is required');
  }

  try {
    localStorage.setItem('socialKey', socialKey);
  } catch (e) {
    console.error(e);
    throw new Error('Save social key failed');
  }
};

export const restoreSocialKey = () => {
  let socialKey;

  try {
    socialKey = localStorage.getItem('socialKey');
    return privateKeyIsValid(socialKey) ? socialKey : null;
  } catch (e) {
    return null;
  }
};
