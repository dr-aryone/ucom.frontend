import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserHead from '../components/User/UserHead/index';
import LayoutBase from '../components/Layout/LayoutBase';
import { selectUser } from '../store/selectors/user';
import { fetchUserPageData, trustUser, untrustUser, fetchUserTrustedBy } from '../actions/users';
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
import Footer from '../components/Footer';
import EntrySocialNetworks from '../components/EntrySocialNetworks';
import EntryCreatedAt from '../components/EntryCreatedAt';
import EntryContacts from '../components/EntryContacts';
import EntryAbout from '../components/EntryAbout';
import EntryListSection from '../components/EntryListSection';
import Trust from '../components/Trust';
import { getUserName, userIsOwner } from '../utils/user';
import { authShowPopup } from '../actions/auth';

const UserPage = (props) => {
  const userIdOrName = props.match.params.userId;
  const postId = Number(props.match.params.postId);
  const [loaded, setLoaded] = useState(false);
  const [trustedByUsersIds, setTrustedByUsersIds] = useState([]);
  const [trustedByMetadata, setTrustedByMetadata] = useState({});
  const [trustLoading, setTrustLoading] = useState(false);

  const fetchData = async () => {
    loader.start();
    try {
      const data = await props.dispatch(fetchUserPageData({
        userIdentity: userIdOrName,
      }));
      setTrustedByUsersIds(data.oneUserTrustedBy.data.map(i => i.id));
      setTrustedByMetadata(data.oneUserTrustedBy.metadata);
    } catch (e) {
      console.error(e);
    }
    loader.done();
    setLoaded(true);
  };

  const fetchTrustedBy = async (page = 1) => {
    loader.start();
    try {
      const data = await props.dispatch(fetchUserTrustedBy({
        userIdentity: userIdOrName,
        page,
      }));
      setTrustedByUsersIds(data.data.map(i => i.id));
      setTrustedByMetadata(data.metadata);
    } catch (e) {
      console.error(e);
    }
    loader.done();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
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
    <LayoutBase gray>
      {post &&
        <Popup onClickClose={() => props.history.push(urls.getUserUrl(userId))}>
          <ModalContent mod="post">
            <Post id={post.id} postTypeId={post.postTypeId} />
          </ModalContent>
        </Popup>
      }

      <div className="layout layout_profile">
        <div className="layout__header">
          <UserHead
            userId={userId}
            trustedByUsersCount={trustedByMetadata.totalAmount}
            trustedByUsersIds={trustedByUsersIds}
            trustedByMetadata={trustedByMetadata}
            trustedByOnChangePage={fetchTrustedBy}
          />
        </div>
        <div className="layout__sidebar">
          {user.organizations &&
            <EntryListSection
              title="Communities"
              count={user.organizations.length}
              data={user.organizations.map(item => ({
                id: item.id,
                organization: true,
                title: item.title,
                avatarSrc: urls.getFileUrl(item.avatarFilename),
                url: urls.getOrganizationUrl(item.id),
                nickname: item.nickname,
                currentRate: item.currentRate,
              }))}
            />
          }

          <EntryContacts site={user.personalWebsiteUrl} />
          <EntrySocialNetworks
            urls={(user.usersSources || []).map(i => i.sourceUrl).filter(i => !!i)}
          />
          <EntryCreatedAt date={user.createdAt} />

          {!userIsOwner(user, props.owner) && !props.ownerIsLoading &&
            <Trust
              loading={trustLoading}
              trusted={user && user.myselfData && user.myselfData.trust}
              userName={getUserName(user)}
              userAvtarUrl={urls.getFileUrl(user.avatarFilename)}
              onClickTrust={async () => {
                if (!props.owner.id) {
                  props.dispatch(authShowPopup());
                  return;
                }
                loader.start();
                setTrustLoading(true);
                await props.dispatch(trustUser({
                  userId: user.id,
                  userAccountName: user.accountName,
                  ownerAccountName: props.owner.accountName,
                }));
                await fetchTrustedBy(trustedByMetadata.page);
                loader.done();
                setTrustLoading(false);
              }}
              onClickUntrust={async () => {
                if (!props.owner.id) {
                  props.dispatch(authShowPopup());
                  return;
                }
                loader.start();
                setTrustLoading(true);
                await props.dispatch(untrustUser({
                  userId: user.id,
                  userAccountName: user.accountName,
                  ownerAccountName: props.owner.accountName,
                }));
                await fetchTrustedBy(trustedByMetadata.page);
                loader.done();
                setTrustLoading(false);
              }}
            />
          }
        </div>
        <div className="layout__main">
          <EntryAbout text={user.about} />
          <Feed userId={userId} feedTypeId={USER_WALL_FEED_ID} />
        </div>
        <div className="layout__footer">
          <Footer />
        </div>
      </div>
    </LayoutBase>
  );
};

UserPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
      postId: PropTypes.string,
    }),
  }).isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  posts: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
    accountName: PropTypes.string,
    myselfData: PropTypes.shape({
      trust: PropTypes.bool,
    }),
  }).isRequired,
  ownerIsLoading: PropTypes.bool,
};

UserPage.defaultProps = {
  ownerIsLoading: true,
};

export const getUserPageData = (store, params) => {
  const userPromise = store.dispatch(fetchUserPageData({
    userIdentity: params.userId,
  }));
  const postPromise = params.postId ? store.dispatch(fetchPost(params.postId)) : null;
  const feedPromise = store.dispatch(feedGetUserPosts({
    feedTypeId: USER_WALL_FEED_ID,
    page: 1,
    perPage: FEED_PER_PAGE,
    userId: params.userId,
    userIdentity: params.userId,
  }));

  return Promise.all([userPromise, postPromise, feedPromise]);
};

export default connect(state => ({
  users: state.users,
  posts: state.posts,
  owner: selectUser(state),
  ownerIsLoading: state.user.loading,
}))(UserPage);
