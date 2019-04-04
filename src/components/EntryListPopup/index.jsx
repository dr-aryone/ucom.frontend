import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import EntryCard, { entryCardPropTypes } from '../EntryCard';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import OrganizationFollowButton from '../Organization/OrganizationFollowButton';
import UserFollowButton from '../User/UserFollowButton';
import Pagination from '../Pagination/index';

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

        {props.metadata &&
          <Pagination
            {...props.metadata}
            onChange={props.onChangePage}
          />
        }
      </div>
    </ModalContent>
  </Popup>
);

export const entryListPopupItemPropTypes = {
  ...entryCardPropTypes,
  id: PropTypes.number.isRequired,
  follow: PropTypes.bool,
};

export const entryListPopupPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(entryListPopupItemPropTypes)),
  onClickClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  metadata: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
    totalAmount: PropTypes.number,
  }),
  onChangePage: PropTypes.func,
};

EntryListPopup.propTypes = entryListPopupPropTypes;

EntryListPopup.defaultProps = {
  data: [],
  metadata: null,
  onChangePage: null,
};

export default EntryListPopup;
