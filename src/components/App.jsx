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
import NewAuth from './Auth/index';
import Notifications from './Notifications';
import socket from '../api/socket';
import config from '../../package.json';
import { enableGtm } from '../utils/gtm';
import routes from '../routes';

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

        {/* TODO: Remove old app, then new feature complete */}
        {typeof window !== 'undefined' && window.newAuth === true ? <NewAuth /> : <Auth />}
        <UserMenu />
      </Page>

      <Notifications />
    </Fragment>
  );
};

App.propTypes = {
  fetchMyself: PropTypes.func.isRequired,
  initNotificationsListeners: PropTypes.func.isRequired,
};

export default withRouter(connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => bindActionCreators({
    fetchMyself,
    initNotificationsListeners,
    siteNotificationsSetUnreadAmount,
  }, dispatch),
)(App));
