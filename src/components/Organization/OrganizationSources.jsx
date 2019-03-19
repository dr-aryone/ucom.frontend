import PropTypes from 'prop-types';
import React from 'react';
import styles from '../Section/styles.css';
import EntryList from '../EntryList';

const OrganizationSources = (props) => {
  if (!props.sources.length) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>{props.title} {props.sources.length}</div>
      <div className={styles.content}>
        <EntryList data={props.sources} title={props.title} />
      </div>
    </div>
  );
};

OrganizationSources.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    entityName: PropTypes.string,
    avatarFilename: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    nickname: PropTypes.string,
    sourceType: PropTypes.string,
  })),
  title: PropTypes.string.isRequired,
};

OrganizationSources.defaultProps = {
  sources: [],
};

export default OrganizationSources;
