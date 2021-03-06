import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router';
import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { initNotificationsListeners, siteNotificationsSetUnreadAmount } from '../actions/siteNotifications';
import { fetchMyself } from '../actions/users';
import Page from './Page';
import Auth from './Auth';
import Notifications from './Notifications';
import socket from '../api/socket';
import config from '../../package.json';
import { enableGtm } from '../utils/gtm';
import { initDragAndDropListeners } from '../utils/dragAndDrop';
import routes from '../routes';
import Settings from '../components/Settings';
import BuyRam from '../components/Resources/Actions/BuyRam';
import SellRam from '../components/Resources/Actions/SellRam';
import EditStake from '../components/Resources/Actions/EditStake';
import SendTokens from '../components/Resources/Actions/SendTokens';
import { addNotification } from '../actions/notifications';
import { NOTIFICATION_TYPE_ERROR } from '../store/notifications';

const App = (props) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      enableGtm();
    }

    props.fetchMyself();
    props.initNotificationsListeners();

    const removeInitDragAndDropListeners = initDragAndDropListeners(document, () => {
      document.body.classList.add('dragenter');
    }, () => {
      document.body.classList.remove('dragenter');
    });

    if (config.socketEnabled) {
      socket.connect();
    }

    if (config.maintenanceMode) {
      props.addNotification({
        type: NOTIFICATION_TYPE_ERROR,
        title: 'Warning',
        message: 'The platform is on maintenance and in a read-only mode. Please avoid posting content, it will not be published.',
        autoClose: false,
      });
    }

    return removeInitDragAndDropListeners;
  }, []);

  return (
    <Fragment>
      <Page>
        <Switch>
          {routes.map(r => (
            <Route
              exact={typeof r.exact === 'undefined' ? true : r.exact}
              key={r.path}
              path={r.path}
              component={r.component}
            />
          ))}
        </Switch>

        <Auth />
        {/* <UserMenu /> */}
      </Page>

      {props.settings.visible && <Settings />}
      {props.wallet.buyRamVisible && <BuyRam />}
      {props.wallet.sellRamVisible && <SellRam />}
      {props.wallet.editStakeVisible && <EditStake />}
      {props.wallet.sendTokensVisibility && <SendTokens />}
      <Notifications />
    </Fragment>
  );
};

App.propTypes = {
  fetchMyself: PropTypes.func.isRequired,
  initNotificationsListeners: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    buyRamVisible: PropTypes.bool.isRequired,
    sellRamVisible: PropTypes.bool.isRequired,
    editStakeVisible: PropTypes.bool.isRequired,
    sendTokensVisibility: PropTypes.bool.isRequired,
  }).isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default withRouter(connect(
  state => ({
    auth: state.auth,
    wallet: state.walletSimple,
    settings: state.settings,
  }),
  {
    fetchMyself,
    initNotificationsListeners,
    siteNotificationsSetUnreadAmount,
    addNotification,
  },
)(App));
