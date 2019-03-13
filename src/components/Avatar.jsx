import { withRouter } from 'react-router';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserIcon from './Icons/User';
import PostIcon from './Icons/Post';

const Avatar = (props) => {
  let { BlankIcon } = props;

  if (!BlankIcon) {
    BlankIcon = props.isPost ? PostIcon : UserIcon;
  }

  return (
    <span
      className={classNames(
        'avatar',
        { 'avatar_rounded': props.rounded },
        { 'avatar_square': props.square },
        { [`avatar_${props.size}`]: Boolean(props.size) },
        { 'avatar_border_white': props.borderWhite },
        { 'avatar_blank': !props.src },
        { 'avatar_auto-szie': props.autoSize },
      )}
    >
      {props.src && <img className="avatar__img" src={props.src} alt={props.alt} /> }
      {props.srcComponent && <Fragment>{props.srcComponent}</Fragment>}
      {!props.srcComponent && !props.src && <BlankIcon />}
      {props.showBadge && (
        <span
          role="presentation"
          className="avatar__badge"
          title={props.badgeTitle}
          onClick={(e) => {
            e.preventDefault();

            if (props.badgeLink) {
              props.history.push(props.badgeLink);
            }
          }}
        >
          {props.badgeUrl ? (
            <img src={props.badgeUrl} alt={props.badgeTitle} />
          ) : (
            <UserIcon />
          )}
        </span>
      )}
      {props.icon && (
        <div
          className="avatar__icon"
          title={props.iconTitle}
        >
          {props.icon}
        </div>
      )}
    </span>
  );
};

Avatar.propTypes = {
  square: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  borderWhite: PropTypes.bool,
  isPost: PropTypes.bool,
  autoSize: PropTypes.bool,
};

Avatar.defaultProps = {
  square: false,
  rounded: false,
  isPost: false,
};

export default withRouter(Avatar);
