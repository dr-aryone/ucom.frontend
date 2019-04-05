import PropTypes from 'prop-types';
import React, { memo, Fragment, useState } from 'react';
import styles from './styles.css';
import Button from '../Button/index';
import IconArrowLeft from '../Icons/ArrowLeft';
import IconInputError from '../Icons/InputError';
import UserPick from '../UserPick/UserPick';

const Account = (props) => {
  const [socialKey, setSocialKey] = useState('');

  return (
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
                src={props.userAvatarSrc}
              />
            </div>
            <div className={styles.name}>Hello, {props.userName}!</div>
            <div className={styles.accountName}>@{props.userAccountName}</div>
          </div>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit(socialKey);
            }}
          >
            <h2 className={styles.title}>Enter Your Social Key to Authorize</h2>
            <div className={styles.field}>
              <input
                type="password"
                className={styles.input}
                placeholder="Private Social Key"
                value={socialKey}
                onChange={(e) => {
                  setSocialKey(e.target.value);
                  props.onChange(e.target.value);
                }}
              />
              {props.error &&
                <div className={styles.error}>
                  <IconInputError />
                  <span className={styles.text}>{props.error}</span>
                </div>
              }
            </div>
            <div className={styles.action}>
              <Button
                red
                big
                cap
                strech
                disabled={props.loading || props.error}
              >
                Enter
              </Button>
            </div>
          </form>
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
};

Account.propTypes = {
  userAvatarSrc: PropTypes.string,
  userName: PropTypes.string.isRequired,
  userAccountName: PropTypes.string.isRequired,
  onClickBack: PropTypes.func.isRequired,
  onClickNewKeys: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

Account.defaultProps = {
  error: '',
  loading: false,
  userAvatarSrc: undefined,
  onChange: undefined,
};

export default memo(Account);
