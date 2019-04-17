import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination/index';
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
            order={`${props.metadata.page - 1 !== 0 ? props.metadata.page : ''}${index + 1}`}
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
        {props.metadata &&
          <Pagination
            totalAmount={props.metadata.totalAmount}
            perPage={+props.metadata.perPage}
            page={+props.metadata.page}
            onChange={props.onChangePage}
          />
        }
      </div>
    </div>
  );
};

UserListAirdrop.propTypes = {
  users: PropTypes.PropTypes.arrayOf(PropTypes.any).isRequired,
  metadata: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    totalAmount: PropTypes.number,
  }).isRequired,
  onChangePage: PropTypes.func.isRequired,
};

UserListAirdrop.defaultTypes = {
  title: 'Followers',
};

export default UserListAirdrop;
