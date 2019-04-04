import React from 'react';
import PropTypes from 'prop-types';
import { getUserName } from '../../utils/user';
import urls from '../../utils/urls';
import { UserCardLine, UserCardLineTitle } from '../UserCardLine/Github';

const UserListAirdrop = (props) => {
  if (!props.users) {
    return null;
  }

  return (
    <div className="entry-list_airdrop">
      <div className="entry-list__title">GitHub Score</div>

      <div className="entry-list__list">
        <UserCardLineTitle />
        {props.users && (props.users).map((item, index) => (
          <UserCardLine
            order={index + 1}
            key={item.id}
            url={urls.getUserUrl(item.id)}
            userPickSrc={urls.getFileUrl(item.avatarFilename)}
            name={getUserName(item)}
            accountName={item.accountName}
            nameGh={item.externalLogin}
            rate={item.score}
            sign="@"
          />
        ))}
      </div>
    </div>
  );
};

UserListAirdrop.propTypes = {
  users: PropTypes.PropTypes.arrayOf(PropTypes.any).isRequired,
};

UserListAirdrop.defaultTypes = {
  title: 'Followers',
};

export default UserListAirdrop;
