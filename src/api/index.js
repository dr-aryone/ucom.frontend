import config from '../../package.json';

const Eos = require('eosjs');

const { ecc } = Eos.modules;

export const login = ({ brainkey, accountName }) => {
  const ownerKey = ecc.seedPrivate(brainkey);
  const activeKey = ecc.seedPrivate(ownerKey);
  const sign = ecc.sign(accountName, activeKey);
  const publicKey = ecc.privateToPublic(activeKey);

  return fetch(`${config.backend.httpEndpoint}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sign,
      account_name: accountName,
      public_key: publicKey,
    }),
  })
    .then(resp => resp.json());
};

export const getMyself = token => (
  fetch(`${config.backend.httpEndpoint}/api/v1/myself`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(resp => resp.json())
);

export const patchMyself = (data, token) => (
  fetch(`${config.backend.httpEndpoint}/api/v1/myself`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(resp => resp.json())
);