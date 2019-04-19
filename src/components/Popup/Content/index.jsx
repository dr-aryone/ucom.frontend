import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import styles from './styles.css';
import IconClose from '../../Icons/Close';

const Content = props => (
  <div
    className={classNames({
      [styles.content]: true,
      [styles.walletAction]: props.walletAction,
      [styles.roundBorders]: props.roundBorders,
      [styles.fixWidth]: props.fixWidth,
    })}
  >
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
  walletAction: PropTypes.bool,
  roundBorders: PropTypes.bool,
  fixWidth: PropTypes.bool,
};

Content.defaultProps = {
  onClickClose: undefined,
  walletAction: false,
  roundBorders: true,
  fixWidth: true,
};

export default memo(Content);
