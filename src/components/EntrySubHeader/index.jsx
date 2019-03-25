import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles.css';
import UserPick from '../UserPick/UserPick';
import UserFollowButton from '../User/UserFollowButton';
import { formatRate } from '../../utils/rate';

const EntrySubHeader = props => (
  <div className={styles.subHeader}>
    <div className={styles.userCard}>
      <div className={styles.userPick}>
        <UserPick
          shadow
          stretch
          url={props.userUrl}
          alt={props.userName}
          src={props.userAvatarUrl}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          <Link className="red" to={props.userUrl}>{props.userName}</Link>
        </div>
        <div className={styles.rate}>
          {formatRate(props.userRate)}°
        </div>
      </div>
    </div>

    {props.showFollow &&
      <div className={styles.followLink}>
        <UserFollowButton asLink userId={props.userId} />
      </div>
    }
  </div>
);

EntrySubHeader.propTypes = {
  userUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  userRate: PropTypes.number,
  showFollow: PropTypes.bool,
};

EntrySubHeader.defaultProps = {
  userRate: 0,
  showFollow: false,
};

export default EntrySubHeader;
