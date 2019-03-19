import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles.css';
import { getUserById } from '../../../store/users';
import Avatar from './Avatar';
import urls from '../../../utils/urls';
import { updateUser, addUsers } from '../../../actions/users';
import { getUserName, userIsOwner } from '../../../utils/user';
import UserStatus from '../UserStatus';
import { formatRate } from '../../../utils/rate';
import UserFollowButton from '../UserFollowButton';
import Followers from '../../Followers/Followers';
import ButtonEdit from '../../ButtonEdit';
import IconDots from '../../Icons/Dots';
import tooltipMenuStyles from '../../TooltipMenu/styles.css';
import { copyToClipboard } from '../../../utils/text';

const UserHead = (props) => {
  const user = getUserById(props.users, props.userId);
  const [tooltipVisibility, setTooltipVisibility] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.userHead}>
      {userIsOwner(user, props.owner) &&
        <div className={styles.edit}>
          <ButtonEdit strech url={urls.getUserEditProfileUrl()} />
        </div>
      }

      <div className={styles.menu}>
        <Tooltip
          arrow
          useContext
          interactive
          theme="dropdown"
          position="bottom-center"
          trigger="click"
          open={tooltipVisibility}
          onRequestClose={() => setTooltipVisibility(false)}
          html={(
            <div className={tooltipMenuStyles.tooltipMenu}>
              <div
                role="presentation"
                className={tooltipMenuStyles.item}
                onClick={() => {
                  setTooltipVisibility(false);
                  copyToClipboard(window.location.href);
                }}
              >
                Copy Link
              </div>
            </div>
          )}
        >
          <div
            role="presentation"
            className={styles.menuTrigger}
            onClick={() => setTooltipVisibility(!tooltipVisibility)}
          >
            <IconDots />
          </div>
        </Tooltip>
      </div>

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
