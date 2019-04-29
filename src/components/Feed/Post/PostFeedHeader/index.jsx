import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import UserCard from '../../../UserCard/UserCard';
import DropdownMenu from '../../../DropdownMenu';
import urls from '../../../../utils/urls';
import { getPostById } from '../../../../store/posts';
import { addSuccessNotification } from '../../../../actions/notifications';
import styles from './styles.css';
import { POST_TYPE_MEDIA_ID, postIsEditable, POST_EDIT_TIME_LIMIT } from '../../../../utils/posts';
import { copyToClipboard } from '../../../../utils/text';

const PostFeedHeader = (props) => {
  const post = getPostById(props.posts, props.postId);

  if (!post) {
    return null;
  }

  const [leftTime, setLeftTime] = useState(0);
  const isEditable = postIsEditable(post.createdAt, POST_EDIT_TIME_LIMIT);
  const onClickDropdownButton = () => {
    setLeftTime(15 - moment().diff(post.createdAt, 'm'));
  };

  const items = [post.userId === props.userId ? {
    title: isEditable
      ? <span>Edit <span className={styles.leftTime}>({leftTime} {leftTime <= 1 ? 'minute' : 'minutes'} left)</span></span>
      : <span className={styles.limit}>Can only edit in first 15 min </span>,
    onClick: isEditable ? props.showForm : undefined,
    disabled: !isEditable,
  } : null,
  {
    title: 'Copy Link',
    onClick: () => {
      copyToClipboard(`${document.location.origin}${urls.getFeedPostUrl(post)}`);
      props.addSuccessNotification('Link copyed to clipboard');
    },
  }];

  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.info}>
          <Link to={urls.getFeedPostUrl(post)}>{props.createdAt}</Link>
          {props.formIsVisible && <span> | <span className={styles.edit}>Edit post</span></span>}
        </div>
        { !props.formIsVisible &&
          <div className={styles.dropdown}>
            <DropdownMenu
              onClickButton={onClickDropdownButton}
              items={items.filter(e => e)}
              position="bottom-end"
            />
          </div>
        }
      </div>

      {props.userId && POST_TYPE_MEDIA_ID !== props.postTypeId ? (
        <div className={styles.user}>
          <UserCard userId={post.userId} />
        </div>
      ) : null}
    </Fragment>
  );
};

PostFeedHeader.propTypes = {
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
  createdAt: PropTypes.string.isRequired,
  showForm: PropTypes.func,
  addSuccessNotification: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  formIsVisible: PropTypes.bool,
  userId: PropTypes.number,
  postTypeId: PropTypes.number,
};

PostFeedHeader.defaultProps = {
  userId: null,
  postTypeId: null,
  showForm: null,
  formIsVisible: false,
};

export default connect(state => ({
  posts: state.posts,
}), { addSuccessNotification })(PostFeedHeader);
