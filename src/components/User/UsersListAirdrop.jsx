import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { selectUser } from '../../store/selectors/user';
import { getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import urls from '../../utils/urls';
import { UserCardLine, UserCardLineTitle } from '../UserCardLine/Github';
import { getManyUsers } from '../../actions/users';

const UserListAirdrop = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    props.getManyUsers({
      airdrops: { id: 1 },
      orderBy: 'score',
      page: 1,
      perPage: 10,
    }).then((data) => {
      setUsers(data.data);
    });
  }, []);

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
  getManyUsers: PropTypes.func,
};

UserListAirdrop.defaultTypes = {
  title: 'Followers',
};

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    getManyUsers,
  }, dispatch),
)(UserListAirdrop);
