import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { feedReset, feedGetUserPosts, feedCreatePost } from '../../actions/feed';
import { FEED_PER_PAGE } from '../../utils/feed';
import { POST_TYPE_DIRECT_ID } from '../../utils/posts';
import Feed from './FeedView';
import { commentsResetContainerDataById } from '../../actions/comments';
import { COMMENTS_CONTAINER_ID_FEED_POST } from '../../utils/comments';
import loader from '../../utils/loader';

const FeedUser = (props) => {
  const onClickLoadMore = async () => {
    loader.start();
    await props.feedGetUserPosts({
      feedTypeId: props.feedTypeId,
      page: props.feed.metadata.page + 1,
      perPage: FEED_PER_PAGE,
      userId: props.userId,
      organizationId: props.organizationId,
      tagIdentity: props.tagIdentity,
    });
    loader.done();
  };

  const onSubmitPostForm = (description, mainImageFilename) => {
    props.feedCreatePost(props.feedTypeId, {
      organizationId: props.organizationId,
      userId: props.userId,
      data: {
        description,
        mainImageFilename,
        postTypeId: POST_TYPE_DIRECT_ID,
      },
    });
  };

  useEffect(() => {
    props.feedReset();
    props.commentsResetContainerDataById({
      containerId: COMMENTS_CONTAINER_ID_FEED_POST,
    });
    props.feedGetUserPosts({
      feedTypeId: props.feedTypeId,
      page: 1,
      perPage: FEED_PER_PAGE,
      userId: props.userId,
      organizationId: props.organizationId,
      tagIdentity: props.tagIdentity,
    });
  }, [props.userId, props.organizationId, props.tagIdentity]);

  return (
    <Feed
      hasMore={props.feed.metadata.hasMore}
      postIds={props.feed.postIds}
      loading={props.feed.loading}
      feedInputInitialText={props.feedInputInitialText}
      onClickLoadMore={onClickLoadMore}
      onSubmitPostForm={onSubmitPostForm}
      filter={props.filter}
    />
  );
};

FeedUser.propTypes = {
  feed: PropTypes.objectOf(PropTypes.any).isRequired,
  feedTypeId: PropTypes.number.isRequired,
  userId: PropTypes.number,
  organizationId: PropTypes.number,
  tagIdentity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  feedReset: PropTypes.func.isRequired,
  commentsResetContainerDataById: PropTypes.func.isRequired,
  feedGetUserPosts: PropTypes.func.isRequired,
  feedCreatePost: PropTypes.func.isRequired,
  feedInputInitialText: PropTypes.string,
  filter: PropTypes.func,
};

FeedUser.defaultProps = {
  userId: null,
  organizationId: null,
  tagIdentity: null,
  feedInputInitialText: '',
  filter: null,
};

export default connect(
  state => ({
    feed: state.feed,
  }),
  dispatch => bindActionCreators({
    feedReset,
    feedGetUserPosts,
    feedCreatePost,
    commentsResetContainerDataById,
  }, dispatch),
)(FeedUser);
