import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styles from './styles.css';

const Token = props => (
  <div className={styles.token}>
    <div className={styles.value}>{props.value}</div>
    <div className={styles.label}>{props.label}</div>
    {props.action &&
      <div className={styles.action}>
        <span
          role="presentation"
          className="link red"
          onClick={props.action.onClick}
        >
          {props.action.title}
        </span>
      </div>
    }
  </div>
);

Token.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};

Token.defaultProps = {
  action: undefined,
};

export default memo(Token);
