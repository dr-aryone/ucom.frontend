import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import UserCard from '../../../UserCard/UserCard';
import urls from '../../../../utils/urls';
import { getPostById } from '../../../../store/posts';
import styles from './styles.css';
import { POST_TYPE_MEDIA_ID } from '../../../../utils/posts';

const PostFeedHeader = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.info}>
          <Link to={urls.getFeedPostUrl(post)}>{props.createdAt}</Link>
        </div>
      </div>

      {props.userId && POST_TYPE_MEDIA_ID !== props.postTypeId ? (
        <div className={styles.user}>
          <UserCard userId={props.userId} />
        </div>
      ) : null}
    </Fragment>
  );
};

PostFeedHeader.propTypes = {
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  createdAt: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number,
  postTypeId: PropTypes.number,
};

PostFeedHeader.defaultProps = {
  userId: null,
  postTypeId: null,
};

export default connect(state => ({
  posts: state.posts,
}))(PostFeedHeader);
