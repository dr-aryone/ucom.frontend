import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Links from '../Links';
import { getUserById } from '../../store/users';
import styles from '../Section/styles.css';

const UserSocialNetworks = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user || !user.usersSources) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>Social Networks</div>
      <div className={styles.content}>
        <Links userSources={user.usersSources} />
      </div>
    </div>
  );
};

UserSocialNetworks.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserSocialNetworks);
