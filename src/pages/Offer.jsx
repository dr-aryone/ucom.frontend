import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import LayoutBase from '../components/Layout/LayoutBase';
import { fetchPost, postsFetch, getOnePostOffer, getOnePostOfferWithUserAirdrop } from '../actions/posts';
import { getPostById } from '../store/posts';
import OfferCard from '../components/Offer/OfferCard';
import { getPostCover } from '../utils/posts';
import { getUserName } from '../utils/user';
import urls from '../utils/urls';
import styles from './Offer.css';
import { COMMENTS_CONTAINER_ID_POST } from '../utils/comments';
import loader from '../utils/loader';
import { commentsResetContainerDataByEntryId } from '../actions/comments';
import OfferSidebar from '../components/Offer/OfferSidebar';
import OfferContent from '../components/Offer/OfferContent';
import { getToken, getCookie } from '../utils/token';
import { getManyUsers, fetchMyself } from '../actions/users';
import api from '../api';
import EntrySubHeader from '../components/EntrySubHeader';
import stylesSubHeader from '../components/EntrySubHeader/styles.css';
import { getOrganization } from '../actions/organizations';
import { airdropId, getAirdropOfferId, getGitHubAuthLink } from '../utils/airdrop';
import { selectUser } from '../store/selectors/user';
import { addErrorNotification } from '../actions/notifications';

const { CommonHeaders } = require('ucom.libs.common').Common.Dictionary;

const Offer = (props) => {
  const postId = getAirdropOfferId();
  const gitHubAuthLink = getGitHubAuthLink();
  const [token, setToken] = useState(null);
  const [cookie, setCookie] = useState(null);
  const [users, setUsers] = useState([]);
  const [conditions, setConditions] = useState(null);
  const [metadata, setMetadata] = useState({ page: 1, perPage: 20 });
  const post = getPostById(props.posts, postId);

  const pairAccounts = async () => {
    if (cookie && token && conditions && (conditions.conditions.authGithub === false || conditions.conditions.authMyself === false)) {
      const options = {
        headers: {},
      };
      if (cookie) {
        options.headers[CommonHeaders.TOKEN_USERS_EXTERNAL_GITHUB] = cookie;
      }
      try {
        await api.syncAccountGithub(options);
      } catch (e) {
        console.error(e);
        props.addErrorNotification('Current user or this GitHub identity is already paired with a different user');
      }
    }
  };

  const getParticipants = (page = 1) => {
    props.getManyUsers({
      airdrops: airdropId,
      orderBy: 'score',
      page,
      perPage: 20,
    }).then((data) => {
      setUsers(data.data);
      setMetadata(data.metadata);
    });
  };

  const onChangePage = (page) => {
    getParticipants(page);
    window.scrollTo(0, 'top');
  };

  useEffect(() => {
    loader.start();
    props.commentsResetContainerDataByEntryId({
      entryId: postId,
      containerId: COMMENTS_CONTAINER_ID_POST,
    });
    const options = {
      headers: {},
    };
    if (cookie) {
      options.headers[CommonHeaders.TOKEN_USERS_EXTERNAL_GITHUB] = cookie;
    }
    if (Object.keys(props.user).length) {
      props.getOnePostOfferWithUserAirdrop({
        postId,
      }, options).then((data) => {
        props.getOrganization(data.onePostOffer.organization.id);
        setConditions(data.oneUserAirdrop);
      });
    } else {
      props.getOnePostOffer({ postId }, options).then((data) => {
        props.getOrganization(data.onePostOffer.organization.id);
      });
    }

    getParticipants();

    loader.done();
  }, [postId, props.user]);

  if (!post) {
    return null;
  }

  useEffect(() => {
    pairAccounts();
  }, [cookie, token, conditions]);

  useEffect(() => {
    setToken(getToken());
    setCookie(getCookie(CommonHeaders.TOKEN_USERS_EXTERNAL_GITHUB));
  }, []);

  return (
    <LayoutBase gray>
      <div className={styles.container}>
        <div className={stylesSubHeader.wrapperOffer}>
          <EntrySubHeader
            organization
            showFollow
            userUrl={urls.getOrganizationUrl(post.organization.id)}
            userName={post.organization.title}
            userAvatarUrl={urls.getFileUrl(post.organization.avatarFilename)}
            userId={+post.organization.id}
            userRate={+post.organization.currentRate}
          />
          <OfferCard
            postId={postId}
            coverUrl={getPostCover(post)}
            rate={+post.currentRate}
            title={post.title}
            url={urls.getPostUrl(post)}
            userUrl={urls.getUserUrl(post.user.id)}
            userImageUrl={urls.getFileUrl(post.user.avatarFilename)}
            userName={getUserName(post.user)}
            accountName={post.user.accountName}
            finishedAt={post.finishedAt}
            startedAt={post.startedAt}
            users={users}
            count={metadata.totalAmount}
            conditions={conditions}
            cookie={cookie}
            token={token}
            metadata={metadata}
            onChangePage={onChangePage}
            gitHubAuthLink={gitHubAuthLink}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <OfferContent
              postId={postId}
              score={conditions && conditions.score}
              tokens={post.offerData && post.offerData.tokens}
              commentsCount={post.commentsCount}
              status={conditions && conditions.airdropStatus}
            />
          </div>
          <div className={styles.sidebar}>
            <OfferSidebar
              rate={+post.currentRate}
              postId={postId}
              createdAt={moment(post.createdAt).format('D MMM YYYY')}
              link={urls.getPostUrl(post)}
              repostAvailable={post.myselfData && post.myselfData.repostAvailable}
              conditions={conditions}
              cookie={cookie}
              token={token}
              postTypeId={post.postTypeId}
              startedAt={post.startedAt}
              finishedAt={post.finishedAt}
              gitHubAuthLink={gitHubAuthLink}
              organizationId={post.organizationId}
            />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

Offer.propTypes = {
  posts: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  commentsResetContainerDataByEntryId: PropTypes.func.isRequired,
  getOnePostOffer: PropTypes.func.isRequired,
  getOnePostOfferWithUserAirdrop: PropTypes.func.isRequired,
  getManyUsers: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
  addErrorNotification: PropTypes.func,
};

export default connect(
  state => ({
    posts: state.posts,
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    fetchPost,
    postsFetch,
    commentsResetContainerDataByEntryId,
    getOnePostOffer,
    getOnePostOfferWithUserAirdrop,
    getManyUsers,
    getOrganization,
    fetchMyself,
    addErrorNotification,
  }, dispatch),
)(Offer);

export const getPostOfferData = async (store) => {
  try {
    const postId = getAirdropOfferId();
    await store.dispatch(getOnePostOfferWithUserAirdrop({ postId }));
  } catch (e) {
    throw e;
  }
};

