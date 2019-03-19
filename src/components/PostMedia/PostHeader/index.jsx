import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import Avatar from '../../Avatar';
import { getFileUrl } from '../../../utils/upload';
import { getOrganizationUrl } from '../../../utils/organization';
import OrganizationFollowButton from '../../Organization/OrganizationFollowButton';
import { formatRate } from '../../../utils/rate';

const PostHeader = (props) => {
  // const LinkTag = props.userUrl ? Link : 'div';

  if (!props.org) {
    return null;
  }

  console.log(props.org);

  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <Link to={getOrganizationUrl(props.org.id)} className={styles.userPic}>
          <Avatar
            className={styles.pic}
            square
            src={getFileUrl(props.org.avatarFilename)}
            size="xmsmall"
          />
          <div className={styles.info}>
            <div className={styles.name}>{props.org.title}</div>
            <div className={styles.rate}>{formatRate(props.org.currentRate)}°</div>
          </div>
        </Link>
        <div className={styles.follow}>
          <OrganizationFollowButton
            organizationId={props.org.id}
            // className={styles.follow}
          />
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
