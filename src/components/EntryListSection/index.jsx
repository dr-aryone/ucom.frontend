import PropTypes from 'prop-types';
import React from 'react';
import styles from '../Section/styles.css';
import EntryList, { entryItemProps } from '../EntryList';

const EntryListSection = (props) => {
  if (!props.data.length) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>{props.title} {props.count}</div>
      <div className={styles.content}>
        <EntryList title={props.title} data={props.data} />
      </div>
    </div>
  );
};

EntryListSection.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(entryItemProps)),
  count: PropTypes.number,
};

EntryListSection.defaultProps = {
  data: [],
  count: null,
};

export default EntryListSection;
