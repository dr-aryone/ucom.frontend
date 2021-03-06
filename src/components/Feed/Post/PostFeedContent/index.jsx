import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FeedForm from '../../FeedForm';
import Gallery from '../../../Gallery';
import { updatePost } from '../../../../actions/posts';
import { getPostById } from '../../../../store/posts';
import DescDirectPost from './DescDirectPost';
import { checkMentionTag } from '../../../../utils/text';
import { POST_TYPE_DIRECT_ID } from '../../../../utils/posts';
import styles from './styles.css';
import urls from '../../../../utils/urls';
import { getCoverImage } from '../../../../utils/entityImages';

const PostFeedContent = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  return (
    <Fragment>
      {props.formIsVisible ? (
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
          {(props.postTypeId === POST_TYPE_DIRECT_ID || post.postTypeId === POST_TYPE_DIRECT_ID) && !props.formIsVisible ? (
            <Fragment>
              {getCoverImage(post) ? (
                <div className={styles.cover}>
                  <img src={urls.getFileUrl(getCoverImage(post))} alt="cover" />
                </div>
                ) : post.entityImages.gallery && post.entityImages.gallery.length > 0 &&
                <div className={styles.gallery}>
                  <Gallery
                    images={post.entityImages.gallery}
                    userId={props.userId}
                    date={moment(post.createdAt).fromNow()}
                  />
                </div>
              }


              {post.description &&
                <div className={styles.content}>
                  <DescDirectPost
                    desc={checkMentionTag(post.description)}
                    limit={100}
                  />
                </div>
              }
            </Fragment>
          ) : (
            null
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

PostFeedContent.propTypes = {
  postId: PropTypes.number.isRequired,
  formIsVisible: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  postTypeId: PropTypes.number,
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
