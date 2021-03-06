import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { formatRate } from '../../utils/rate';
import UserPick from '../UserPick/UserPick';
import { getUserName } from '../../utils/user';
import DropdownMenu, {
  DROPDOWN_MENU_ITEM_TYPE_TITLE,
  DROPDOWN_MENU_ITEM_TYPE_ENTRY,
  DROPDOWN_MENU_ITEM_TYPE_LOGOUT,
} from '../DropdownMenu';
import urls from '../../utils/urls';
import styles from './styles.css';
import { settingsShow } from '../../actions/settings';
import { logout } from '../../utils/auth';

const ORGANIZATIONS_ITEMS_LIMIT = 3;

const User = ({ user, dispatch, onClickOrganizationsViewAll }) => {
  const organizations = user.organizations || [];
  const menuItems = [{
    title: 'Publications',
    type: DROPDOWN_MENU_ITEM_TYPE_TITLE,
  }, {
    title: 'New Publication',
    url: urls.getNewPostUrl(),
  }, {
    title: 'My communities',
    type: DROPDOWN_MENU_ITEM_TYPE_TITLE,
  }]
    .concat(organizations.slice(0, ORGANIZATIONS_ITEMS_LIMIT).map(item => ({
      title: item.title,
      type: DROPDOWN_MENU_ITEM_TYPE_ENTRY,
      url: urls.getOrganizationUrl(item.id),
      avatar: (
        <UserPick
          shadow
          organization
          size={24}
          src={urls.getFileUrl(item.avatarFilename)}
          alt={item.title}
        />
      ),
    })))
    .concat(organizations.length > ORGANIZATIONS_ITEMS_LIMIT && onClickOrganizationsViewAll ? [{
      title: 'View All',
      onClick: onClickOrganizationsViewAll,
    }] : [])
    .concat([{
      title: 'Create Community',
      url: urls.getOrganizationCrerateUrl(),
    }, {
      title: 'Your Account',
      type: DROPDOWN_MENU_ITEM_TYPE_TITLE,
    }, {
      title: 'Settings',
      onClick: () => dispatch(settingsShow()),
    }, {
      title: 'Log Out',
      type: DROPDOWN_MENU_ITEM_TYPE_LOGOUT,
      onClick: logout,
    }]);

  return (
    <DropdownMenu
      trigger="mouseenter"
      position="bottom-end"
      items={menuItems}
    >
      <Link className={styles.user} to={urls.getUserUrl(user.id)}>
        <span className={styles.rate}>{formatRate(user.currentRate, true)}</span>
        <UserPick
          shadow
          size={32}
          src={urls.getFileUrl(user.avatarFilename)}
          alt={getUserName(user)}
        />
      </Link>
    </DropdownMenu>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    avatarFilename: PropTypes.string,
    currentRate: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  onClickOrganizationsViewAll: PropTypes.func,
};

User.defaultProps = {
  onClickOrganizationsViewAll: undefined,
};

export default connect(state => ({
  user: state.user.data,
}))(User);
