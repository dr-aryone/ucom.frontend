import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { selectUser } from '../../store/selectors/user';
import { getUsersByIds } from '../../store/users';
import { getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import urls from '../../utils/urls';
import { UserCardLine, UserCardLineTitle } from '../UserCardLine/Github';

const UserListAirdrop = (props) => {
  if (!props.usersIds) {
    return null;
  }

  const users = getUsersByIds(props.users, props.usersIds);

  return (
    <div className="entry-list">
      <div className="entry-list__title">GitHub Score</div>

      <div className="entry-list__list">
        <UserCardLineTitle />
        {users.map((item, index) => (
          <UserCardLine
            order={index + 1}
            key={item.id}
            url={urls.getUserUrl(item.id)}
            userPickSrc={getFileUrl(item.avatarFilename)}
            name={getUserName(item)}
            accountName={item.accountName}
            rate={item.currentRate}
            sign="@"
          />
        ))}
      </div>
    </div>
  );
};

UserListAirdrop.propTypes = {
  title: PropTypes.string,
  noSign: PropTypes.bool,
  usersIds: PropTypes.arrayOf(PropTypes.number),
};

UserListAirdrop.defaultTypes = {
  title: 'Followers',
};

export default connect(state => ({
  users: state.users,
  user: selectUser(state),
}))(UserListAirdrop);
