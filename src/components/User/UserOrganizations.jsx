import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import { getUserById } from '../../store/users';
import styles from '../Section/styles.css';
import EntryList from '../EntryList';
import urls from '../../utils/urls';

const UserOrganizations = (props) => {
  const user = getUserById(props.users, props.userId);

  if (!user || !user.organizations || !user.organizations.length) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>Communities {user.organizations.length}</div>
      <div className={styles.content}>
        <EntryList
          title="Communities"
          data={user.organizations.map(item => ({
            id: item.id,
            organization: true,
            title: item.title,
            avatarSrc: urls.getFileUrl(item.avatarFilename),
            url: urls.getOrganizationUrl(item.id),
            nickname: item.nickname,
            currentRate: item.currentRate,
          }))}
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
