import React from 'react';
import PropTypes from 'prop-types';
import IconLink from '../Link';
import TwitterIcon from './Twitter';
import FacebookIcon from './Facebook';
import RedditIcon from './Reddit';
import MediumIcon from './Medium';
import TelegramIcon from './Telegram';
import GithubIcon from './Github';

const socialIcons = [
  [/(facebook|fb)/, <FacebookIcon />],
  [/twitter/, <TwitterIcon />],
  [/reddit/, <RedditIcon />],
  [/medium/, <MediumIcon />],
  [/telegram/, <TelegramIcon />],
  [/github/, <GithubIcon />],
];

const SocialIcon = (props) => {
  const foundIcon = socialIcons.find(item => item[0].test(props.sourceUrl));

  if (foundIcon) {
    return foundIcon[1];
  }

  return <IconLink />;
};

SocialIcon.propTypes = {
  sourceUrl: PropTypes.string,
};

export default SocialIcon;
