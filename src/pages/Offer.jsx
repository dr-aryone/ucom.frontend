import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LayoutBase from '../components/Layout/LayoutBase';
import PostHeader from '../components/PostMedia/PostHeader';
import { fetchPost } from '../actions/posts';
import { getPostById } from '../store/posts';
import OfferCard from '../components/PostMedia/OfferCard';
import { getPostCover } from '../utils/posts';
import { getUserName } from '../utils/user';
import urls from '../utils/urls';

const Offer = (props) => {
  const postId = 14317;

  useEffect(() => {
    if (postId) {
      props.fetchPost(postId);
    }
  }, [postId]);

  const post = getPostById(props.posts, postId);

  if (!post) {
    return null;
  }

  console.log(post);

  return (
    <LayoutBase>
      <div className="container container_post">
        <PostHeader
          org={post.organization}
        />
        <OfferCard
          id={postId}
          coverUrl={getPostCover(post)}
          rate={post.currentRate}
          title={post.title}
          url={urls.getPostUrl(post)}
          userUrl={urls.getUserUrl(post.user.id)}
          userImageUrl={urls.getFileUrl(post.user.avatarFilename)}
          userName={getUserName(post.user)}
          accountName={post.user.accountName}
        />
      </div>
    </LayoutBase>
  );
};

export default connect(
  state => ({
    posts: state.posts,
    users: state.users,
  }),
  dispatch => bindActionCreators({
    fetchPost,
  }, dispatch),
)(Offer);
