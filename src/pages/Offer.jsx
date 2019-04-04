import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import moment from 'moment';
import LayoutBase from '../components/Layout/LayoutBase';
import { fetchPost, postsFetch, getOnePostOffer, getOnePostOfferWithUserAirdrop } from '../actions/posts';
import { getPostById } from '../store/posts';
import OfferCard from '../components/Offer/OfferCard';
import { getPostCover } from '../utils/posts';
import { getUserName } from '../utils/user';
import urls from '../utils/urls';
import styles from './Offer.css';
import Comments from '../components/Comments/wrapper';
import { COMMENTS_CONTAINER_ID_POST } from '../utils/comments';
import loader from '../utils/loader';
import { commentsResetContainerDataByEntryId } from '../actions/comments';
import OfferSidebar from '../components/Offer/OfferSidebar';
import { getToken, getCookie } from '../utils/token';
import { getManyUsers } from '../actions/users';
import api from '../api';
import ProgressBar from '../components/ProgressBar';
import { getPercent } from '../utils/text';
import EntrySubHeader from '../components/EntrySubHeader';
import stylesSubHeader from '../components/EntrySubHeader/styles.css';
import { getOrganization } from '../actions/organizations';

const { CommonHeaders } = require('ucom.libs.common').Common.Dictionary;

const Offer = (props) => {
  const [token] = useState(getToken());
  const [cookie] = useState(getCookie(`${CommonHeaders.TOKEN_USERS_EXTERNAL_GITHUB}`));
  const [users, setUsers] = useState([]);
  const [conditions, setConditions] = useState();
  const postId = 14317;
  const post = getPostById(props.posts, postId);

  const pairAccounts = async () => {
    console.log('aa');
    if (cookie && token && conditions && conditions.conditions.authGithub === false && !conditions.conditions.authMyself === false) {
      try {
        console.log('aaaaaaaa');
        await api.syncAccountGithub(token, cookie);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    pairAccounts();
  }, [cookie, token, conditions]);
  console.log('cookie: ', cookie);
  console.log('token: ', token);


  useEffect(() => {
    loader.start();
    props.commentsResetContainerDataByEntryId({
      entryId: postId,
      containerId: COMMENTS_CONTAINER_ID_POST,
    });
    // props.postsFetch({ postId })
    //   .then(loader.done);
    props.getOnePostOfferWithUserAirdrop({
      postId,
    }).then((data) => {
      // console.log(data);
      props.getOrganization(data.onePostOffer.organization.id);
      setConditions(data.oneUserAirdrop);
    });
    props.getManyUsers({
      airdrops: { id: 1 },
      orderBy: 'score',
      page: 1,
      perPage: 10,
    }).then((data) => {
      // console.log('users: ', data);
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

  console.log('conditions: ', conditions);

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
            users={users}
            count={+users.length}
            conditions={conditions || null}
            token={token}
            // cookie={(conditions && conditions.conditions.authGithub) || cookie}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            {conditions && conditions.score !== 0 &&
              <div className={styles.score}>Your GitHub score <span>{(conditions.score).toLocaleString('ru-RU')}</span></div>
            }
            <div className={styles.section}>
              <div className={styles.title}>GitHub Score</div>
              <div className={styles.text}>GitHub is a large network, tallying at over 28 million users. Most of the actions you do on this platform — from code commits to issue openings — are valuable. We estimated your account’s score, aka Importance in the GitHub community, based on your activity. You can get this score by signing in with your Github account.</div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>Tokens Airdrop</div>
              <div className={styles.text}>You can register your GitHub account&apos;s Importance on the U°OS network, using TestNet tokens, that are issued to you, proportionally to your GitHub account score. Your account and Importance score will be available to you and you only via the private key. Overall, there are two types of tokens — U°OS TestNet tokens and U°OS Futures. U°OS TestNet tokens are used to register your Importance on U°OS, while U°OS Futures can be directly exchanged to the U°OS MainNet tokens. An additional pool of MainNet U°OS tokens will be distributed to all accounts, proportionally to their Importance at the start of MainNet.</div>
              {post.offerData &&
                <Fragment>
                  <div className={styles.progress}>
                    <div className={styles.tokenLeft}>UOS Left {(post.offerData.tokens[0].amountLeft).toLocaleString('ru-RU')}</div>
                    <div className={styles.tokenTotal}>from {(post.offerData.tokens[0].amountClaim).toLocaleString('ru-RU')}</div>
                  </div>
                  <ProgressBar
                    className={styles.filler}
                    percentage={Number(getPercent(post.offerData.tokens[0].amount_left, post.offerData.tokens[0].amount_claim))}
                  />

                  <div className={styles.progress}>
                    <div className={styles.tokenLeft}>UOS.Futures Left {(post.offerData.tokens[1].amountLeft).toLocaleString('ru-RU')}</div>
                    <div className={styles.tokenTotal}>from {(post.offerData.tokens[1].amountClaim).toLocaleString('ru-RU')}</div>
                  </div>
                  <ProgressBar
                    className={styles.filler}
                    percentage={Number(getPercent(post.offerData.tokens[1].amount_left, post.offerData.tokens[1].amount_claim))}
                  />
                </Fragment>
              }
            </div>
            <div className={styles.section}>
              <div className={styles.title}>Formula</div>
              <div className={styles.text}>We calculated the account’s Importance in the GitHub network, based on the events associated with each account, such as commits, comments, opened issues, wiki editing etc., and based on the number of committed events in each repository, associated with the account.</div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>DevExchange Community</div>
              <div className={styles.text}> This community is a mix of Stack Exchange and Stack Overflow. It showcases how you can use your Importance, which always belongs to you, even on other platforms. Imagine a GitHub that has an account reputation, that you can use at StackExchange. This is what the DevExchange community allows you to do. On top of that, you can start your own communities as well.</div>
            </div>

            <div className={styles.section}>
              <a href="/tags/uos" className="tag_link" target="_blank">#uos</a>
              <a href="/tags/airdrop" className="tag_link" target="_blank"> #airdrop</a>
            </div>

            <div className={styles.section}>
              <div className={styles.btn}>Get your Score</div>
            </div>

            <div className={styles.commentsCount}>Comments {post.commentsCount}</div>
            <div className="post-body__comments">
              <Comments postId={postId} containerId={COMMENTS_CONTAINER_ID_POST} />
            </div>
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

export const getPostOfferData = async (store, { postId }) => {
  try {
    await store.dispatch(getOnePostOfferWithUserAirdrop({ postId }));
  } catch (e) {
    throw e;
  }
};

