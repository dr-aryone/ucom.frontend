import config from '../../package.json';

export const airdropId = { id: 1 };

export const getAirdropOfferId = () => {
  let id = config.airdropOfferId.staging;

  if (process.env.NODE_ENV === 'production') {
    id = config.airdropOfferId.production;
  }

  return id;
};

export const getGitHubAuthLink = () => {
  let link = config.gitHubAuthLink.staging;

  if (process.env.NODE_ENV === 'production') {
    link = config.gitHubAuthLink.production;
  }

  return link;
};
