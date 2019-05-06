import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import IconBell from '../Icons/BellOutlined';
import IconClose from '../Icons/Close';
import {
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_SUCCESS,
} from '../../store/notifications';

const Notification = (props) => {
  useEffect(() => {
    setTimeout(props.onClose, 5000);
  }, []);

  return (
    <div
      className={classNames(
        'notification',
        { 'notification_error': props.typeId === NOTIFICATION_TYPE_ERROR },
        { 'notification_success': props.typeId === NOTIFICATION_TYPE_SUCCESS },
      )}
    >
      <div
        role="presentation"
        className="notification__close"
        onClick={props.onClose}
      >
        <IconClose />
      </div>
      <div className="notification__header">
        <div className="inline inline_medium">
          <div className="inline__item">
            <div className="notification__icon">
              <IconBell />
            </div>
          </div>
          <div className="inline__item">
            <div className="notification__title">{props.title}</div>
          </div>
        </div>
      </div>
      <div className="notification__content">{props.message}</div>
    </div>
  );
};

Notification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  typeId: PropTypes.number.isRequired,
};

Notification.defaultProps = {
  title: 'Error',
};

export default Notification;
