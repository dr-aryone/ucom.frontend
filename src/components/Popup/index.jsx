import { KEY_ESCAPE } from 'keycode-js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect, useRef, memo } from 'react';
import CloseIcon from '../Icons/Close';
import styles from './styles.css';

let openedPopupsCount = 0;
const openedPopupsProps = [];

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.which === KEY_ESCAPE && openedPopupsProps.length && openedPopupsProps[openedPopupsProps.length - 1].onClickClose) {
      openedPopupsProps[openedPopupsProps.length - 1].onClickClose();
    }
  });
}

const Popup = (props) => {
  const el = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    openedPopupsCount++;
    openedPopupsProps.push(props);

    return () => {
      openedPopupsProps.splice(-1, 1);

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
