import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styles from './styles.css';
import Popup from '../Popup';
import IconClose from '../Icons/Close';
import IconArrowLeft from '../Icons/ArrowLeft';
import Button from '../Button/index';

const Auth = props => (
  <Popup
    onClickClose={props.onClickClose}
  >
    <div className={styles.auth}>
      <div
        role="presentation"
        className={styles.close}
        onClick={props.onClickClose}
      >
        <span className={styles.icon}>
          <IconClose />
        </span>
      </div>

      <div className={styles.navigation}>
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
            <h2 className={styles.title}>What’s Your U°OS Account Name?</h2>
            <div className={styles.field}>
              <input
                type="text"
                className={styles.input}
                placeholder="@account_name"
              />
            </div>
            <div className={styles.action}>
              <Button
                red
                big
                cap
                strech
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          Don’t have an account?&nbsp;
          <a href="#" className={styles.navText}>Create one</a>
        </div>
      </div>
    </div>
  </Popup>
);

Auth.propTypes = {
  onClickClose: PropTypes.func,
};

Auth.defaultProps = {
  onClickClose: undefined,
};

export default memo(Auth);
