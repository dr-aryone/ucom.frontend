import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../../ProgressBar';
import { getPercent } from '../../../utils/text';
import Comments from '../../Comments/wrapper';
import { COMMENTS_CONTAINER_ID_POST } from '../../../utils/comments';
import styles from './styles.css';
import formatNumber from '../../../utils/formatNumber';

const { AirdropStatuses } = require('ucom.libs.common').Airdrop.Dictionary;

const OfferContent = props => (
  <Fragment>
    <Fragment>
      {props.score && props.score !== 0 && AirdropStatuses.NO_PARTICIPATION !== props.status ?
        <div className={styles.score}>Your GitHub score <span>{formatNumber(props.score.toFixed(2))}</span></div>
      : null}
      {AirdropStatuses.NO_PARTICIPATION === props.status ?
        <div className={styles.score}>
          Your have zero GitHub score
          <p className={styles.bannerTitle}>Build Your Reputation</p>
          <div className={styles.bannerText}>
            <p>Your GitHub account contributions have scored zero for the network.</p>
            <p>This is a good moment to start from scratch with your network reputation.</p>
            <p>You can start by joining <a className={styles.link} href="/communities/101">DevExchange</a> or <a className={styles.link} href="/overview/communities/filter/fresh"> any other community</a> and talking to people.</p>
          </div>
        </div>
      : null}
    </Fragment>
    <div className={styles.section}>
      <div className={styles.title}>GitHub Score</div>
      <div className={styles.text}>GitHub is a large network, tallying at over 28 million users. Most of the actions you do on this platform — from code commits to issue openings — are valuable. We estimated your account’s score, aka Importance in the GitHub community, based on your activity. You can get this score by signing in with your Github account.</div>
    </div>
    <div className={styles.section}>
      <div className={styles.title}>Tokens Airdrop</div>
      <div className={styles.text}>You can register your GitHub account&apos;s Importance on the U°OS network, using TestNet tokens, that are issued to you, proportionally to your GitHub account score. Your account and Importance score will be available to you and you only via the private key. Overall, there are two types of tokens — U°OS TestNet tokens and U°OS Futures. U°OS TestNet tokens are used to register your Importance on U°OS, while U°OS Futures can be directly exchanged to the U°OS MainNet tokens. An additional pool of MainNet U°OS tokens will be distributed to all accounts, proportionally to their Importance at the start of MainNet.</div>
      {props.tokens &&
        <Fragment>
          <div className={styles.progress}>
            <div className={styles.tokenLeft}>UOS Left {formatNumber(props.tokens[0].amountLeft)}</div>
            <div className={styles.tokenTotal}>from {formatNumber(props.tokens[0].amountClaim)}</div>
          </div>
          <ProgressBar
            className={styles.filler}
            percentage={Number(getPercent(props.tokens[0].amountLeft, props.tokens[0].amountClaim))}
          />

          <div className={styles.progress}>
            <div className={styles.tokenLeft}>UOS.Futures Left {formatNumber(props.tokens[1].amountLeft)}</div>
            <div className={styles.tokenTotal}>from {formatNumber(props.tokens[1].amountClaim)}</div>
          </div>
          <ProgressBar
            className={styles.filler}
            percentage={Number(getPercent(props.tokens[1].amountLeft, props.tokens[1].amountClaim))}
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

    <div className={styles.commentsCount}>Comments {props.commentsCount !== 0 ? props.commentsCount : ''}</div>
    <div className="post-body__comments">
      <Comments postId={props.postId} containerId={COMMENTS_CONTAINER_ID_POST} />
    </div>
  </Fragment>
);

OfferContent.defaultProps = {
  commentsCount: 0,
  score: 0,
  status: 1,
};

OfferContent.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.any),
  status: PropTypes.number,
  score: PropTypes.number,
  postId: PropTypes.number.isRequired,
  commentsCount: PropTypes.number,
};

export default OfferContent;
