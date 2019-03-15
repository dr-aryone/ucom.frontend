import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import Avatar from '../../Avatar';


const PostHeader = (props) => {
  const LinkTag = props.userUrl ? Link : 'div';

  return (
    <div className={styles.header}>
      <div className="post-head__inner">
        <div className="post-head__user">
          <LinkTag to={props.userUrl}>
            <Avatar
              square
              src={props.userImageUrl}
              size="xmsmall"
            />
          </LinkTag>
          <LinkTag to={props.userUrl}><div className={styles.name}>{props.userName}</div></LinkTag>
        </div>
        <div className="post-head__follow">
          {/* <UserFollowButton userId={props.postAuthor.id} /> */}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
