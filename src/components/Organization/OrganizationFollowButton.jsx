import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Button from '../Button';
import { selectUser } from '../../store/selectors/user';
import { followOrganization, unfollowOrganization } from '../../actions/organizations';
import { getUserById } from '../../store/users';
import { authShowPopup } from '../../actions/auth';
import { restoreActiveKey } from '../../utils/keys';

const OrganizationFollowButton = (props) => {
  if (!props.organizationId) {
    return null;
  }

  const owner = getUserById(props.users, props.user.id);
  const organization = getUserById(props.organizations, props.organizationId);

  if (!organization) {
    return null;
  }

  const userIsFollow = props.user.id ? (organization.followedBy || []).some(item => owner && +item.id === +owner.id) : false;

  return (
    <Button
      isStretched
      size="medium"
      theme="transparent"
      withCheckedIcon={userIsFollow}
      text={userIsFollow ? 'Joined' : 'Join'}
      onClick={() => {
        const activeKey = restoreActiveKey();
        if (!owner || !activeKey) {
          props.authShowPopup();
          return;
        }
        (userIsFollow ? props.unfollowOrganization : props.followOrganization)({ organization, owner, activeKey });
      }}
    />
  );
};

OrganizationFollowButton.propTypes = {
  unfollowOrganization: PropTypes.func.isRequired,
  followOrganization: PropTypes.func.isRequired,
  authShowPopup: PropTypes.func.isRequired,
  organizationId: PropTypes.number.isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  organizations: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default connect(
  state => ({
    users: state.users,
    organizations: state.organizations,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    followOrganization,
    unfollowOrganization,
    authShowPopup,
  }, dispatch),
)(OrganizationFollowButton);
