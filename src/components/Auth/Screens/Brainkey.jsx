import PropTypes from 'prop-types';
import React from 'react';
import styles from '../styles.css';
import BrainkeyForm from '../Forms/BrainkeyForm';

const Brainkey = props => (
  <div className={`${styles.content} ${styles.generateKey}`}>
    <div className={styles.main}>
      <BrainkeyForm
        title={props.title}
        description={props.description}
        onSubmit={props.onSubmit}
      />
    </div>
    <div className={styles.bottom}>
      <span
        className="link red-hover"
        role="presentation"
        onClick={props.onClickBack}
      >
        {props.backText}
      </span>
    </div>
  </div>
);

Brainkey.propTypes = {
  title: PropTypes.string.isRequired,
  description: BrainkeyForm.propTypes.description,
  backText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickBack: PropTypes.func.isRequired,
};

Brainkey.defaultProps = {
  description: BrainkeyForm.defaultProps.description,
};

export default Brainkey;
