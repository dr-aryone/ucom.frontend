import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconComment from '../../../Icons/Comment';
import IconShare from '../../../Icons/Share';
import Comments from '../../../Comments/wrapper';
import ShareBlock from '../../../ShareBlock';
import { createComment } from '../../../../actions/comments';
import urls from '../../../../utils/urls';
import styles from './styles.css';
import PostRating from '../../../Rating/PostRating';
import { COMMENTS_CONTAINER_ID_FEED_POST } from '../../../../utils/comments';

class PostFeedFooter extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <Fragment>
        <div className={styles.footer}>
          <div>
            <span
              role="presentation"
              className={styles.commentСount}
            >
              <span className="inline inline_small">
                <span className="inline__item">
                  <IconComment />
                </span>
                <span className="inline__item">{this.props.commentsCount}</span>
              </span>
            </span>
            <span
              role="presentation"
              className={classNames(
                `${styles.share}`,
                { [styles.shareActive]: this.props.sharePopup },
              )}
              onClick={this.props.toggleShare}
            >
              <span className="inline inline_small">
                <span className="inline__item">
                  <IconShare />
                </span>
                <span className="inline__item">Share</span>
              </span>
            </span>
            {this.props.sharePopup ? (
              <div className="post__share-popup">
                <ShareBlock
                  link={urls.getPostUrl(post)}
                  postId={post.id}
                  onClickClose={this.props.toggleShare}
                  repostAvailable={post.myselfData.repostAvailable}
                />
              </div>
            ) : null }
          </div>
          <div>
            <PostRating postId={post.id} />
          </div>
        </div>

        <div className={styles.comments}>
          <Comments postId={post.id} containerId={COMMENTS_CONTAINER_ID_FEED_POST} />
        </div>
      </Fragment>
    );
  }
}

PostFeedFooter.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  sharePopup: PropTypes.bool.isRequired,
  toggleShare: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    comments: state.comments,
  }),
  dispatch => bindActionCreators({
    createComment,
  }, dispatch),
)(PostFeedFooter);
