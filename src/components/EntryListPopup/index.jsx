import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import EntryCard from '../EntryCard';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import OrganizationFollowButton from '../Organization/OrganizationFollowButton';
import UserFollowButton from '../User/UserFollowButton';

// TODO: Replace and remove another popups
const EntryListPopup = props => (
  <Popup onClickClose={props.onClickClose}>
    <ModalContent onClickClose={props.onClickClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>{props.title}</h2>
        <div className={styles.list}>
          {props.data.map(item => (
            <div key={item.id} className={styles.item}>
              <div className={styles.card}>
                <EntryCard {...{ ...item }} />
              </div>

              {item.follow && item.organization &&
                <div className={styles.action}>
                  <OrganizationFollowButton organizationId={+item.id} />
                </div>
              }

              {item.follow && !item.organization &&
                <div className={styles.action}>
                  <UserFollowButton userId={+item.id} />
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    </ModalContent>
  </Popup>
);

EntryListPopup.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    organization: PropTypes.bool,
    avatarSrc: PropTypes.string,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    currentRate: PropTypes.number,
    disableRate: PropTypes.bool,
    disableSign: PropTypes.bool,
    isExternal: PropTypes.bool,
    follow: PropTypes.bool,
  })),
  onClickClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

EntryListPopup.defaultProps = {
  data: [],
};

export default EntryListPopup;
