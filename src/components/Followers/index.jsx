import { withRouter } from 'react-router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useEffect, Fragment, memo } from 'react';
import UserPick from '../UserPick/UserPick';
import styles from './styles.css';
import EntryListPopup, { entryListPopupItemPropTypes, entryListPopupPropTypes } from '../EntryListPopup';

const Followers = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const hasUsers = () => props.users.length > 0;

  const showPopup = () => {
    if (props.onClick) {
      props.onClick();
      return;
    }

    if (hasUsers()) {
      setPopupVisible(true);
    }
  };

  useEffect(() => {
    setPopupVisible(false);
  }, [props.location]);

  const avatarUsers = props.users.slice(0, 2);

  return (
    <Fragment>
      {popupVisible &&
        <EntryListPopup
          title={props.title}
          data={props.users}
          metadata={props.metadata}
          onClickClose={() => setPopupVisible(false)}
          onChangePage={props.onChangePage}
        />
      }

      <div
        role="presentation"
        className={classNames({
          [styles.followers]: true,
          [styles.followersActive]: hasUsers(),
        })}
        onClick={() => showPopup()}
      >
        <div className={styles.info}>
          <div
            className={classNames(
              `${styles.count}`,
              { [styles.countLighter]: props.colorLight },
            )}
          >
            {props.count}
          </div>

          <div
            className={classNames(
              `${styles.title}`,
              { [styles.titleLighter]: props.colorLight },
            )}
          >
            {props.title}
          </div>
        </div>

        <div className={styles.avatars}>
          {avatarUsers.length === 2 &&
            <Fragment>
              <div className={styles.avatarSmall}>
                <UserPick shadow stretch src={avatarUsers[1].avatarSrc} />
              </div>
              <div className={styles.avatar}>
                <UserPick shadow stretch src={avatarUsers[0].avatarSrc} />
              </div>
            </Fragment>
          }
          {avatarUsers.length === 1 &&
            <div className={styles.avatar}>
              <UserPick shadow stretch src={avatarUsers[0].avatarSrc} />
            </div>
          }
          {avatarUsers.length === 0 &&
            <div className={styles.avatarEmpty} />
          }
        </div>
      </div>
    </Fragment>
  );
};

export const followersPropTypes = {
  title: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape(entryListPopupItemPropTypes)),
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  count: PropTypes.number,
  metadata: entryListPopupPropTypes.metadata,
  onChangePage: PropTypes.func,
  onClick: PropTypes.func,
  colorLight: PropTypes.bool,
};

Followers.propTypes = followersPropTypes;

Followers.defaultProps = {
  title: 'Followers',
  users: [],
  count: 0,
  metadata: null,
  onChangePage: null,
  onClick: null,
  colorLight: false,
};

export default memo(withRouter(Followers));
