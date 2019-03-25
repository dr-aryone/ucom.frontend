import { Link } from 'react-router-dom';
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
import subHeaderStyles from '../../EntrySubHeader/styles.css';
import ButtonEdit from '../../ButtonEdit';
import Avatar from '../../EntryHeader/Avatar';
import { formatRate } from '../../../utils/rate';
import Menu from '../../EntryHeader/Menu';
import { getUserName } from '../../../utils/user';
import UserFollowButton from '../../User/UserFollowButton';
import UserPick from '../../UserPick/UserPick';

const OrganizationHeader = (props) => {
  const organization = getOrganizationById(props.organizations, props.organizationId);

  if (!organization) {
    return null;
  }

  return (
    <div className={subHeaderStyles.wrapper}>
      {organization.user &&
        <div className={subHeaderStyles.subHeader}>
          <div className={subHeaderStyles.userCard}>
            <div className={subHeaderStyles.userPick}>
              <UserPick
                shadow
                stretch
                url={urls.getUserUrl(organization.user.id)}
                alt={getUserName(organization.user)}
                src={urls.getFileUrl(organization.user.avatarFilename)}
              />
            </div>
            <div className={subHeaderStyles.info}>
              <div className={subHeaderStyles.name}>
                <Link className="red" to={urls.getUserUrl(organization.user.id)}>
                  {getUserName(organization.user)}
                </Link>
              </div>
              <div className={subHeaderStyles.rate}>
                {formatRate(organization.user.currentRate)}°
              </div>
            </div>
          </div>

          {!userIsAdmin(props.user, organization) &&
            <div className={subHeaderStyles.followLink}>
              <UserFollowButton asLink userId={organization.user.id} />
            </div>
          }
        </div>
      }

      <div className={`${styles.entryHead} ${styles.organization}`}>
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
