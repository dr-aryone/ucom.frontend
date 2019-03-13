import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';
import { extractHostname } from '../../utils/url';
import styles from '../Sidebar/styles.css';

const UserNetworks = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user || !user.personalWebsiteUrl) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>Contacts</div>
      <div className={styles.content}>
        <a className="red" href={user.personalWebsiteUrl} target="_blank" rel="noopener noreferrer">
          {extractHostname(user.personalWebsiteUrl)}
        </a>
      </div>
    </div>
  );
};

UserNetworks.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserNetworks);
