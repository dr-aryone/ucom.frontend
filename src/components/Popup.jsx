import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import CloseIcon from './Icons/Close';

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
      ref={el}
      role="presentation"
      className={classNames(
        'popup',
        { [`popup_${props.mod}`]: Boolean(props.mod) },
      )}
      onClick={(e) => {
        if (e.target === el.current && props.onClickClose) {
          props.onClickClose();
        }
      }}
    >
      {props.onClickClose && props.showCloseIcon &&
        <span
          role="presentation"
          className="popup__close"
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
  onClickClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  mod: PropTypes.string,
  showCloseIcon: PropTypes.bool,
};

Popup.defaultProps = {
  onClickClose: null,
  mod: null,
  showCloseIcon: false,
};

export default Popup;
