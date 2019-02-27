import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserHead from '../components/User/UserHead';
import UserOrganizations from '../components/User/UserOrganizations';
import UserAbout from '../components/User/UserAbout';
import UserSocialNetworks from '../components/User/UserSocialNetworks';
import UserNetworks from '../components/User/UserNetworks';
import UserCreatedAt from '../components/User/UserCreatedAt';
import LayoutBase from '../components/Layout/LayoutBase';
import { selectUser } from '../store/selectors/user';
import { fetchUser } from '../actions/users';
import { fetchPost } from '../actions/posts';
import { getUserById } from '../store/users';
import { getPostById } from '../store/posts';
import Popup from '../components/Popup';
import ModalContent from '../components/ModalContent';
import Post from '../components/Feed/Post/Post';
import urls from '../utils/urls';
import Feed from '../components/Feed/FeedUser';
import { USER_WALL_FEED_ID, FEED_PER_PAGE } from '../utils/feed';
import { feedGetUserPosts } from '../actions/feed';
import loader from '../utils/loader';
import NotFoundPage from './NotFoundPage';

const UserPage = (props) => {
  const userIdOrName = props.match.params.userId;
  const postId = Number(props.match.params.postId);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loader.start();
    window.scrollTo(0, 0);
    props.dispatch(fetchUser(userIdOrName))
      .then(loader.done)
      .then(() => setLoaded(true))
      .catch(() => setLoaded(true));
  }, [userIdOrName]);

  useEffect(() => {
    if (postId) {
      loader.start();
      props.dispatch(fetchPost(postId))
        .then(loader.done);
    }
  }, [postId]);

  const user = getUserById(props.users, userIdOrName);
  if (loaded && !user) {
    return <NotFoundPage />;
  } else if (!user) {
    return null;
  }

  const post = getPostById(props.posts, postId);
  const userId = user.id;

  return (
    <LayoutBase>
      {post &&
        <Popup onClickClose={() => props.history.push(urls.getUserUrl(userId))}>
          <ModalContent mod="post">
            <Post id={post.id} postTypeId={post.postTypeId} />
          </ModalContent>
        </Popup>
      }

      <div className="container container_user">
        <UserHead userId={userId} />

        <div className="grid grid_user">
          <div className="grid__item">
            <UserAbout userId={userId} />
            <Feed
              userId={userId}
              feedTypeId={USER_WALL_FEED_ID}
            />
          </div>

          <div className="grid__item grid__item_info">
            <UserOrganizations userId={userId} />
            <UserSocialNetworks userId={userId} />
            <UserNetworks userId={userId} />
            <UserCreatedAt userId={userId} />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export const getUserPageData = (store, params) => {
  const userPromise = store.dispatch(fetchUser(params.userId));
  const postPromise = params.postId ? store.dispatch(fetchPost(params.postId)) : null;
  const feedPromise = store.dispatch(feedGetUserPosts({
    feedTypeId: USER_WALL_FEED_ID,
    page: 1,
    perPage: FEED_PER_PAGE,
    userId: params.userId,
  }));

  return Promise.all([userPromise, postPromise, feedPromise]);
};

export default connect(state => ({
  users: state.users,
  posts: state.posts,
  user: selectUser(state),
}))(UserPage);
