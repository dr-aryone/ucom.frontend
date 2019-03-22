import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Stats = props => (
  <div className={styles.followers}>
    <div className={styles.info}>
      <div className={styles.count}>
        {props.amount}
      </div>

      <div className={styles.title}>
        {props.title}
      </div>
    </div>
  </div>
);

Stats.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Stats;
