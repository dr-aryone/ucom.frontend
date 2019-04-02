import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import Rate from '../../Rate';
import styles from './styles.css';
import Avatar from '../../Avatar';
import { sanitizePostTitle } from '../../../utils/text';
import Countdown from '../../Countdown';
import Followers from '../../Followers/Followers';
import Popup from '../../Popup';
import ModalContent from '../../ModalContent';
import UserListAirdrop from '../../User/UsersListAirdrop';

const OfferCard = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const PostLink = props.url ? Link : 'span';
  const LinkTag = props.userUrl ? Link : 'div';

  return (
    <Fragment>
      {popupVisible && (
        <Popup onClickClose={() => this.hidePopup()}>
          <ModalContent onClickClose={() => this.hidePopup()}>
            <UserListAirdrop title={this.props.title} />
          </ModalContent>
        </Popup>
      )}
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
            <Countdown date={props.finishedAt} />
          </div>
          <Followers
            airDrop
            onClick={() => setPopupVisible(true)}
            usersIds={props.usersIds}
            title="Participants"
          />
          <div className={classNames(
            `${styles.btn}`,
            // `${styles.result}`,
        )}>
            Get your Score
          </div>
        </div>
      </div>
    </Fragment>
  );
};

OfferCard.propTypes = {
  url: PropTypes.string,
  finishedAt: PropTypes.string,
  coverUrl: PropTypes.string,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  userImageUrl: PropTypes.string,
  userName: PropTypes.string,
};

export default OfferCard;
