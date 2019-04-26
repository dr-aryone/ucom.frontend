import classNames from 'classnames';
import { throttle } from 'lodash';
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import styles from './styles.css';
import Logo from '../Logo/Logo';
import urls from '../../utils/urls';
import IconWallet from '../Icons/Wallet';
import IconBell from '../Icons/Bell';
import User from './User';
import { authShowPopup } from '../../actions/auth';
import EntryListPopup from '../EntryListPopup';
import IconSearch from '../Icons/Search';
import Popup, { Content } from '../Popup';
import Wallet from '../Wallet';
import IconClose from '../Icons/Close';
import SiteNotificationsTooltip from '../SiteNotificationsTooltip';
import Counter from '../Counter';
import Search from '../Search';

const Header = ({ location, owner, dispatch }) => {
  const [walletPopupVisible, setWalletPopupVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [organizationsPopupVisible, setOrganizationsPopupVisible] = useState(false);

  const checkScroll = throttle(() => {
    setIsScroll(window.top.scrollY > 0);
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <Fragment>
      <div
        className={classNames({
          [styles.header]: true,
          [styles.isScroll]: isScroll,
        })}
      >
        <div className={styles.section}>
          <div className={styles.item}>
            <Link to={urls.getMainPageUrl()}>
              <Logo />
            </Link>
          </div>

          <div className={styles.item}>
            <NavLink
              to={urls.getUsersUrl()}
              isActive={() => location.pathname === urls.getUsersUrl()}
              className={styles.link}
              activeClassName={styles.active}
            >
              People
            </NavLink>
          </div>

          <div className={styles.item}>
            <NavLink
              to={urls.getOverviewCategoryUrl()}
              isActive={() => location.pathname.indexOf(urls.getOverviewCategoryUrl()) === 0}
              className={styles.link}
              activeClassName={styles.active}
            >
              Overview
            </NavLink>
          </div>

          <div className={styles.item}>
            <NavLink
              to={urls.getGovernanceUrl()}
              isActive={() => location.pathname.indexOf(urls.getGovernanceUrl()) === 0}
              className={styles.link}
              activeClassName={styles.active}
            >
              Governance
            </NavLink>
          </div>

          <div
            role="presentation"
            className={styles.icon}
            onClick={() => setSearchVisible(true)}
          >
            <IconSearch />
          </div>
        </div>

        <div className={styles.section}>
          {owner.id ? (
            <Fragment>
              <div className={styles.item}>
                <User onClickOrganizationsViewAll={() => setOrganizationsPopupVisible(true)} />
              </div>

              <SiteNotificationsTooltip>
                {({ toggleTooltip, unreadNotifications, tooltipVisibilty }) => (
                  <span
                    role="presentation"
                    className={classNames({
                      [styles.icon]: true,
                      [styles.active]: tooltipVisibilty,
                    })}
                    onClick={toggleTooltip}
                  >
                    <IconBell />
                    {unreadNotifications > 0 &&
                      <div className={styles.counter}>
                        <Counter>{unreadNotifications}</Counter>
                      </div>
                    }
                  </span>
                )}
              </SiteNotificationsTooltip>

              <span
                role="presentation"
                className={classNames({
                  [styles.icon]: true,
                  [styles.wallet]: true,
                  [styles.active]: walletPopupVisible,
                })}
                onClick={() => setWalletPopupVisible(!walletPopupVisible)}
              >
                {walletPopupVisible ? <IconClose /> : <IconWallet />}
              </span>
            </Fragment>
          ) : (
            <span
              role="presentation"
              className={styles.link}
              onClick={() => dispatch(authShowPopup())}
            >
              Sign IN
            </span>
          )}
        </div>
      </div>

      {organizationsPopupVisible &&
        <EntryListPopup
          title="My communities"
          data={owner.organizations.map(item => ({
            id: item.id,
            follow: false,
            organization: true,
            avatarSrc: urls.getFileUrl(item.avatarFilename),
            url: urls.getOrganizationUrl(item.id),
            title: item.title,
            nickname: item.nickname,
            currentRate: item.currentRate,
          }))}
          onClickClose={() => setOrganizationsPopupVisible(false)}
        />
      }

      {walletPopupVisible &&
        <Popup
          transparent
          mod="wallet"
          onClickClose={() => setWalletPopupVisible(false)}
        >
          <Content
            screen
            fullHeight
            fullWidth
            roundBorders={false}
          >
            <Wallet />
          </Content>
        </Popup>
      }

      {searchVisible &&
        <Search onClickClose={() => setSearchVisible(false)} />
      }
    </Fragment>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(state => ({
  owner: state.user.data,
}))(Header));
