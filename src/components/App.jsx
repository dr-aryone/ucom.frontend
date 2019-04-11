import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router';
import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { initNotificationsListeners, siteNotificationsSetUnreadAmount } from '../actions/siteNotifications';
import { fetchMyself } from '../actions/users';
import UserMenu from './UserMenu/UserMenu';
import Page from './Page';
import Auth from './Auth';
import Notifications from './Notifications';
import socket from '../api/socket';
import config from '../../package.json';
import { enableGtm } from '../utils/gtm';
import routes from '../routes';
import Settings from '../components/Settings';
import BuyRam from '../components/Resources/Actions/BuyRam';
import SellRam from '../components/Resources/Actions/SellRam';
import EditStake from '../components/Resources/Actions/EditStake';
import SendTokens from '../components/Resources/Actions/SendTokens';

const App = (props) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      enableGtm();
    }

    props.fetchMyself();
    props.initNotificationsListeners();

    if (config.socketEnabled) {
      socket.connect();
    }
  }, []);

  return (
    <Fragment>
      <Page>
        <Switch>
          {routes.map(r => <Route exact path={r.path} component={r.component} key={r.path} />)}
        </Switch>

        <Auth />
        <UserMenu />
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
};

export default withRouter(connect(
  state => ({
    auth: state.auth,
    wallet: state.walletSimple,
    settings: state.settings,
  }),
  dispatch => bindActionCreators({
    fetchMyself,
    initNotificationsListeners,
    siteNotificationsSetUnreadAmount,
  }, dispatch),
)(App));
