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
