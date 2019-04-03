import PropTypes from 'prop-types';
import React, { memo, Fragment } from 'react';
import styles from './styles.css';
import Button from '../Button/index';
import IconArrowLeft from '../Icons/ArrowLeft';
import IconInputError from '../Icons/InputError';

const NewSocialKey = props => (
  <Fragment>
    <div
      role="presentation"
      className={styles.navigation}
      onClick={props.onClickBack}
    >
      <span className={styles.icon}>
        <IconArrowLeft />
      </span>
      <span className={styles.label}>
        <span className={styles.navText}>Authorization</span>
      </span>
    </div>

    <div className={styles.content}>
      <div className={styles.main}>
        <div className={styles.form}>
          <h2 className={styles.title}>Generate Social Key with Brainkey</h2>
          <div className={styles.field}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter your 12-word Brainkey"
            />
            <div className={styles.error}>
              <IconInputError />
              <span className={styles.text}>Such account does not exist in a blockchain</span>
            </div>
          </div>
          <div className={styles.action}>
            <Button
              red
              big
              cap
              strech
              onClick={props.onClickProceed}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

NewSocialKey.propTypes = {
  onClickBack: PropTypes.func.isRequired,
  onClickProceed: PropTypes.func.isRequired,
};

export default memo(NewSocialKey);
