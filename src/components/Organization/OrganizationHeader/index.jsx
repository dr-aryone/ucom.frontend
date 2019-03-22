import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Followers from '../../Followers/Followers';
import OrganizationFollowButton from '../OrganizationFollowButton';
import { selectUser } from '../../../store/selectors';
import { getOrganizationById } from '../../../store/organizations';
import { userIsAdmin } from '../../../utils/organization';
import urls from '../../../utils/urls';
import styles from '../../EntryHeader/styles.css';
import ButtonEdit from '../../ButtonEdit';
import Avatar from '../../EntryHeader/Avatar';
import { formatRate } from '../../../utils/rate';
import Menu from '../../EntryHeader/Menu';

const OrganizationHeader = (props) => {
  const organization = getOrganizationById(props.organizations, props.organizationId);

  if (!organization) {
    return null;
  }

  return (
    <div className={styles.entryHead}>
      {userIsAdmin(props.user, organization) &&
        <div className={styles.edit}>
          <ButtonEdit strech url={urls.getOrganizationEditUrl(organization.id)} />
        </div>
      }

      <Menu />

      <div className={styles.main}>
        <div className={styles.avatar}>
          <Avatar
            organization
            src={urls.getFileUrl(organization.avatarFilename)}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.accountName}>/{organization.nickname}</div>
          <div className={styles.userName}>{organization.title}</div>
        </div>

        <div className={styles.rate}>{formatRate(organization.currentRate)}°</div>
      </div>

      <div className={styles.side}>
        <div className={styles.followButton}>
          <OrganizationFollowButton organizationId={+organization.id} />
        </div>

        <div className={styles.usersLists}>
          <div>
            <Followers title="Members" usersIds={(organization.followedBy || []).map(item => item.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

OrganizationHeader.propTypes = {
  organizations: PropTypes.objectOf(PropTypes.object).isRequired,
  organizationId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default connect(state => ({
  user: selectUser(state),
  organizations: state.organizations,
}))(OrganizationHeader);
