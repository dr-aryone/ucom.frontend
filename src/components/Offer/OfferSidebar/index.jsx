import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import classNames from 'classnames';
import Rate from '../../Rate';
import PostRating from '../../Rating/PostRating';
import One from '../../Icons/Airdrop/One';
import Two from '../../Icons/Airdrop/Two';
import Three from '../../Icons/Airdrop/Three';
import Done from '../../Icons/Airdrop/Done';
import DoneSmall from '../../Icons/Airdrop/DoneSmall';
import Dots from '../../Icons/Airdrop/Dots';
// import Error from '../../Icons/Airdrop/Error';
import IconShareCircle from '../../Icons/ShareCircle';
import ShareBlock from '../../ShareBlock';
import styles from './styles.css';
import { authShowPopup } from '../../../actions/auth';

const { AirdropStatuses } = require('ucom.libs.common').Airdrop.Dictionary;

const OfferSidebar = (props) => {
  const [sharePopup, toggleSharePopup] = useState(false);

  const toggleShare = () => {
    toggleSharePopup(!sharePopup);
  };

  if (!props.conditions) {
    return null;
  }

  const { conditions } = props;

  return (
    <Fragment>
      <div className={styles.rateVote}>
        <Rate className="rate_medium" value={props.rate} label="" />
        <PostRating postId={props.postId} />
      </div>
      {(conditions.airdropStatus === AirdropStatuses.PENDING || conditions.airdropStatus === AirdropStatuses.RECEIVED) &&
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
        </div>
      }

      <div className={styles.condition}>
        <div className={styles.conditionTitle}>How to Enter Airdrop:</div>
        <div className={styles.option}>
          <div className={styles.optionStatus}>{props.cookie || conditions.conditions.authGithub === true ? <Done /> : <One />}</div>
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
          <div className={styles.optionStatus}>{conditions.conditions.authMyself === true ? <Done /> : <Two />}</div>
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
          <div className={styles.optionStatus}>{conditions.conditions.followingDevExchange === true ? <Done /> : <Three />}</div>
          <div className={styles.optionBlock}>
            <a href="/communities/107" target="_blank" className={styles.optionTitle}>Join DevExchange</a>
            <div className={styles.optionText}>to see your Importance in action and talk to community members</div>
          </div>
        </div>
      </div>
      <div className={styles.created}>Created <span>{props.createdAt}</span></div>
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
              link={props.link}
              postId={props.postId}
              onClickClose={toggleShare}
              repostAvailable={props.repostAvailable}
            />
          </div>
        ) : null }
      </div>
    </Fragment>
  );
};

OfferSidebar.propTypes = {
  conditions: PropTypes.objectOf(PropTypes.any),
  authShowPopup: PropTypes.func,
  rate: PropTypes.number,
  postId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  repostAvailable: PropTypes.bool,
  cookie: PropTypes.string,
};

OfferSidebar.defaultProps = {
  rate: 0,
  repostAvailable: false,
};

export default connect(
  null,
  dispatch => ({
    authShowPopup: () => dispatch(authShowPopup()),
  }),
)(OfferSidebar);
