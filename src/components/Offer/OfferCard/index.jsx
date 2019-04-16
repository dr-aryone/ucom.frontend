import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import { formatRate } from '../../../utils/rate';
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
import config from '../../../../package.json';

const OfferCard = (props) => {
  // const [btnFixed, setBtnFixed] = useState(false);
  // const [btnFixedActive, setBtnFixedActive] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const LinkTag = props.userUrl ? Link : 'div';
  const { conditions } = props;
  const month = new Date(props.startedAt).toLocaleString('en-us', { month: 'long' });
  const day = new Date(props.startedAt).getDate();

  // const checkSizeWindow = () => {
  //   if (window.scrollY > 485 && window.innerWidth < 414) {
  //     setBtnFixed(true);
  //     setTimeout(() => {
  //       setBtnFixedActive(true);
  //     }, 100);
  //   } else {
  //     setBtnFixed(false);
  //     setBtnFixedActive(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', checkSizeWindow);

  //   return () => {
  //     window.removeEventListener('scroll', checkSizeWindow);
  //   };
  // }, []);

  return (
    <Fragment>
      {popupVisible && (
        <Popup onClickClose={() => setPopupVisible(false)}>
          <ModalContent mod="airdrop" onClickClose={() => setPopupVisible(false)}>
            <UserListAirdrop users={props.users} title={props.title} metadata={props.metadata} onChangePage={props.onChangePage} />
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

        {props.rate !== undefined &&
          <div className={styles.rate}>{formatRate(props.rate)}°</div>
        }

        {props.title &&
          <h1 className={styles.title}>
            <div dangerouslySetInnerHTML={{ __html: sanitizePostTitle(props.title) }} />
          </h1>
        }

        {props.userName &&
          <div className={styles.username}>
            <div className={styles.author}>by</div>
            <LinkTag to={props.userUrl}>
              <Avatar
                src={props.userImageUrl}
                size="xmsmall"
              />
            </LinkTag>
            <LinkTag to={props.userUrl}><span className={styles.name}>{props.userName}</span></LinkTag>
          </div>
        }

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
            colorLight
            onClick={() => setPopupVisible(true)}
            users={(props.users).map(mapUserDataToFollowersProps)}
            title="Participants"
            count={+props.count}
          />
          {(((conditions && conditions.conditions.authGithub === false && conditions.conditions.followingDevExchange === false) || !props.cookie) || (conditions && conditions.airdropStatus !== 3 &&
          conditions.conditions.authGithub === false &&
          conditions.conditions.authMyself === false &&
          conditions.conditions.followingDevExchange === false) ||
          (conditions && conditions.conditions.authGithub === false &&
          conditions.conditions.authMyself === false)) &&
            <a
              className={classNames(
                `${styles.btn}`,
                {/* { [styles.btnFixed]: btnFixed === true },
                { [styles.btnFixedActive]: btnFixedActive === true }, */},
              )}
              href={config.gitHubAuthLink}
            >
              Get your score
            </a>
          }
          {((conditions && conditions.conditions.authGithub === true && conditions.conditions.authMyself === false) || props.cookie) && !props.token &&
            <div
              role="presentation"
              onClick={() => props.authShowPopup()}
              className={classNames(
                `${styles.btn}`,
                {/* { [styles.btnFixed]: btnFixed === true },
                { [styles.btnFixedActive]: btnFixedActive === true }, */ },
              )}
            >
              Sign up
            </div>
          }
          {((conditions && conditions.conditions.authGithub === true && conditions.conditions.authMyself === true) || (props.cookie && props.token)) &&
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
  conditions: PropTypes.shape({
    condition: PropTypes.objectOf(PropTypes.shape({
      authGithub: PropTypes.bool,
      authMyself: PropTypes.bool,
      followingDevExchange: PropTypes.bool,
    })),
  }),
  metadata: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    totalAmount: PropTypes.number,
  }).isRequired,
  onChangePage: PropTypes.func.isRequired,
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
  authShowPopup: PropTypes.func.isRequired,
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
  conditions: null,
};

export default connect(
  null,
  dispatch => ({
    authShowPopup: () => dispatch(authShowPopup()),
  }),
)(OfferCard);
