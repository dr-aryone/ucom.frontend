import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import OrganizationPick from './OrganizationPick';
import urls from '../../utils/urls';
import { getOrganizationUrl } from '../../utils/organization';
import { getOrganizationById } from '../../store/organizations';

const OrganizationCardSimple = (props) => {
  const LinkTag = props.url ? Link : 'div';

  return (
    <div className="user-card-simple">
      <div className="user-card-simple__avatar">
        <OrganizationPick url={props.url} src={props.organizationPickSrc} alt={props.name} />
      </div>
      <div className="user-card-simple__rate-and-name">
        <div className="user-card-simple__name">
          <LinkTag to={props.url}>{props.name}</LinkTag>
        </div>
        <div className="user-card-simple__rate">
          {props.rate}°
        </div>
      </div>
    </div>
  );
};

export const OrganizationCardSimpleWrapper = connect(
  state => ({
    organizations: state.organizations,
  }),
  null,
)((props) => {
  const organization = getOrganizationById(props.organizations, props.organizationId);

  if (!organization) {
    return null;
  }

  return (
    <OrganizationCardSimple
      organizationPickSrc={urls.getFileUrl(organization.avatarFilename)}
      url={getOrganizationUrl(organization.id)}
      name={organization.nickname}
      rate={organization.currentRate}
    />
  );
});

export default OrganizationCardSimple;
