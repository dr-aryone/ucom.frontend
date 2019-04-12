// import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles.css';
import IconInputError from '../../Icons/InputError';
import Button from '../../Button/index';

const ActiveKey = () => (
  <div className={`${styles.content} ${styles.password}`}>
    <div className={styles.main}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 className={styles.title}>Set a Password to Use your Active Keys Automatically</h2>
        <div className={styles.formContent}>
          <div className={styles.text}>
            Set the Password to save encrypted Active Keys in your browser. This allows you to send the transactions that require Active Keys, using this password.
          </div>
          <div className={styles.field}>
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Repeat Password"
            />
            <div className={styles.error}>
              <IconInputError />
              <span className={styles.text}>Passwords do not match</span>
            </div>
          </div>
        </div>
        <div className={styles.action}>
          <Button
            red
            big
            cap
            strech
          >
            Set Password
          </Button>
        </div>
      </form>
    </div>
  </div>
);

ActiveKey.propTypes = {

};

export default ActiveKey;
