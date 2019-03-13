import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import Avatar from '../Avatar';
import Board from '../Board';
import Rate from '../Rate';
import Followers from '../Followers/Followers';
import OrganizationFollowButton from './OrganizationFollowButton';
import { selectUser } from '../../store/selectors';
import { getOrganizationById } from '../../store/organizations';
import { getOrganizationEditUrl } from '../../utils/organization';
import urls from '../../utils/urls';

const OrganizationHeader = (props) => {
  const organization = getOrganizationById(props.organizations, props.organizationId);

  if (!organization || !organization.usersTeam || !organization.user) {
    return null;
  }

  const users = organization.usersTeam
    .filter(item => item.usersTeamStatus === 1)
    .concat([organization.user]);

  return (
    <div className="organization-header">
      <div className="organization-header__top">
        <div className="organization-header__aside">
          <Avatar size="medium" src={urls.getFileUrl(organization.avatarFilename)} square rounded />
        </div>

        <div className="organization-header__aside-b">
          <div className="organization-header__main">
            <div className="organization-header__title">
              {organization.title} {organization.userId === props.user.id && (
                <Link to={getOrganizationEditUrl(organization.id)}>
                  <span className="edit" />
                </Link>
              )}
            </div>

            {organization.nickname && (
              <div className="organization-header__nickname">@{organization.nickname}</div>
            )}

            {organization.poweredBy && (
              <div className="organization-header__poweredby">Powered by {organization.poweredBy}</div>
            )}

            {organization.usersTeam && (
              <div className="organization-header__board">
                <Board users={users} title="Board" />
              </div>
            )}
          </div>

          <div className="organization-header__bside">
            {organization.position && (
              <div className="organization-header__position">#{organization.position}</div>
            )}
            <div className="organization-header__rate">
              <Rate value={+organization.currentRate} className="rate_big" />
            </div>
          </div>
        </div>
      </div>
      <div className="organization-header__bottom">
        <div className="toolbar toolbar_responsive">
          <div className="toolbar__main">
            <div className="organization-header__follow-btn">
              <OrganizationFollowButton organizationId={+organization.id} />
            </div>
          </div>
          <div className="toolbar__side">
            <Followers usersIds={(organization.followedBy || []).map(item => item.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

OrganizationHeader.propTypes = {
  organizations: PropTypes.objectOf(PropTypes.object),
  organizationId: PropTypes.number,
};

export default connect(state => ({
  user: selectUser(state),
  organizations: state.organizations,
}))(OrganizationHeader);
