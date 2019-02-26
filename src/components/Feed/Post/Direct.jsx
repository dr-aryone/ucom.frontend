import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import React, { useState } from 'react';
import { getPostById } from '../../../store/posts';
import { selectUser } from '../../../store/selectors/user';
import { updatePost } from '../../../actions/posts';
import { createComment } from '../../../actions/comments';
import { getUserById } from '../../../store/users';
import { escapeQuotes } from '../../../utils/text';
import PostFeedHeader from './PostFeedHeader';
import PostFeedContent from './PostFeedContent';
import PostFeedFooter from './PostFeedFooter';
import FeedFromField from '../Form/Field';
import styles from './Post.css';
import urls from '../../../utils/urls';
import { getUserName } from '../../../utils/user';
import { getPostImage } from '../../../utils/posts';

const Direct = (props) => {
  const [feedFormFieldAcitve, setFeedFormFieldAcitve] = useState(false);
  const post = getPostById(props.posts, props.id);

  if (!post) {
    return null;
  }

  const user = getUserById(props.users, post.userId);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.post} id={`post-${post.id}`}>
      <PostFeedHeader
        userId={user.id}
        createdAt={moment(post.createdAt).fromNow()}
        postId={post.id}
      />

      <PostFeedContent
        postId={props.id}
        userId={props.user.id} // TODO: Rename to ownerId
        postTypeId={post.postTypeId}
        linkText={escapeQuotes(post.description)}
        onClickEdit={() => setFeedFormFieldAcitve(true)}
      />

      <PostFeedFooter
        commentsCount={post.commentsCount}
        post={post}
        postTypeId={post.postTypeId}
        commentsIsVisible={props.commentsIsVisible}
        toggleComments={props.toggleComments}
        sharePopup={props.sharePopup}
        toggleShare={props.toggleShare}
      />

      {feedFormFieldAcitve &&
        <FeedFromField
          message={post.description}
          mainImageFilename={getPostImage(post, 'articleTitle')}
          ownerPickUrl={urls.getUserUrl(user.id)}
          ownerPickAlt={getUserName(user)}
          ownerPickSrc={urls.getFileUrl(user.avatarFilename)}
          onReset={() => setFeedFormFieldAcitve(false)}
          onSubmit={(data) => {
            props.updatePost({
              postId: post.id,
              data: {
                description: data.message,
                mainImageFilename: data.mainImageFilename,
              },
            });
            setFeedFormFieldAcitve(false);
          }}
        />
      }
    </div>
  );
};

Direct.propTypes = {
  id: PropTypes.number.isRequired,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  commentsIsVisible: PropTypes.bool.isRequired,
  toggleComments: PropTypes.func.isRequired,
  sharePopup: PropTypes.bool.isRequired,
  toggleShare: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
};

Direct.defaultProps = {
  user: null,
};

export default connect(
  state => ({
    posts: state.posts,
    users: state.users,
    comments: state.comments,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    createComment,
    updatePost,
  }, dispatch),
)(Direct);
