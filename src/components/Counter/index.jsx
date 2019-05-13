import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';

const Counter = ({ children }) => (
  <span className={styles.counter}>
    {children}
  </span>
);

Counter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Counter;
