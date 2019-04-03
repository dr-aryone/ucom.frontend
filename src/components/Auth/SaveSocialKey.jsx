import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styles from './styles.css';
import IconArrowRight from '../Icons/ArrowRight';

const SaveSocialKey = props => (
  <div className={styles.content}>
    <div className={styles.main}>
      <div className={styles.form}>
        <h2 className={`${styles.title} ${styles.saveKey}`}>Save Your Social Key</h2>
        <div className={styles.copy}>
          <span className={styles.key}>5JoEYU5adMz2GvfaacAntwPsZbFEzBMZafpTXJG6EkZf6dsKvjy</span>
          <span className={styles.label}>Copy</span>
        </div>
        <div className={styles.saveKeyText}>
          This is your Social Private Key.<br />
          <strong>You will need it to authorize on a platform</strong> from any device. Keep it safe.
        </div>
        <div className={styles.proceedLink}>
          <span
            role="presentation"
            className={styles.navLink}
            onClick={props.onClickBack}
          >
            <span className={styles.navText}>Proceed to Authorization</span>
            <IconArrowRight />
          </span>
        </div>
      </div>
    </div>
  </div>
);

SaveSocialKey.propTypes = {
  onClickBack: PropTypes.func.isRequired,
};

export default memo(SaveSocialKey);
