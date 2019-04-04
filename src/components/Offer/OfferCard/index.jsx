import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import Rate from '../../Rate';
import styles from './styles.css';
import Avatar from '../../Avatar';
import { sanitizePostTitle } from '../../../utils/text';
import Countdown from '../../Countdown';
import Followers from '../../Followers';
import Popup from '../../Popup';
import ModalContent from '../../ModalContent';
import UserListAirdrop from '../../User/UsersListAirdrop';
import { mapUserDataToFollowersProps } from '../../../utils/user';

const OfferCard = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const LinkTag = props.userUrl ? Link : 'div';
  const { conditions } = props;

  return (
    <Fragment>
      {popupVisible && (
        <Popup onClickClose={() => setPopupVisible(false)}>
          <ModalContent mod="airdrop" onClickClose={() => setPopupVisible(false)}>
            <UserListAirdrop users={props.users} title={props.title} />
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
          <div className={styles.postCardCover}>
            <img className={styles.pic} src={props.coverUrl} alt="" />
          </div>
        ) : (
          <div className={styles.media} />
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
            // airDrop
            onClick={() => setPopupVisible(true)}
            users={(props.users).map(mapUserDataToFollowersProps)}
            // users={props.usersIds}
            title="Participants"
            count={props.count}
          />
          {conditions && conditions.conditions.authGithub === false &&
            <a
              className={styles.btn}
              href="https://github.com/login/oauth/authorize/?client_id=ec17c7e5b1f383034c25&state=5idkWlsZKzbpcD7u&redirect_uri=https://staging-backend.u.community/api/v1/github/auth_callback?redirect_uri=https://staging.u.community/?mock_external_id=true"
            >
              Get your score
            </a>
          }
          {conditions && conditions.conditions.authGithub === true && conditions.conditions.authMyself === false &&
            <div
              role="presentation"
              // onClick={() => props.authShowPopup()}
              className={styles.btn}
            >
              Sign up
            </div>
          }
          {conditions && conditions.conditions.authGithub === true && conditions.conditions.authMyself === true &&
            <div
              className={classNames(
                `${styles.btn}`,
                `${styles.result}`,
              )}
            >
              See Results
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
};

OfferCard.propTypes = {
  conditions: PropTypes.objectOf(PropTypes.any),
  users: PropTypes.arrayOf(PropTypes.any).isRequired,
  userUrl: PropTypes.string.isRequired,
  finishedAt: PropTypes.string.isRequired,
  coverUrl: PropTypes.string,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string.isRequired,
  userImageUrl: PropTypes.string,
  userName: PropTypes.string.isRequired,
  count: PropTypes.number,
};

OfferCard.defaultProps = {
  count: 0,
  coverUrl: null,
  userImageUrl: null,
  rate: 0,
};

export default OfferCard;
