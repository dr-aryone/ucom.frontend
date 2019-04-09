import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect, useRef, memo } from 'react';
import CloseIcon from '../Icons/Close';
import styles from './styles.css';

let openedPopupsCount = 0;

const Popup = (props) => {
  const el = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    openedPopupsCount++;

    return () => {
      if (openedPopupsCount > 0) {
        openedPopupsCount--;
      }

      if (openedPopupsCount === 0) {
        document.body.style.overflow = '';
      }
    };
  }, []);

  return (
    <div
      id={props.id}
      ref={el}
      role="presentation"
      className={classNames({
        [styles.popup]: true,
        [props.mod]: !!props.mod,
      })}
      onClick={(e) => {
        if (e.target === el.current && props.onClickClose) {
          props.onClickClose();
        }
      }}
    >
      {props.onClickClose && props.showCloseIcon &&
        <span
          role="presentation"
          className={styles.close}
          onClick={props.onClickClose}
        >
          <CloseIcon />
        </span>
      }
      {props.children}
    </div>
  );
};

Popup.propTypes = {
  id: PropTypes.string,
  mod: PropTypes.string,
  onClickClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  showCloseIcon: PropTypes.bool,
};

Popup.defaultProps = {
  id: undefined,
  mod: null,
  onClickClose: null,
  showCloseIcon: false,
};

export { default as Content } from './Content';
export default memo(Popup);
