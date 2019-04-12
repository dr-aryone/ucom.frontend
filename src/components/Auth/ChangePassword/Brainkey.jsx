import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles.css';
import BrainkeyForm from '../BrainkeyForm';

const Brainkey = props => (
  <div className={`${styles.content} ${styles.generateKey}`}>
    <div className={styles.main}>
      <BrainkeyForm
        title="Generate Private Active Key with Brainkey"
        onSubmit={props.onSubmit}
      />
    </div>
    <div className={styles.bottom}>
      <span
        className="link red-hover"
        role="presentation"
        onClick={props.onClickActiveKey}
      >
        I have Active Private key
      </span>
    </div>
  </div>
);

Brainkey.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickActiveKey: PropTypes.func.isRequired,
};

export default Brainkey;
