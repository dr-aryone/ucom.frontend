import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import sectionStyles from '../../Section/styles.css';
import { getUserById } from '../../../store/users';
import ButtonEdit from '../../ButtonEdit';
import urls from '../../../utils/urls';
import styles from './styles.css';
import { userIsOwner } from '../../../utils/user';

const UserEditInformation = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!userIsOwner(user, props.owner)) {
    return null;
  }

  return (
    <div className={sectionStyles.section}>
      <div className={sectionStyles.content}>
        <span className={styles.userEditInformation}>
          <strong>Edit information</strong>
          <ButtonEdit url={urls.getUserEditProfileUrl()} />
        </span>
      </div>
    </div>
  );
};

UserEditInformation.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default connect(state => ({
  users: state.users,
  owner: state.user.data,
}))(UserEditInformation);
