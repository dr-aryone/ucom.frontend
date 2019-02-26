import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconEdit from '../../../Icons/Edit';
import { getFileUrl } from '../../../../utils/upload';
import { getPostById } from '../../../../store/posts';
import { postIsEditable } from '../../../../utils/posts';
import DescDirectPost from './DescDirectPost';
import { checkMentionTag, escapeQuotes } from '../../../../utils/text';
import styles from './styles.css';

const PostFeedContent = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post || !props.postTypeId === 10 || !post.postTypeId === 10) {
    return null;
  }

  return (
    <Fragment>
      {post.mainImageFilename &&
        <div className={styles.cover}>
          <img src={getFileUrl(post.mainImageFilename)} alt="cover" />
        </div>
      }
      {post.description &&
        <div className={styles.content}>
          <DescDirectPost
            desc={checkMentionTag(escapeQuotes(post.description))}
            limit={100}
          />
        </div>
      }
      {post.userId === props.userId && postIsEditable(post.createdAt) && (
        <button
          onClick={props.onClickEdit}
          className="button-icon button-icon_edit button-icon_edit_small"
        >
          <IconEdit />
        </button>
      )}
    </Fragment>
  );
};

PostFeedContent.propTypes = {
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number,
  postTypeId: PropTypes.number.isRequired,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  onClickEdit: PropTypes.func,
};

PostFeedContent.defaultProps = {
  userId: null,
  onClickEdit: null,
};

export default connect(state => ({
  posts: state.posts,
}))(PostFeedContent);
