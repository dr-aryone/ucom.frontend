import React from 'react';
import PropTypes from 'prop-types';
import normalizeUrl from 'normalize-url';
import SocialIcon from './Icons/Socials/Social';
import { extractHostname } from '../utils/url';

const Links = props => (
  <ul className="links">
    {props.userSources.map((item, index) => {
      const hostName = extractHostname(item.sourceUrl);

      return (
        <li key={index} className="links__item">
          <span className="inline">
            <span className="inline__item">
              <SocialIcon sourceUrl={hostName} />
            </span>
            <span className="inline__item">
              <a href={normalizeUrl(item.sourceUrl)} rel="noopener noreferrer" target="_blank">{hostName}</a>
            </span>
          </span>
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
