import { Link } from 'react-router-dom';
import React from 'react';
import CommunityIcon from '../../components/Icons/Community';

const OrganizationPick = props => (
  <Link className="user-pick user-pick_rounded" title={props.alt} to={props.url}>
    {props.src ? (
      <img src={props.src} alt={props.alt} />
    ) : (
      <CommunityIcon />
    )}
  </Link>
);


export default OrganizationPick;
