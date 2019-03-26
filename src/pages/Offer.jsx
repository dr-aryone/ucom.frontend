import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import LayoutBase from '../components/Layout/LayoutBase';
import OfferHeader from '../components/PostMedia/OfferHeader';
import { fetchPost, postsFetch, getOnePostOffer, getOnePostOfferWithUserAirdrop } from '../actions/posts';
import { getPostById } from '../store/posts';
import OfferCard from '../components/PostMedia/OfferCard';
import { getPostCover } from '../utils/posts';
import { getUserName } from '../utils/user';
import urls from '../utils/urls';
import styles from './Offer.css';
import Comments from '../components/Comments/wrapper';
import { COMMENTS_CONTAINER_ID_POST } from '../utils/comments';
import loader from '../utils/loader';
import { commentsResetContainerDataByEntryId } from '../actions/comments';
import ProgressBar from '../components/ProgressBar';
import { getPercent } from '../utils/text';
import OfferSidebar from '../components/PostMedia/OfferSidebar';
import { getToken } from '../utils/token';

const { AirdropStatuses } = require('ucom.libs.common').Airdrop.Dictionary;

const Offer = (props) => {
  const postId = 14317;
  const tokens = [
    {
      amount_claim: 123456789,
      amount_left: 121234561,
      symbol: 'UOS',
    },
    {
      amount_claim: 123456789,
      amount_left: 71289,
      symbol: 'UOS.F',
    },
  ];
  const perc1 = Number(getPercent(tokens[0].amount_left, tokens[0].amount_claim));
  const perc2 = Number(getPercent(tokens[1].amount_left, tokens[1].amount_claim));

  const token = getToken();
  console.log(token);

  let cookie;
  useEffect(() => {
    cookie = (name) => {
      const match = document.cookie.match(new RegExp(`(^| ) + ${name} + =([^;]+)`));
      return match ? match[2] : null;
    };
  }, []);

  if (cookie !== null) {
    console.log(cookie);
  }

  useEffect(() => {
    if (postId) {
      props.fetchPost(postId);
    }
  }, [postId]);

  useEffect(() => {
    loader.start();
    props.commentsResetContainerDataByEntryId({
      entryId: postId,
      containerId: COMMENTS_CONTAINER_ID_POST,
    });
    props.postsFetch({ postId })
      .then(loader.done);
    props.getOnePostOffer({
      postId,
    });
    props.getOnePostOfferWithUserAirdrop({
      postId,
    });
  }, [postId]);

  const post = getPostById(props.posts, postId);

  if (!post) {
    return null;
  }

  return (
    <LayoutBase>
      <div className="container container_post">
        <OfferHeader
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
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <div className={styles.score}>Your GitHub score <span>123&nbsp;456</span></div>
            <div className={styles.section}>
              <div className={styles.title}>GitHub Score</div>
              <div className={styles.text}>GitHub is a huge network tallying at over 28 million users. A lot of the work you do on GitHub — from committing your code to opening issues — is of value. Most of your actions are of value. We did a rough calculation of your account's value, or your Importance in the GitHub network as we call it, that you can get by signing in with your GitHub account.</div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>Tokens Airdrop</div>
              <div className={styles.text}><p>You can register your GitHub account's Importance on the U°OS network and you — and only you — will forever keep the key to it. The Importance is registered through tokens that are issued to your account on the U°OS network.</p><p>There are two types of tokens — UOS and UOS.Futures. UOS to register your Importance and UOS.Futures to exchange to the mainnet UOS tokens. An additional pool of mainnet UOS tokens will also be distributed on all accounts per their Importance.</p></div>

              <div className={styles.progress}>
                <div className={styles.tokenLeft}>UOS Left {(tokens[0].amount_left).toLocaleString('ru-RU')}</div>
                <div className={styles.tokenTotal}>from {(tokens[0].amount_claim).toLocaleString('ru-RU')}</div>
              </div>
              <ProgressBar className={styles.filler} percentage={perc1} />

              <div className={styles.progress}>
                <div className={styles.tokenLeft}>UOS.Futures Left {(tokens[1].amount_left).toLocaleString('ru-RU')}</div>
                <div className={styles.tokenTotal}>from {(tokens[1].amount_claim).toLocaleString('ru-RU')}</div>
              </div>
              <ProgressBar percentage={perc2} />
            </div>
            <div className={styles.section}>
              <div className={styles.title}>Formula</div>
              <div className={styles.text}>We calculated the account Importance in the GitHub network based on the events associated with each account, such as commits, comments, opened issues, wiki editing and so on, and the repositories associated with each account.</div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>DevExchange Community</div>
              <div className={styles.text}>This community is a mix of Stack Exchange and Stack Overflow and showcases how you can use your Importance that always belongs to you on other networks. Imagine if GitHub had account reputation and you could use it on StackExchange. This is what the DevExchange community showcases. And you can start your own communities too.</div>
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
              postId={postId}
            />
          </div>
        </div>
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
    postsFetch,
    commentsResetContainerDataByEntryId,
    getOnePostOffer,
    getOnePostOfferWithUserAirdrop,
  }, dispatch),
)(Offer);

