import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import NotificationTooltip from './NotificationTooltip';
import { showAndFetchNotifications, hideNotificationTooltip, siteNotificationsResetTooltipData } from '../../actions/siteNotifications';

const SiteNotificationsTooltip = (props) => {
  const hideTooltip = () => {
    props.hideNotificationTooltip();
    props.siteNotificationsResetTooltipData();
  };

  const showTooltip = () => {
    props.showAndFetchNotifications();
  };

  const toggleTooltip = () => {
    if (props.tooltipVisibilty) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };

  return (
    <div className="notification-tooltip-trigger">
      {props.tooltipVisibilty &&
        <NotificationTooltip hideTooltip={hideTooltip} />
      }
      {props.children({
        showTooltip,
        hideTooltip,
        toggleTooltip,
        unreadNotifications: props.totalUnreadAmount,
        tooltipVisibilty: props.tooltipVisibilty,
      })}
    </div>
  );
};

SiteNotificationsTooltip.propTypes = {
  hideNotificationTooltip: PropTypes.func.isRequired,
  siteNotificationsResetTooltipData: PropTypes.func.isRequired,
  showAndFetchNotifications: PropTypes.func.isRequired,
  tooltipVisibilty: PropTypes.bool.isRequired,
  totalUnreadAmount: PropTypes.number,
  children: PropTypes.func.isRequired,
};

SiteNotificationsTooltip.defaultProps = {
  totalUnreadAmount: 0,
};

export default connect(
  state => ({
    tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
    totalUnreadAmount: state.siteNotifications.totalUnreadAmount,
    notificationsMetadata: state.siteNotifications.metadata,
  }),
  {
    showAndFetchNotifications,
    hideNotificationTooltip,
    siteNotificationsResetTooltipData,
  },
)(SiteNotificationsTooltip);
