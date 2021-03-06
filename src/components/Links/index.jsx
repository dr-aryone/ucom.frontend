import React from 'react';
import PropTypes from 'prop-types';
import normalizeUrl from 'normalize-url';
import SocialIcon from '../Icons/Socials/Social';
import { extractSitename, validURL } from '../../utils/url';
import styles from './styles.css';

const Links = props => (
  <ul className={styles.links}>
    {props.urls.filter(validURL).map((item, index) => {
      const hostName = extractSitename(item);

      return (
        <li key={index} className={styles.item}>
          <SocialIcon sourceUrl={hostName} />
          <a className="red-hover" href={normalizeUrl(item)} rel="noopener noreferrer" target="_blank">{hostName}</a>
        </li>
      );
    })}
  </ul>
);

Links.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string),
};

Links.defaultProps = {
  urls: [],
};

export default Links;
