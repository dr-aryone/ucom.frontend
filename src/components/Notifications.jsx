import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import React from 'react';
import Notification from './Notifications/Notification';

const Notifications = props => (
  <div className="notifications">
    <TransitionGroup className="notifications__list">
      {props.notifications.list.filter(item => !item.closed).map(item => (
        <CSSTransition
          key={item.id}
          timeout={500}
          classNames="fade"
        >
          <div className="notifications__item" key={item.id}>
            <Notification
              id={item.id}
              type={item.type}
              title={item.title}
              message={item.message}
            />
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </div>
);

Notifications.propTypes = {
  notifications: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default connect(state => ({
  notifications: state.notifications,
}))(Notifications);
