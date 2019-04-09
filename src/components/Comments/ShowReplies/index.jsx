import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles.css';
import { COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST } from '../../../utils/comments';
import { getCommentsOnComment } from '../../../actions/comments';

const ShowReplies = props => (
  <div className={styles.showReplies} depth={props.depth}>
    <div className={styles.icon}>
      <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 0V7.21812H12M12 7.21812L8.5 4M12 7.21812L8.5 10.2062" stroke="#C4C4C4" />
      </svg>
    </div>
    <div
      role="presentation"
      className={styles.title}
      onClick={() => props.getCommentsOnComment({
        containerId: props.containerId,
        commentableId: props.postId,
        parentId: props.parentId,
        parentDepth: props.parentDepth,
        page: props.page,
      })}
    >
      Show {props.count} {props.showNext && 'next'} replies
    </div>
  </div>
);

ShowReplies.propTypes = {
  containerId: PropTypes.oneOf([COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST]).isRequired,
  depth: PropTypes.number,
  getCommentsOnComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  parentId: PropTypes.number.isRequired,
  parentDepth: PropTypes.number.isRequired,
  page: PropTypes.number,
  showNext: PropTypes.bool,
  count: PropTypes.number,
};

ShowReplies.defaultProps = {
  depth: 0,
  page: 1,
  count: null,
  showNext: false,
};

export default connect(
  null,
  dispatch => bindActionCreators({
    getCommentsOnComment,
  }, dispatch),
)(ShowReplies);
