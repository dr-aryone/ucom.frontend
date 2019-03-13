import React from 'react';
import PropTypes from 'prop-types';
import normalizeUrl from 'normalize-url';
import SocialIcon from '../Icons/Socials/Social';
import { extractSitename } from '../../utils/url';
import styles from './styles.css';

const Links = props => (
  <ul className={styles.links}>
    {props.userSources.map((item, index) => {
      const hostName = extractSitename(item.sourceUrl);

      return (
        <li key={index} className={styles.item}>
          <SocialIcon sourceUrl={hostName} />
          <a className="red" href={normalizeUrl(item.sourceUrl)} rel="noopener noreferrer" target="_blank">{hostName}</a>
        </li>
      );
    })}
  </ul>
);

Links.propTypes = {
  userSources: PropTypes.arrayOf(PropTypes.object),
};

Links.defaultProps = {
  userSources: [],
};

export default Links;
