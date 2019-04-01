import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState, Fragment } from 'react';
import EntryCard from '../EntryCard';
import styles from '../List/styles.css';
import EntryListPopup, { entryListPopupPropTypes } from '../EntryListPopup';

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

const EntryList = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);

  if (!props.data.length) {
    return null;
  }

  const visibleItems = props.data.slice(0, props.limit);

  return (
    <Fragment>
      {visibleItems.map(item => <EntryItem key={item.id} {...{ ...item }} />)}

      {(props.showViewMore || props.data.length > props.limit) &&
        <div className={styles.more}>
          <span
            role="presentation"
            className={styles.moreLink}
            onClick={() => {
              setPopupVisible(true);
              if (props.onClickViewAll) {
                props.onClickViewAll();
              }
            }}
          >
            View All
          </span>
        </div>
      }

      {popupVisible &&
        <EntryListPopup
          title={props.title}
          data={props.popupData || props.data}
          onClickClose={() => setPopupVisible(false)}
          metadata={props.popupMetadata}
          onChangePage={props.onChangePage}
        />
      }
    </Fragment>
  );
};

export const entryListPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(entryItemProps)),
  limit: PropTypes.number,
  title: PropTypes.string.isRequired,
  onChangePage: PropTypes.func,
  popupData: PropTypes.arrayOf(PropTypes.shape(entryItemProps)),
  popupMetadata: entryListPopupPropTypes.metadata,
  onClickViewAll: PropTypes.func,
  showViewMore: PropTypes.bool,
};

EntryList.propTypes = entryListPropTypes;

EntryList.defaultProps = {
  data: [],
  limit: 3,
  onChangePage: null,
  popupData: undefined,
  popupMetadata: undefined,
  showViewMore: undefined,
  onClickViewAll: undefined,
};

export default connect(state => ({
  users: state.users,
}))(EntryList);
