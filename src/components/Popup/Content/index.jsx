import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import styles from './styles.css';
import IconClose from '../../Icons/Close';

const Content = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 100);
  }, []);

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.fullHeight]: props.fullHeight,
      })}
    >
      <div
        className={classNames({
          [styles.content]: true,
          [styles.walletAction]: props.walletAction,
          [styles.roundBorders]: props.roundBorders,
          [styles.fixWidth]: props.fixWidth,
          [styles.active]: active,
        })}
      >
        {props.onClickClose &&
          <div
            role="presentation"
            className={styles.close}
            onClick={props.onClickClose}
          >
            {props.closeText ? (
              <span className={styles.text}>
                {props.closeText}
              </span>
            ) : (
              <span className={styles.icon}>
                <IconClose />
              </span>
            )}
          </div>
        }
        {props.children}
      </div>
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  onClickClose: PropTypes.func,
  walletAction: PropTypes.bool,
  roundBorders: PropTypes.bool,
  fixWidth: PropTypes.bool,
  closeText: PropTypes.string,
  fullHeight: PropTypes.bool,
};

Content.defaultProps = {
  onClickClose: undefined,
  walletAction: false,
  roundBorders: true,
  fixWidth: true,
  closeText: undefined,
  fullHeight: false,
};

export default memo(Content);
