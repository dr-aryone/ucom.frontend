import PropTypes from 'prop-types';
import React from 'react';
import styles from '../../styles.css';
import PasswordForm from '../../Forms/PasswordForm';

const Password = props => (
  <div className={`${styles.content} ${styles.password}`}>
    <div className={styles.main}>
      <PasswordForm
        onSubmit={props.onSubmit}
      />
    </div>
  </div>
);

Password.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Password;
