import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styles from '../../EntryHeader/styles.css';
import { getUserById } from '../../../store/users';
import Avatar from '../../EntryHeader/Avatar';
import urls from '../../../utils/urls';
import { updateUser, addUsers } from '../../../actions/users';
import { getUserName, userIsOwner } from '../../../utils/user';
import UserStatus from '../UserStatus';
import { formatRate } from '../../../utils/rate';
import UserFollowButton from '../UserFollowButton';
import Followers from '../../Followers/Followers';
import ButtonEdit from '../../ButtonEdit';
import Menu from '../../EntryHeader/Menu';

const UserHead = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.entryHead}>
      {userIsOwner(user, props.owner) &&
        <div className={styles.edit}>
          <ButtonEdit strech url={urls.getUserEditProfileUrl()} />
        </div>
      }

      <Menu />

      <div className={styles.main}>
        <div className={styles.avatar}>
          <Avatar
            src={urls.getFileUrl(user.avatarFilename)}
            changeEnabled={userIsOwner(user, props.owner)}
            onChange={async (file) => {
              props.dispatch(addUsers([{
                id: +props.owner.id,
                avatarFilename: file.preview,
              }]));

              props.dispatch(updateUser({
                avatarFilename: file,
              }));
            }}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.accountName}>@{user.accountName}</div>
          <div className={styles.userName}>{getUserName(user)}</div>
          <div className={styles.status}>
            <UserStatus userId={user.id} />
          </div>
        </div>

        <div className={styles.rate}>{formatRate(user.currentRate)}°</div>
      </div>

      <div className={styles.side}>
        {!userIsOwner(user, props.owner) &&
          <div className={styles.followButton}>
            <UserFollowButton userId={+user.id} />
          </div>
        }

        <div className={styles.usersLists}>
          <div>
            <Followers title="Trusted by" usersIds={user.followedBy} />
          </div>
          <div>
            <Followers title="Followers" usersIds={user.followedBy} />
          </div>
          <div>
            <Followers title="Following" usersIds={user.iFollow} />
          </div>
        </div>
      </div>
    </div>
  );
};

UserHead.propTypes = {
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  users: state.users,
  owner: state.user.data,
}))(UserHead);
