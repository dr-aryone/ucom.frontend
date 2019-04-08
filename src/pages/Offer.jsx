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
import { getManyUsers } from '../actions/users';
import api from '../api';
import EntrySubHeader from '../components/EntrySubHeader';
import stylesSubHeader from '../components/EntrySubHeader/styles.css';
import { getOrganization } from '../actions/organizations';

const { CommonHeaders } = require('ucom.libs.common').Common.Dictionary;

const Offer = (props) => {
  const token = getToken();
  const cookie = getCookie(`${CommonHeaders.TOKEN_USERS_EXTERNAL_GITHUB}`);
  const [users, setUsers] = useState([]);
  const [conditions, setConditions] = useState(null);
  const postId = 14317;
  const post = getPostById(props.posts, postId);

  const pairAccounts = async () => {
    if (cookie && token && conditions && (conditions.conditions.authGithub === false || conditions.conditions.authMyself === false)) {
      try {
        await api.syncAccountGithub(token, cookie);
      } catch (e) {
        console.error(e);
      }
    }
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
    props.getOnePostOfferWithUserAirdrop({
      postId,
    }, options).then((data) => {
      props.getOrganization(data.onePostOffer.organization.id);
      setConditions(data.oneUserAirdrop);
    });
    props.getManyUsers({
      airdrops: { id: 1 },
      orderBy: 'score',
      page: 1,
      perPage: 10,
    }).then((data) => {
      setUsers(data.data);
    });

    loader.done();
  }, [postId]);

  if (!post) {
    return null;
  }

  useEffect(() => {
    pairAccounts();
  }, [cookie, token, conditions]);


  return (
    <LayoutBase>
      <div className="container container_post">
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
            rate={post.currentRate}
            title={post.title}
            url={urls.getPostUrl(post)}
            userUrl={urls.getUserUrl(post.user.id)}
            userImageUrl={urls.getFileUrl(post.user.avatarFilename)}
            userName={getUserName(post.user)}
            accountName={post.user.accountName}
            finishedAt={post.finishedAt}
            startedAt={post.startedAt}
            users={users}
            count={+users.length}
            conditions={conditions || null}
            cookie={cookie}
            token={token}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <OfferContent
              postId={postId}
              score={conditions && conditions.score}
              tokens={post.offerData && post.offerData.tokens}
              commentsCount={post.commentsCount}
            />
          </div>
          <div className={styles.sidebar}>
            <OfferSidebar
              rate={+post.currentRate}
              postId={postId}
              createdAt={moment(post.createdAt).format('D MMM YYYY')}
              link={urls.getPostUrl(post)}
              repostAvailable={post.myselfData && post.myselfData.repostAvailable}
              conditions={conditions || null}
              cookie={cookie}
              token={token}
            />
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

Offer.propTypes = {
  posts: PropTypes.objectOf(PropTypes.any).isRequired,
  commentsResetContainerDataByEntryId: PropTypes.func.isRequired,
  getOnePostOfferWithUserAirdrop: PropTypes.func.isRequired,
  getManyUsers: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
    users: state.users,
  }),
  dispatch => bindActionCreators({
    fetchPost,
    postsFetch,
    commentsResetContainerDataByEntryId,
    getOnePostOffer,
    getOnePostOfferWithUserAirdrop,
    getManyUsers,
    getOrganization,
  }, dispatch),
)(Offer);

export const getPostOfferData = async (store) => {
  try {
    const postId = 14317;
    await store.dispatch(getOnePostOfferWithUserAirdrop({ postId }));
  } catch (e) {
    throw e;
  }
};

