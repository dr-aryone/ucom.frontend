import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import UserPick from '../UserPick/UserPick';
import { getUserById } from '../../store/users';
import { getUserName } from '../../utils/user';
import urls from '../../utils/urls';
import styles from './styles.css';
import { formatRate } from '../../utils/rate';

const UserCardLine = (props) => {
  const LinkTag = props.url ? Link : 'div';

  return (
    <LinkTag to={props.url} className={styles.userCard}>
      <div className={styles.avatar}>
        <UserPick isOwner={props.isOwner} url={props.url} src={props.userPickSrc} alt={props.userPickAlt} />
      </div>
      <div className={styles.nameBlock}>
        <div className={styles.name}>{props.name}</div>
        {props.accountName && (
          <div className={styles.accountName}>
            {props.sign}{props.accountName}
          </div>
        )}
      </div>
      <div className={styles.rate}>
        {formatRate(props.rate)}°
      </div>
    </LinkTag>
  );
};

UserCardLine.propTypes = {
  userPickSrc: PropTypes.string,
  userPickAlt: PropTypes.string,
  name: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  url: PropTypes.string,
  isOwner: PropTypes.bool,
  sign: PropTypes.string,
};

UserCardLine.defaultProps = {
  userPickSrc: null,
  userPickAlt: null,
  url: PropTypes.null,
  isOwner: false,
  sign: '@',
};

// export default connect(
//   (state, props) => () => {
//     const user = getUserById(state.users, props.userId);

//     return ({
//       ...props,
//       userPickSrc: user ? urls.getFileUrl(user.avatarFilename) : null,
//       userPickAlt: getUserName(user),
//       url: user ? urls.getUserUrl(user.id) : null,
//       name: getUserName(user),
//       rate: user ? user.currentRate : null,
//     });
//   },
//   null,
// )(UserCardLine);

export default UserCardLine;
