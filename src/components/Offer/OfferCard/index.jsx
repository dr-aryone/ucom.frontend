import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment, useState, useEffect } from 'react';
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
import { authShowPopup } from '../../../actions/auth';

const OfferCard = (props) => {
  const [btnFixed, setBtnFixed] = useState(false);
  const [btnFixedActive, setBtnFixedActive] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const LinkTag = props.userUrl ? Link : 'div';
  const { conditions } = props;
  const month = new Date(props.startedAt).toLocaleString('en-us', { month: 'long' });
  const day = new Date(props.startedAt).getDate();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 485 && window.innerWidth < 414) {
        setBtnFixed(true);
        setTimeout(() => {
          setBtnFixedActive(true);
        }, 100);
      } else {
        setBtnFixed(false);
        setBtnFixedActive(false);
      }
    });
  }, []);

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
            {Date.parse(new Date(props.startedAt)) - Date.parse(new Date()) > 0 ? (
              <div className={styles.startedAt}>
                <div className={styles.startedAtTitle}>Starts</div>
                <div className={styles.startedAtDate}>{`${month}, ${day}`}</div>
              </div>
            ) : (
              <Countdown date={props.finishedAt} />
            )}
          </div>
          <Followers
            onClick={() => setPopupVisible(true)}
            users={(props.users).map(mapUserDataToFollowersProps)}
            title="Participants"
            count={props.count}
          />
          {((conditions && conditions.conditions.authGithub === false) || !props.cookie) &&
            <a
              className={classNames(
                `${styles.btn}`,
                { [styles.btnFixed]: btnFixed === true },
                { [styles.btnFixedActive]: btnFixedActive === true },
              )}
              href="https://github.com/login/oauth/authorize/?client_id=ec17c7e5b1f383034c25&state=5idkWlsZKzbpcD7u&redirect_uri=https://staging-backend.u.community/api/v1/github/auth_callback?redirect_uri=https://staging.u.community/posts/14317?mock_external_id=true"
            >
              Get your score
            </a>
          }
          {conditions && conditions.conditions.authGithub === true && conditions.conditions.authMyself === false &&
            <div
              role="presentation"
              onClick={() => props.authShowPopup()}
              className={classNames(
                `${styles.btn}`,
                { [styles.btnFixed]: btnFixed === true },
                { [styles.btnFixedActive]: btnFixedActive === true },
              )}
            >
              Sign up
            </div>
          }
          {(conditions && conditions.conditions.authGithub === true && conditions.conditions.authMyself === true) &&
            <div
              role="presentation"
              className={classNames(
                `${styles.btn}`,
                `${styles.result}`,
              )}
              onClick={() => setPopupVisible(true)}
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
  startedAt: PropTypes.string.isRequired,
  coverUrl: PropTypes.string,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string.isRequired,
  userImageUrl: PropTypes.string,
  userName: PropTypes.string.isRequired,
  count: PropTypes.number,
  authShowPopup: PropTypes.func,
  cookie: PropTypes.string,
  token: PropTypes.string,
};

OfferCard.defaultProps = {
  count: 0,
  coverUrl: null,
  userImageUrl: null,
  rate: 0,
  cookie: '',
  token: '',
};

export default connect(
  null,
  dispatch => ({
    authShowPopup: () => dispatch(authShowPopup()),
  }),
)(OfferCard);
