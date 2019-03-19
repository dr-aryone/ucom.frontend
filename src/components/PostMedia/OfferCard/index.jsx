import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import Rate from '../../Rate';
import styles from './styles.css';
import Avatar from '../../Avatar';
// import Eye from '../../Icons/Eye';
import { sanitizePostTitle } from '../../../utils/text';
import Countdown from '../../Countdown';

const PostCard = (props) => {
  const PostLink = props.url ? Link : 'span';
  const LinkTag = props.userUrl ? Link : 'div';

  return (
    <div
      className={classNames(
        `${styles.postCard}`,
        { [styles.postCardWithCover]: props.coverUrl && props.coverUrl.length > 0 },
      )}
    >
      {(props.coverUrl && props.coverUrl.length > 0) ? (
        <PostLink to={props.url} className={styles.postCardCover}>
          <img className={styles.pic} src={props.coverUrl} alt="" />
        </PostLink>
      ) : (
        <PostLink to={props.url} className={styles.media} />
      )}

      {props.rate !== undefined && (
        <div className={styles.rate}>
          <Rate value={+props.rate} label="" />
        </div>
      )}

      {props.title && (
        <h1 className={styles.title}>
          <div dangerouslySetInnerHTML={{ __html: sanitizePostTitle(props.title) }} />
        </h1>
      )}

      <Fragment>
        <div className={styles.infoblock}>
          <div className={styles.infoblockMain}>
            {props.userName && (
              <div className={styles.username}>
                <div className={styles.author}>by</div>
                <LinkTag to={props.userUrl}>
                  <Avatar
                    src={props.userImageUrl}
                    size="xmsmall"
                  />
                </LinkTag>
                <LinkTag to={props.userUrl}><div className={styles.name}>{props.userName}</div></LinkTag>
              </div>
            )}
            <div className={styles.infoblockBottom}>
              <div className={styles.timer}>
                <Countdown date="2019-05-15T11:43:34Z" />
              </div>
              <div className={styles.btn}>Get your Score</div>
            </div>
          </div>

          {/* <div className={styles.infoblockSide}>
            <Eye className={styles.eye} />
            <span className={styles.views}>1943</span>

          {props.commentsCount !== undefined && (
            <div className="inline__item">
              <div className={styles.shares}>
                <Rate value={props.commentsCount} dimension="" label="Comments" />
              </div>
            </div>
          )}
          </div>
          */}
        </div>
      </Fragment>
    </div>
  );
};

PostCard.propTypes = {
  url: PropTypes.string,
  coverUrl: PropTypes.string,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  userImageUrl: PropTypes.string,
  userName: PropTypes.string,
  // commentsCount: PropTypes.number,
  // sharesCount: PropTypes.number,
};

export default PostCard;
