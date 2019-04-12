import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles.css';
import KeyForm from '../KeyForm';

const ActiveKey = props => (
  <div className={`${styles.content} ${styles.generateKey}`}>
    <div className={styles.main}>
      <KeyForm
        title="Enter Private Active Key"
        placeholder="Active Private Key"
        submitText="Proceed"
        onSubmit={props.onSubmit}
      />
    </div>
    <div className={styles.bottom}>
      <span
        className="link red-hover"
        role="presentation"
        onClick={props.onClickBack}
      >
        I don’t have Active key
      </span>
    </div>
  </div>
);

ActiveKey.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
};

export default ActiveKey;
