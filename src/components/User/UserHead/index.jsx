import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import { getUserById } from '../../../store/users';
import IconEdit from '../../Icons/Edit';
import Avatar from './Avatar';
import urls from '../../../utils/urls';
import { updateUser, addUsers } from '../../../actions/users';
import { compressAvatar } from '../../../utils/upload';
import { addErrorNotification } from '../../../actions/notifications';
import { getUserName, userIsOwner } from '../../../utils/user';
import UserStatus from '../UserStatus';
import { formatRate } from '../../../utils/rate';
import UserFollowButton from '../UserFollowButton';
import Followers from '../../Followers/Followers';

const UserHead = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.userHead}>
      {userIsOwner(user, props.owner) &&
        <Link
          tabIndex="-1"
          className={styles.iconEdit}
          to={urls.getUserEditProfileUrl()}
        >
          <IconEdit />
        </Link>
      }

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

              try {
                props.dispatch(updateUser({
                  avatarFilename: await compressAvatar(file),
                }));
              } catch (e) {
                props.dispatch(addErrorNotification(e.message));
              }
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
          {user.followedBy &&
            <div>
              <Followers title="Followers" usersIds={user.followedBy} />
            </div>
          }

          {user.followedBy &&
            <div>
              <Followers title="Following" usersIds={user.iFollow} />
            </div>
          }
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
