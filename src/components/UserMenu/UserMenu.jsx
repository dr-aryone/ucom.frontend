import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { selectUser } from '../../store/selectors';
import { removeUser } from '../../actions';
import { showMenuPopup, hideMenuPopup } from '../../actions/menuPopup';
import { getFileUrl } from '../../utils/upload';
import { getOrganizationUrl } from '../../utils/organization';
import Popup from '../Popup';
import UserCard from '../UserCard';
import LogoutIcon from '../Icons/Logout';
import MenuWallet from '../Wallet/MenuWallet';
import WalletActivity from '../Wallet/WalletActivity';
import { removeBrainkey } from '../../utils/brainkey';
import { removeToken } from '../../utils/token';
import urls from '../../utils/urls';

const UserMenu = (props) => {
  const logout = () => {
    removeToken();
    removeBrainkey();
    props.removeUser();
    window.location.reload();
    props.hideMenuPopup();
  };

  return (
    <Fragment>
      {props.menuPopupVisibility &&
        <Popup mod="user-menu">
          <div className="user-menu">
            <div className="user-menu__content">
              <div className="content">
                <div className="content__inner content__inner_grid">
                  <div className="user-menu__side">
                    <div className="menu menu_vertical">
                      <div className="menu__item else-desktop">
                        <NavLink
                          to={urls.getNewPostUrl()}
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname === '/posts/new/1'}
                        >
                          Add&nbsp;publication
                        </NavLink>
                      </div>

                      <div className="menu__item else-desktop">
                        <NavLink
                          to="/users"
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname === '/users'}
                        >
                          People
                        </NavLink>
                      </div>

                      <div className="menu__item else-desktop">
                        <NavLink
                          to="/communities"
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname === '/communities'}
                        >
                          Communities
                        </NavLink>
                      </div>

                      <div className="menu__item else-desktop">
                        <NavLink
                          to={urls.getOverviewCategoryUrl()}
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname.indexOf('/publications') === 0}
                        >
                          Overview
                        </NavLink>
                      </div>

                      <div className="menu__item else-desktop">
                        <NavLink
                          to={urls.getGovernanceUrl()}
                          className="menu__link menu__link_upper"
                          activeClassName="menu__link_active"
                          isActive={() => props.location.pathname.indexOf(urls.getGovernanceUrl()) === 0}
                        >
                          Governance
                        </NavLink>
                      </div>

                      {props.user.id &&
                        <div className="menu__item">
                          <NavLink
                            to={`/user/${props.user.id}`}
                            className="menu__link menu__link_upper"
                            activeClassName="menu__link_active"
                            isActive={() => props.location.pathname === `/user/${props.user.id}`}
                          >
                            My profile
                          </NavLink>
                        </div>
                      }

                      {props.user.id &&
                        <div className="menu__item">
                          <NavLink
                            to="/profile/"
                            className="menu__link menu__link_upper"
                            activeClassName="menu__link_active"
                            isActive={() => props.location.pathname === '/profile/general-info'}
                          >
                            Settings
                          </NavLink>
                        </div>
                      }

                      {props.user.id &&
                        <div className="menu__item">
                          <span className="menu__link menu__link_upper" role="presentation" onClick={logout}>
                            <span className="inline inline_small">
                              <span className="inline__item"><LogoutIcon /></span>
                              <span className="inline__item">Log out</span>
                            </span>
                          </span>
                        </div>
                      }
                    </div>
                    {props.user.id &&
                      <div className="user-menu__section">
                        <div className="user-menu__title">Communities</div>
                        <div className="user-menu__communities">
                          {props.user.organizations && props.user.organizations.map(item => (
                            <UserCard
                              key={item.id}
                              squareAvatar
                              roundedAvatar
                              size="small"
                              rate={item.currentRate}
                              userName={item.title}
                              accountName={item.nickname}
                              avatarUrl={getFileUrl(item.avatarFilename)}
                              profileLink={getOrganizationUrl(item.id)}
                            />
                          ))}
                          <Link to="/communities/new" className="button-create-new">
                            <span className="button-create-new__icon">+</span>
                            <span className="button-create-new__title">Create new</span>
                          </Link>
                        </div>
                      </div>
                    }
                  </div>
                  <div>
                    {props.user.id && <MenuWallet />}
                    {props.user.id && <WalletActivity />}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </Popup>
      }
    </Fragment>
  );
};

UserMenu.propTypes = {
  menuPopupVisibility: PropTypes.bool,
  removeUser: PropTypes.func,
  hideMenuPopup: PropTypes.func,
};

export default withRouter(connect(
  state => ({
    menuPopupVisibility: state.menuPopup.menuPopupVisibility,
    user: selectUser(state),
    wallet: state.wallet,
  }),
  dispatch => bindActionCreators({
    showMenuPopup,
    hideMenuPopup,
    removeUser,
  }, dispatch),
)(UserMenu));
