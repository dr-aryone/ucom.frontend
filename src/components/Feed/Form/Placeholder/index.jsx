import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import UserPick from '../../../UserPick/UserPick';

const Placeholder = props => (
  <div
    role="presentation"
    className={styles.placeholder}
    onClick={props.onClick}
  >
    <span className={styles.placeholderItem}>
      Hey
    </span>
    <span className={styles.placeholderItem}>
      <UserPick
        size="big"
        alt={props.ownerPickAlt}
        src={props.ownerPickSrc}
      />
    </span>
    <span className={styles.placeholderItem}>
      what’s new?
    </span>
  </div>
);

Placeholder.propTypes = {
  ownerPickAlt: PropTypes.string,
  ownerPickSrc: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Placeholder.defaultProps = {
  ownerPickAlt: null,
  ownerPickSrc: null,
};

export default Placeholder;
