import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import moment from 'moment';
import loader from '../../../utils/loader';
import { fetchPost, getOnePostOffer } from '../../../actions/posts';
import Rate from '../../Rate';
import PostRating from '../../Rating/PostRating';
import urls from '../../../utils/urls';
import One from '../../Icons/Airdrop/One';
import Two from '../../Icons/Airdrop/Two';
import Three from '../../Icons/Airdrop/Three';
import Done from '../../Icons/Airdrop/Done';
import DoneSmall from '../../Icons/Airdrop/DoneSmall';
import Dots from '../../Icons/Airdrop/Dots';
import Error from '../../Icons/Airdrop/Error';
import IconShareCircle from '../../Icons/ShareCircle';
import ShareBlock from '../../ShareBlock';
import styles from './styles.css';
import { getPostById } from '../../../store/posts';

const OfferSidebar = (props) => {
  const [sharePopup, toggleSharePopup] = useState(false);

  const toggleShare = () => {
    toggleSharePopup(!sharePopup);
  };

  const conds = {
    gh: true,
    u: true,
    org: true,
  };

  useEffect(() => {
    if (props.postId) {
      props.fetchPost(props.postId);
    }
  }, [props.postId]);

  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  // https://github.com/login/oauth/authorize/?client_id=ec17c7e5b1f383034c25&state=5idkWlsZKzbpcD7u&redirect_uri=https://staging-backend.u.community/api/v1/github/auth_callback?redirect_uri=https://staging.u.community/users


  return (
    <Fragment>
      <div className={styles.rateVote}>
        <Rate className="rate_medium" value={+post.currentRate} label="" />
        <PostRating postId={post.id} />
      </div>
      <div className={styles.airdrop}>
        <div className={styles.status}>
          <div>Airdrop Status:</div>
          {/* <div className={classNames(
            `${styles.statusIcon}`,
            { [styles.statusIconPending]: conds.gh === true },
          )}> */}
          <span className={styles.statusIcon}><Done /></span>
          <span>Recieved</span>
        </div>
        <div className={styles.tokens}>
          <div className={styles.tokensColumn}>
            <div className={styles.tokenNumber}>3 000</div>
            <span className={styles.tokenCurr}>UOS</span>
          </div>
          <div className={styles.tokensColumn}>
            <div className={styles.tokenNumber}>3 000</div>
            <span className={styles.tokenCurr}>UOS.Futures</span>
          </div>
        </div>
      </div>
      <div className={styles.condition}>
        <div className={styles.conditionTitle}>How to Enter Airdrop:</div>
        <div className={styles.option}>
          <div className={styles.optionStatus}><One /></div>
          <div className={styles.optionBlock}>
            <a
              href="https://github.com/login/oauth/authorize/?client_id=ec17c7e5b1f383034c25&state=5idkWlsZKzbpcD7u&redirect_uri=https://staging-backend.u.community/api/v1/github/auth_callback?redirect_uri=https://staging.u.community/users
            "
              className={styles.optionTitle}
            >
              Authorize GitHub
            </a>
            <div className={styles.optionText}>To get your Score system need acсess to your GitHub account data</div>
          </div>
        </div>
        <div className={styles.option}>
          {conds.gh === true ? (
            <div className={styles.optionStatus}><Done /></div>
          ) : (
            <div className={styles.optionStatus}><Two /></div>
          )}
          <div className={styles.optionBlock}>
            <div className={styles.optionTitle}>Register U°OS account</div>
            <div className={styles.optionText}>to secure your Importance in the network</div>
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.optionStatus}><Three /></div>
          <div className={styles.optionBlock}>
            <div className={styles.optionTitle}>Join DevExchange</div>
            <div className={styles.optionText}>to see your Importance in action and talk to community members</div>
          </div>
        </div>
      </div>
      <div className={styles.created}>Created <span>{moment(post.created_at).format('D MMM YYYY')}</span></div>
      <div
        role="presentation"
        className={styles.share}
        onClick={() => toggleShare()}
      >
        <IconShareCircle />
        <span>Share</span>

        {sharePopup ? (
          <div className="post-body__share-popup">
            <ShareBlock
              link={urls.getPostUrl(post)}
              postId={post.id}
              onClickClose={toggleShare}
              repostAvailable={post.myselfData.repostAvailable}
            />
          </div>
        ) : null }
      </div>
    </Fragment>
  );
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    fetchPost,
    getOnePostOffer,
  }, dispatch),
)(OfferSidebar);
