import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Button from '../Button';
import { selectUser } from '../../store/selectors/user';
import { followUser, unfollowUser } from '../../actions/users';
import { getUserById } from '../../store/users';
import { authShowPopup } from '../../actions/auth';

const UserFollowButton = (props) => {
  if (!props.userId) {
    return null;
  }

  const owner = getUserById(props.users, props.user.id);
  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  const userIsFollowing = user.myselfData ? user.myselfData.follow : owner && owner.iFollow && owner.iFollow.length > 0 ? // eslint-disable-line
    owner.iFollow.some(id => id === Number(props.userId)) :
    false;

  const userIsOwner = owner && Number(owner.id) === Number(user.id);
  return (
    <Button
      isStretched
      isDisabled={userIsOwner}
      size="medium"
      theme="transparent"
      withCheckedIcon={userIsFollowing || userIsOwner}
      text={(userIsFollowing || userIsOwner) ? 'Following' : 'Follow'}
      onClick={() => {
        if (!props.user.id) {
          props.authShowPopup();
          return;
        }

        (userIsFollowing ? props.unfollowUser : props.followUser)({ user, owner });
      }}
    />
  );
};

UserFollowButton.propTypes = {
  unfollowUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  authShowPopup: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    followUser,
    unfollowUser,
    authShowPopup,
  }, dispatch),
)(UserFollowButton);
