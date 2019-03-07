import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import NotificationTooltip from './NotificationTooltip';
import IconBell from '../Icons/Bell';
import { showAndFetchNotifications, hideNotificationTooltip, siteNotificationsResetTooltipData } from '../../actions/siteNotifications';

class NotificationTrigger extends PureComponent {
  hideTooltip = () => {
    this.props.hideNotificationTooltip();

    this.props.siteNotificationsResetTooltipData();
  }

  showTooltip = () => {
    this.props.showAndFetchNotifications();
  }

  triggerTooltip = () => (
    this.props.tooltipVisibilty ? this.hideTooltip() : this.showTooltip()
  );

  render() {
    return (
      <div className="notification-tooltip-trigger">
        {this.props.tooltipVisibilty &&
          <NotificationTooltip hideTooltip={this.hideTooltip} />
        }
        <div
          role="presentation"
          onClick={this.triggerTooltip}
          className="icon-counter"
        >
          <div className="icon-counter__icon">
            <IconBell />
          </div>
          <div className="icon-counter__counter">
            <span className="counter counter_top">{this.props.totalUnreadAmount ? this.props.totalUnreadAmount : ''}</span>
          </div>
        </div>
      </div>
    );
  }
}

NotificationTrigger.propTypes = {
  hideNotificationTooltip: PropTypes.func,
  siteNotificationsResetTooltipData: PropTypes.func,
  showAndFetchNotifications: PropTypes.func,
  tooltipVisibilty: PropTypes.bool,
  totalUnreadAmount: PropTypes.number,
};

export default connect(
  state => ({
    tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
    totalUnreadAmount: state.siteNotifications.totalUnreadAmount,
    notificationsMetadata: state.siteNotifications.metadata,
  }),
  dispatch => bindActionCreators({
    showAndFetchNotifications,
    hideNotificationTooltip,
    siteNotificationsResetTooltipData,
  }, dispatch),
)(NotificationTrigger);
