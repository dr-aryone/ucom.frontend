import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import UserIcon from '../Icons/User';
import OrganizationIcon from '../Icons/Organization';
import styles from './styles.css';

const UserPick = (props) => {
  const LinkTag = props.url ? Link : 'div';
  const BlankIcon = props.organization ? OrganizationIcon : UserIcon;

  return (
    <LinkTag
      style={{
        width: props.size ? `${props.size}px` : undefined,
        height: props.size ? `${props.size}px` : undefined,
      }}
      className={classNames({
        [styles.userPick]: true,
        [styles.owner]: props.isOwner,
        [styles.stretch]: props.stretch,
        [styles.organization]: props.organization,
        [styles.shadow]: props.shadow,
      })}
      title={props.alt}
      to={props.url}
    >
      {props.src ? (
        <img src={props.src} alt={props.alt} />
      ) : (
        <BlankIcon />
      )}
    </LinkTag>
  );
};

UserPick.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  isOwner: PropTypes.bool,
  stretch: PropTypes.bool,
  organization: PropTypes.bool,
  shadow: PropTypes.bool,
  size: PropTypes.number,
};

UserPick.defaultProps = {
  url: null,
  alt: null,
  src: null,
  isOwner: false,
  stretch: false,
  organization: false,
  shadow: false,
  size: null,
};

export default UserPick;
