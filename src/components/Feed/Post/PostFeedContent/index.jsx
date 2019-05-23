import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FeedForm from '../../FeedForm';
import { updatePost } from '../../../../actions/posts';
import { getPostById } from '../../../../store/posts';
import DescDirectPost from './DescDirectPost';
import { checkMentionTag } from '../../../../utils/text';
import styles from './styles.css';
import urls from '../../../../utils/urls';
import { getCoverImage } from '../../../../utils/entityImages';
import Embed from '../../../Embed';

const PostFeedContent = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  return props.formIsVisible ? (
    <div className={styles.form}>
      <FeedForm
        message={post.description}
        entityImages={post.entityImages}
        onCancel={props.hideForm}
        formIsVisible={props.formIsVisible}
        onSubmit={(description, entityImages) => {
          props.hideForm();
          props.updatePost({
            postId: post.id,
            data: { description, entityImages },
          });
        }}
      />
    </div>
  ) : (
    <Fragment>
      {post.entityImages.embeds && post.entityImages.embeds.map((embed, index) => (
        <div className={styles.embed} key={index}>
          <Embed {...embed} />
        </div>
      ))}

      {getCoverImage(post) && !props.formIsVisible && (
        <div className={styles.cover}>
          <img src={urls.getFileUrl(getCoverImage(post))} alt="cover" />
        </div>
      )}
      {post.description &&
        <div className={styles.content}>
          <DescDirectPost
            desc={checkMentionTag(post.description)}
            limit={100}
          />
        </div>
      }
    </Fragment>
  );
};

PostFeedContent.propTypes = {
  postId: PropTypes.number.isRequired,
  formIsVisible: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    updatePost,
  }, dispatch),
)(PostFeedContent);
