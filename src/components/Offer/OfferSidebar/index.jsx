import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import moment from 'moment';
import { fetchPost, getOnePostOffer, getOnePostOfferWithUserAirdrop } from '../../../actions/posts';
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
import { authShowPopup } from '../../../actions/auth';
import { fetchMyself } from '../../../actions/users';
import { getUserById } from '../../../store/users';
import { selectUser } from '../../../store/selectors/user';

const { AirdropStatuses } = require('ucom.libs.common').Airdrop.Dictionary;

const OfferSidebar = (props) => {
  const [sharePopup, toggleSharePopup] = useState(false);
  const [conditions, setConditions] = useState();
  const postId = Number(props.postId);

  const toggleShare = () => {
    toggleSharePopup(!sharePopup);
  };

  useEffect(() => {
    if (props.postId) {
      // props.fetchPost(props.postId);
      // const { postId } = props.postId;
      props.getOnePostOfferWithUserAirdrop({ postId }).then((data) => {
        // console.log(data);
        setConditions(data.oneUserAirdrop);
      });
    }
    props.fetchMyself();
  }, [props.postId]);

  const owner = getUserById(props.users, props.user.id);
  const post = getPostById(props.posts, props.postId);

  // if (conditions && conditions.conditions.authGithub === true) {
  //   console.log('ppppppp: ', conditions);
  // }

  if (!post) {
    return null;
  }

  // console.log('token: ', props.token);
  // console.log('cookie: ', props.cookie);

  // console.log(post);

  return (
    <Fragment>
      <div className={styles.rateVote}>
        <Rate className="rate_medium" value={+post.currentRate} label="" />
        <PostRating postId={post.id} />
      </div>
      {conditions && (conditions.airdropStatus === AirdropStatuses.PENDING || conditions.airdropStatus === AirdropStatuses.RECEIVED) &&
        <div className={styles.airdrop}>
          <div className={styles.status}>
            <div>Airdrop Status:</div>
            {conditions.airdropStatus === AirdropStatuses.PENDING &&
              <Fragment>
                <span className={styles.statusIcon}><Dots /></span>
                <span className={styles.statusPending}>In progress</span>
              </Fragment>
            }
            {conditions.airdropStatus === AirdropStatuses.RECEIVED &&
              <Fragment>
                <span className={styles.statusIcon}><DoneSmall /></span>
                <span className={styles.statusReceived}>Recieved</span>
              </Fragment>
            }
          </div>
          {conditions &&
            <div className={styles.tokens}>
              <div className={styles.tokensColumn}>
                <div className={styles.tokenNumber}>{(conditions.tokens[0].amountClaim).toLocaleString('ru-RU')}</div>
                <span className={styles.tokenCurr}>UOS</span>
              </div>
              <div className={styles.tokensColumn}>
                <div className={styles.tokenNumber}>{(conditions.tokens[1].amountClaim).toLocaleString('ru-RU')}</div>
                <span className={styles.tokenCurr}>UOS.Futures</span>
              </div>
            </div>
          }
        </div>
      }

      <div className={styles.condition}>
        <div className={styles.conditionTitle}>How to Enter Airdrop:</div>
        <div className={styles.option}>
          <div className={styles.optionStatus}>{conditions && conditions.conditions.authGithub === true ? <Done /> : <One />}</div>
          <div className={styles.optionBlock}>
            <a
              // users/?${location.search}&
              href="https://github.com/login/oauth/authorize/?client_id=ec17c7e5b1f383034c25&state=5idkWlsZKzbpcD7u&redirect_uri=https://staging-backend.u.community/api/v1/github/auth_callback?redirect_uri=https://staging.u.community/?mock_external_id=true
            "
              className={styles.optionTitle}
            >
              Authorize GitHub
            </a>
            <div className={styles.optionText}>To get your Score system need acсess to your GitHub account data</div>
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.optionStatus}>{conditions && conditions.conditions.authMyself === true ? <Done /> : <Two />}</div>
          <div className={styles.optionBlock}>
            <div
              role="presentation"
              onClick={() => props.authShowPopup()}
              className={styles.optionTitle}
            >
              Register U°OS account
            </div>
            <div className={styles.optionText}>to secure your Importance in the network</div>
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.optionStatus}>{conditions && conditions.conditions.followingDevExchange === true ? <Done /> : <Three />}</div>
          <div className={styles.optionBlock}>
            <a href="/communities/107" target="_blank" className={styles.optionTitle}>Join DevExchange</a>
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
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    fetchPost,
    getOnePostOfferWithUserAirdrop,
    authShowPopup,
    fetchMyself,
  }, dispatch),
)(OfferSidebar);
