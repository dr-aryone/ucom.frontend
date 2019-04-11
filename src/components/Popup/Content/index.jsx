import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styles from './styles.css';
import IconClose from '../../Icons/Close';

const Content = props => (
  <div className={styles.content}>
    {props.onClickClose &&
      <div
        role="presentation"
        className={styles.close}
        onClick={props.onClickClose}
      >
        <span className={styles.icon}>
          <IconClose />
        </span>
      </div>
    }
    {props.children}
  </div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
  onClickClose: PropTypes.func,
};

Content.defaultProps = {
  onClickClose: undefined,
};

export default memo(Content);
