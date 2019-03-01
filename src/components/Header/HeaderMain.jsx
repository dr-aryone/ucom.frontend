import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { selectUser } from '../../store/selectors';
import urls from '../../utils/urls';

const HeaderMain = ({ location }) => (
  <div className="header__main">
    <nav className="menu menu_responsive menu_header">

      <div className="menu__item only-desktop">
        <Link to={urls.getNewPostUrl()} className="menu__link-button">
          <strong>Add publication</strong>
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
          to="/communities"
          className="menu__link menu__link_upper"
          activeClassName="menu__link_active"
          isActive={() => location.pathname === '/communities'}
        >
          Communities
        </NavLink>
      </div>

      <div className="menu__item only-desktop">
        <NavLink
          to={urls.getOverviewCategoryUrl()}
          className="menu__link menu__link_upper"
          activeClassName="menu__link_active"
          isActive={() => location.pathname.indexOf(urls.getPublicationsUrl()) === 0}
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
    </nav>
  </div>
);

export default withRouter(connect(state => ({
  menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  user: selectUser(state),
}))(HeaderMain));
