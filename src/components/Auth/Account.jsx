import PropTypes from 'prop-types';
import React, { memo, Fragment } from 'react';
import styles from './styles.css';
import Button from '../Button/index';
import IconInputError from '../Icons/InputError';

const Account = props => (
  <Fragment>
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
      <div className={styles.bottom}>
        Don’t have an account?&nbsp;
        <a href="#" className={`red ${styles.navText}`}>Create one</a>
      </div>
    </div>
  </Fragment>
);

Account.propTypes = {
  onClickProceed: PropTypes.func.isRequired,
};

export default memo(Account);
