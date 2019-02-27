import { Link } from 'react-router-dom';
import React from 'react';
import Avatar from '../Avatar';
import Rate from '../Rate';
import OrganizationIcon from '../Icons/Organization';

const OrganizationCard = props => (
  <div className="organization-card">
    <div className="organization-card__aside">
      <Link to={props.url}>
        <Avatar
          isPost
          rounded
          BlankIcon={OrganizationIcon}
          src={props.avatarSrc}
        />
      </Link>
    </div>
    <div className="organization-card__main">
      <div className="organization-card__name">
        <Link to={props.url}>{props.title}</Link>
      </div>
      <div className="organization-card__nickname">
        <Link to={props.url}>@{props.nickname}</Link>
      </div>
    </div>
    {typeof props.currentRate !== 'undefined' &&
      <div className="organization-card__bside">
        <Rate value={props.currentRate} />
      </div>
    }
  </div>
);

export default OrganizationCard;
