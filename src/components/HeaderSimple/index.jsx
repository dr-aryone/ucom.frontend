import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import styles from './styles.css';
import Logo from '../Logo/Logo';
import urls from '../../utils/urls';
import IconWallet from '../Icons/Wallet';
import IconBell from '../Icons/Bell';
import { formatRate } from '../../utils/rate';
import UserPick from '../UserPick/UserPick';
import { getUserName } from '../../utils/user';
import DropdownMenu from '../DropdownMenu';

const Header = ({ location, owner }) => (
  <div className={styles.header}>
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
    </div>

    <div className={styles.section}>
      {owner.id ? (
        <Fragment>
          <div className={styles.item}>
            <DropdownMenu
              trigger="mouseenter"
              position="bottom right"
              items={[{
                title: 'Test',
                onClick: () => console.log('test'),
              }]}
            >
              <div className={styles.user}>
                <span className={styles.rate}>{formatRate(owner.currentRate, true)}</span>
                <UserPick
                  shadow
                  scaleOnHover
                  size={32}
                  src={urls.getFileUrl(owner.avatarFilename)}
                  alt={getUserName(owner)}
                  url={urls.getUserUrl(owner.id)}
                />
              </div>
            </DropdownMenu>
          </div>

          <span className={styles.icon}>
            <IconBell />
          </span>

          <span className={styles.icon}>
            <IconWallet />
          </span>
        </Fragment>
      ) : (
        <Fragment>
          123
        </Fragment>
      )}
    </div>
  </div>
);

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
    avatarFilename: PropTypes.string,
    currentRate: PropTypes.number,
  }).isRequired,
};

export default withRouter(connect(state => ({
  owner: state.user.data,
}))(Header));
