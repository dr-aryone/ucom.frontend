import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { getUserById } from '../../store/users';
import MinimizedText from '../MinimizedText';
import styles from '../Section/styles.css';

const UserAbout = (props) => {
  const [minimized, setMinimized] = useState(true);
  const user = getUserById(props.users, props.userId);

  if (!user || !user.about) {
    return null;
  }

  return (
    <div className={styles.section}>
      <div className={styles.title}>About</div>

      <div className={styles.content}>
        <MinimizedText
          gray
          disabledHide
          text={user.about}
          enabled={user.about.length > 280}
          minimized={minimized}
          onClickShowMore={() => setMinimized(!minimized)}
        />
      </div>
    </div>
  );
};

UserAbout.propTypes = {
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.number.isRequired,
};

export default connect(state => ({
  users: state.users,
}))(UserAbout);
