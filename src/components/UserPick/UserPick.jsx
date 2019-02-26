import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import UserIcon from '../Icons/User';
import styles from './styles.css';

const UserPick = (props) => {
  const LinkTag = props.url ? Link : 'div';

  return (
    <LinkTag
      className={classNames([
        styles.userPick,
        { [styles.owner]: props.isOwner },
        { [styles.userPickBig]: props.size === 'big' },
      ])}
      title={props.alt}
      to={props.url}
    >
      {props.src ? (
        <img src={props.src} alt={props.alt} />
      ) : (
        <UserIcon />
      )}
    </LinkTag>
  );
};

UserPick.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  isOwner: PropTypes.bool,
  size: PropTypes.oneOf(['big']),
};

UserPick.defaultProps = {
  url: null,
  alt: null,
  src: null,
  isOwner: false,
  size: null,
};

export default UserPick;
