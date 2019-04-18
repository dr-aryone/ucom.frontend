import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from './Popup';
import ModalContent from './ModalContent';
import InfoBlock from './InfoBlock';
import MenuWallet from './Wallet/MenuWallet';
import UserCard from './UserCard';
import Header from './Header/Header';
import LogoutIcon from './Icons/Logout';
import { selectUser } from '../store/selectors';
import { getOrganizationUrl } from '../utils/organization';
import { showMenuPopup, hideMenuPopup } from '../actions/menuPopup';
import { removeToken } from '../utils/token';
import { removeUser } from '../actions';
import urls from '../utils/urls';

import av1 from '../static/avatars/1.png';
import av2 from '../static/avatars/2.png';
import av3 from '../static/avatars/3.png';

const products = [
  {
    profileName: 'Walmart',
    accountName: 'apple_inc',
    avatarUrl: av1,
  },
  {
    profileName: 'Exxon Mobil',
    accountName: 'apple_inc',
    avatarUrl: av2,
  },
  {
    profileName: 'Berkshire Hathaway',
    accountName: 'apple_inc',
    avatarUrl: av3,
  },
];

class MenuPopup extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.hidePopup();
    }
  }

  logout = () => {
    removeToken();
    this.props.removeUser();
    window.location.reload();
    this.hidePopup();
  }

  hidePopup = () => {
    this.props.hideMenuPopup();
  }

  showPopup = () => {
    this.props.showMenuPopup();
  }

  render() {
    return (
      <Fragment>
        {this.props.menuPopupVisibility && (
          <Popup onClickClose={this.hidePopup}>
            <ModalContent onClickClose={this.hidePopup} closeText="Close">
              <div className="menu-popup">
                <Header />

                <div className="menu-popup__container menu-popup__container_main">
                  <div className="menu-popup__side">
                    <div className="menu menu_vertical full-height">
                      {this.props.user.id ?
                        <Fragment>
                          <div className="menu__item">
                            <NavLink
                              className="menu__link"
                              activeClassName="menu__link_active"
                              to={`/user/${this.props.user.id}`}
                              onClick={this.hidePopup}
                            >
                                My profile
                            </NavLink>
                          </div>
                          <div className="menu__item">
                            <NavLink
                              className="menu__link"
                              activeClassName="menu__link_active"
                              to="/profile/"
                              onClick={this.hidePopup}
                            >
                                Settings
                            </NavLink>
                          </div>
                        </Fragment> : null
                      }
                      <div className="menu__item only-pad">
                        <NavLink
                          to={urls.getNewPostUrl()}
                          className="menu__link"
                        >
                          Add&nbsp;publication
                        </NavLink>
                      </div>

                      <div className="menu__item only-pad">
                        <NavLink
                          to="/users"
                          className="menu__link"
                          activeClassName="menu__link_active"
                          isActive={() => this.props.location.pathname === '/users'}
                        >
                          People
                        </NavLink>
                      </div>
                      <div className="menu__item only-pad">
                        <NavLink
                          to="/communities"
                          className="menu__link"
                          activeClassName="menu__link_active"
                          isActive={() => this.props.location.pathname === '/communities'}
                        >
                          Communities
                        </NavLink>
                      </div>
                      <div className="menu__item only-pad">
                        <NavLink
                          to="/publications/media"
                          className="menu__link"
                          activeClassName="menu__link_active"
                          isActive={() => this.props.location.pathname.indexOf('/publications') === 0}
                        >
                          Publications
                        </NavLink>
                      </div>
                      {this.props.user.id &&
                        <div className="menu__item">
                          <div className="inline menu-popup__logout" role="presentation" onClick={this.logout}>
                            <div className="inline__item"><LogoutIcon /></div>
                            <div className="inline__item">Log out</div>
                          </div>
                        </div>
                      }
                      <MenuWallet />
                      {this.props.user.id &&
                        <div className="menu__item menu__item_full-height">
                          <InfoBlock title="Communities" size="small" align="left" fixedChildren fixedTitle>
                            <div className="info-block__scrolled-list">
                              {this.props.user.organizations && this.props.user.organizations.map(item => (
                                <div className="menu-popup__content-item" key={item.id}>
                                  <UserCard
                                    className="user-card_text_left"
                                    userName={item.title}
                                    accountName={item.nickname}
                                    avatarUrl={urls.getFileUrl(item.avatarFilename)}
                                    profileLink={getOrganizationUrl(item.id)}
                                    squareAvatar
                                    roundedAvatar
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="menu-popup__content-item menu-popup__create-new_fixed">
                              <NavLink
                                className="menu-popup__add"
                                to="/communities/new"
                              >
                                <div className="menu-popup__add-icon menu-popup__add-icon_new">+</div>
                                <div className="menu-popup__add-text">Create new organization</div>
                              </NavLink>
                            </div>
                          </InfoBlock>
                        </div>
                      }
                    </div>
                  </div>

                  {this.props.user.id &&
                    <div className="menu-popup__content">
                      {this.props.products && (
                        <div className="menu-popup__content-block">
                          <InfoBlock title="Products" size="small" align="left" line="gray-lighter">
                            {products.map((item, index) => (
                              <div className="menu-popup__content-item" key={index}>
                                <UserCard
                                  className="user-card_text_left"
                                  userName={item.profileName}
                                  accountName={item.accountName}
                                  avatarUrl={item.avatarUrl}
                                  squareAvatar
                                  sign="by @"
                                />
                              </div>
                            ))}
                            <div className="menu-popup__content-item">
                              <NavLink
                                className="menu-popup__add"
                                to="#"
                                onClick={this.hidePopup}
                              >
                                <div className="menu-popup__add-icon menu-popup__add-icon_new">
                                  +
                                </div>
                                <div className="menu-popup__add-text">
                                  Create new product
                                </div>
                              </NavLink>
                            </div>
                          </InfoBlock>
                        </div>
                      )}
                      {this.props.offers && (
                        <div className="menu-popup__content-block">
                          <InfoBlock title="Offers" size="small" align="left" line="gray-lighter">
                            {products.map((item, index) => (
                              <div className="menu-popup__content-item" key={index}>
                                <UserCard
                                  className="user-card_text_left"
                                  userName={item.profileName}
                                  accountName={item.accountName}
                                  avatarUrl={item.avatarUrl}
                                  squareAvatar
                                  sign=""
                                />
                              </div>
                            ))}
                            <div className="menu-popup__content-item">
                              <div className="menu-popup__add">
                                <div className="menu-popup__add-icon">
                                  +25
                                </div>
                                <div className="menu-popup__add-text">
                                  Show more events
                                </div>
                              </div>
                            </div>
                            <div className="menu-popup__content-item">
                              <NavLink
                                className="menu-popup__add"
                                to="#"
                                onClick={this.hidePopup}
                              >
                                <div className="menu-popup__add-icon menu-popup__add-icon_new">
                                  +
                                </div>
                                <div className="menu-popup__add-text">
                                  Create new event
                                </div>
                              </NavLink>
                            </div>
                          </InfoBlock>
                        </div>
                      )}
                    </div>
                  }
                </div>
              </div>
            </ModalContent>
          </Popup>
        )}
      </Fragment>
    );
  }
}

MenuPopup.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  products: PropTypes.arrayOf(PropTypes.object),
  offers: PropTypes.arrayOf(PropTypes.object),
  removeUser: PropTypes.func,
  menuPopupVisibility: PropTypes.bool,
};

export default withRouter(connect(state => ({
  menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  user: selectUser(state),
}), dispatch => bindActionCreators({
  showMenuPopup,
  hideMenuPopup,
  removeUser,
}, dispatch))(MenuPopup));
