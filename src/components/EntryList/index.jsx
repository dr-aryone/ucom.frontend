import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState, Fragment } from 'react';
// import UserListPopup from './UserListPopup';
// import UserListPopupMore from './UserListPopupMore';
// import urls from '../../utils/urls';
// import { getUsersByIds } from '../../store/users';
import EntryCard from '../EntryCard';
// import Popup from '../Popup';
// import ModalContent from '../ModalContent';
// import { getUserName } from '../../utils/user';
import styles from '../List/styles.css';
import EntryListPopup from '../EntryListPopup';

// TODO: Replace and remove all another list
const EntryItem = (props) => {
  const LinkTag = props.isExternal ? 'a' : Link;

  return (
    <LinkTag
      key={props.id}
      to={props.url}
      href={props.url}
      className={styles.item}
      target={props.isExternal ? '_blank' : undefined}
    >
      <EntryCard disabledLink {...{ ...props }} />
    </LinkTag>
  );
};

const EntryList = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);

  if (!props.data.length) {
    return null;
  }

  const visibleItems = props.data.slice(0, props.limit);

  return (
    <Fragment>
      {visibleItems.map(item => <EntryItem key={item.id} {...{ ...item }} />)}

      {props.data.length > props.limit &&
        <div className={styles.more}>
          <span
            role="presentation"
            className={styles.moreLink}
            onClick={() => {
              setPopupVisible(true);
              // if (props.loadMore) {
              //   props.loadMore();
              // }
            }}
          >
            View All
          </span>
        </div>
      }

      {popupVisible &&
        <EntryListPopup
          title={props.title}
          data={props.data}
          onClickClose={() => setPopupVisible(false)}
        />
      }


      {/* {popupVisible &&
        <Popup onClickClose={() => setPopupVisible(false)}>
          <ModalContent onClickClose={() => setPopupVisible(false)}>
            {props.tagTitle ? (
              <UserListPopupMore
                usersIds={props.usersIds}
                tagTitle={props.tagTitle}
              />
            ) : (
              <UserListPopup
                usersIds={props.usersIds}
              />
            )}
          </ModalContent>
        </Popup>
      } */}
    </Fragment>
  );
};

export const entryItemProps = {
  id: PropTypes.number.isRequired,
  organization: PropTypes.bool,
  avatarSrc: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  nickname: PropTypes.string,
  currentRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disableRate: PropTypes.bool,
  disableSign: PropTypes.bool,
  isExternal: PropTypes.bool,
  follow: PropTypes.bool,
};

EntryItem.propTypes = entryItemProps;
EntryItem.defaultProps = {
  organization: false,
  avatarSrc: null,
  url: null,
  nickname: null,
  currentRate: null,
  disableRate: false,
  disableSign: false,
  isExternal: false,
  follow: false,
};

EntryList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(entryItemProps)),
  limit: PropTypes.number,
  title: PropTypes.string.isRequired,

  // users: PropTypes.objectOf(PropTypes.any).isRequired,
  // limit: PropTypes.number,
  // loadMore: PropTypes.func,
  // tagTitle: PropTypes.string,
};

EntryList.defaultProps = {
  data: [],
  limit: 3,
  // usersIds: [],
  // limit: 5,
  // loadMore: null,
  // tagTitle: null,
};

export default connect(state => ({
  users: state.users,
}))(EntryList);
