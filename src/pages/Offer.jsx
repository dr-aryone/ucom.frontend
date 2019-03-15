import React from 'react';
import { connect } from 'react-redux';
import LayoutBase from '../components/Layout/LayoutBase';
import PostHeader from '../components/PostMedia/PostHeader';
import api, { getPost } from '../api';
import { fetchPost } from '../actions/posts';

const Offer = () => {
  // const post = api.getPost(15);

  // console.log(post);

  return (
    <LayoutBase>
      <div className="container container_post">
        <PostHeader />
      </div>
    </LayoutBase>
  );
};

// export default connect(
//   state => {
//     posts: state.posts
//   },

// )(Offer);
