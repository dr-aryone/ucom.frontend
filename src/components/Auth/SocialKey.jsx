import PropTypes from 'prop-types';
import React, { memo, Fragment } from 'react';
import styles from './styles.css';
import Button from '../Button/index';
import IconArrowLeft from '../Icons/ArrowLeft';
import IconInputError from '../Icons/InputError';
import UserPick from '../UserPick/UserPick';

const Account = props => (
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
        <span className={styles.navText}>Change Account</span>
      </span>
    </div>

    <div className={styles.content}>
      <div className={styles.main}>
        <div className={styles.user}>
          <div className={styles.userPick}>
            <UserPick
              shadow
              size={44}
            />
          </div>
          <div className={styles.name}>Hello, Molly Peniefild!</div>
          <div className={styles.accountName}>@accountname</div>
        </div>
        <div className={styles.form}>
          <h2 className={styles.title}>Enter Your Social Key to Authorize</h2>
          <div className={styles.field}>
            <input
              type="text"
              className={styles.input}
              placeholder="Private Social Key"
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
            >
              Enter
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span
          className="link red"
          role="presentation"
          onClick={props.onClickNewKeys}
        >
          I have a problem with my key
        </span>
      </div>
    </div>
  </Fragment>
);

Account.propTypes = {
  onClickBack: PropTypes.func.isRequired,
  onClickNewKeys: PropTypes.func.isRequired,
};

export default memo(Account);
