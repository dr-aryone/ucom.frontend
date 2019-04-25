import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styles from './styles.css';

const Resource = props => (
  <div className={styles.resource}>
    <div className={styles.info}>
      <div className={styles.value}>{props.value}</div>
      <div className={styles.total}>{props.total}</div>
    </div>
    <div className={styles.progress}>
      <span
        className={styles.indicator}
        style={{
          width: `${props.progress}%`,
        }}
      />
    </div>
    <div className={styles.title}>{props.title}</div>
    <div className={styles.actions}>
      {props.actions.map((action, index) => (
        <span
          key={index}
          role="presentation"
          className="link red"
          onClick={action.onClick}
        >
          {action.title}
        </span>
      ))}
    </div>
  </div>
);

Resource.propTypes = {
  value: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  progress: PropTypes.number,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })),
};

Resource.defaultProps = {
  progress: 0,
  actions: [],
};

export default memo(Resource);
