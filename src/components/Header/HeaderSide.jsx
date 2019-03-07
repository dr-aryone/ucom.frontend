import React from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectUser } from '../../store/selectors';
import Logo from '../Logo/Logo';
import urls from '../../utils/urls';

const HeaderSide = ({
  location,
}) => (
  <div className="header__side">
    <div className="logo-fixed">
      <Link to="/">
        <span className="only-pad"><Logo /></span>
        <span className="else-pad"><Logo mod="small" /></span>
      </Link>
    </div>
    <div className="menu__item only-desktop">
      <NavLink
        to="/users"
        className="menu__link menu__link_upper"
        activeClassName="menu__link_active"
        isActive={() => location.pathname === '/users'}
      >
        People
      </NavLink>
    </div>

    <div className="menu__item only-desktop">
      <NavLink
        to={urls.getOverviewCategoryUrl()}
        className="menu__link menu__link_upper"
        activeClassName="menu__link_active"
        isActive={() => location.pathname.indexOf(urls.getOverviewCategoryUrl()) === 0}
      >
        Overview
      </NavLink>
    </div>

    <div className="menu__item only-desktop">
      <NavLink
        to="/governance"
        className="menu__link menu__link_upper"
        activeClassName="menu__link_active"
        isActive={() => location.pathname.indexOf('/governance') === 0}
      >
        Governance
      </NavLink>
    </div>
  </div>
);

export default withRouter(connect(state => ({
  user: selectUser(state),
}))(HeaderSide));
