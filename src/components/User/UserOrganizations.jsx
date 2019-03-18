import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';
import OrganizationList from '../Organization/OrganizationList';
import styles from '../Section/styles.css';

const UserOrganizations = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user || !user.organizations || !user.organizations.length) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>Communities {user.organizations.length}</div>
      <div className={styles.content}>
        <OrganizationList
          limit={3}
          organizationsIds={user.organizations.map(item => item.id)}
        />
      </div>
    </div>
  );
};

UserOrganizations.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserOrganizations);
