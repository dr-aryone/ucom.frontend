import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import styles from '../Section/styles.css';

const EntryCreatedAt = (props) => {
  if (!props.date) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <strong>Created</strong> {moment(props.date).format('D MMM YYYY')}
      </div>
    </div>
  );
};

EntryCreatedAt.propTypes = {
  date: PropTypes.string,
};

EntryCreatedAt.defaultProps = {
  date: null,
};

export default EntryCreatedAt;
