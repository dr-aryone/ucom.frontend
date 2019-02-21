import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import styles from './styles.css';
import UserCard from '../../UserCard/UserCard';
import Gallery from '../../Gallery';
import Form from '../Form';
import ShowReplies from '../ShowReplies';
import CommentRating from '../../Rating/CommentRating';
import { COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST } from '../../../utils/comments';
import { sanitizeCommentText, checkMentionTag } from '../../../utils/text';

const Comment = (props) => {
  const [formVisible, setFormVisible] = useState(false);
  const newReplys = props.replys.filter(i => i.isNew);
  const replys = props.replys.filter(i => newReplys.every(j => j.id !== i.id));

  return (
    <Fragment>
      <div className={styles.comment} depth={props.depth} id={`comment-${props.id}`}>
        <div className={styles.userCard}>
          <UserCard
            userId={props.userId}
            isOwner={props.ownerId === props.userId}
          />
        </div>
        <div className={styles.content}>
          {props.images.length > 0 &&
            <div className={styles.gallery}>
              <Gallery
                images={props.images}
                userId={props.userId}
                date={props.date}
              />
            </div>
          }

          <div
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: sanitizeCommentText(checkMentionTag(props.text)),
            }}
          />

          <div className={styles.actions}>
            <div
              role="presentation"
              className={styles.reply}
              onClick={() => {
                if (props.depth < 2) {
                  setFormVisible(true);
                } else if (props.onClickReply) {
                  props.onClickReply();
                }
              }}
            >
              Reply
            </div>
            <div className={styles.date}>{props.date}</div>
            <div className={styles.rating}>
              <CommentRating commentId={props.id} />
            </div>
          </div>
        </div>
      </div>

      {replys.map(comment => (
        <Comment
          containerId={props.containerId}
          key={comment.id}
          postId={props.postId}
          id={comment.id}
          depth={comment.depth}
          text={comment.text}
          date={comment.date}
          userId={comment.userId}
          userAccountName={comment.userAccountName}
          replys={comment.replys}
          nextDepthTotalAmount={comment.nextDepthTotalAmount}
          metadata={props.metadata}
          ownerId={props.ownerId}
          ownerImageUrl={props.ownerImageUrl}
          ownerPageUrl={props.ownerPageUrl}
          ownerName={props.ownerName}
          onSubmit={props.onSubmit}
          onClickShowReplies={props.onClickShowReplies}
          onClickReply={() => {
            setFormVisible(true);
          }}
        />
      ))}

      {
        ((props.nextDepthTotalAmount > 0 && !props.metadata[props.id]) ||
        (props.metadata[props.id] && props.metadata[props.id].hasMore)) &&
        <ShowReplies
          containerId={props.containerId}
          postId={props.postId}
          parentId={props.id}
          parentDepth={props.depth}
          depth={props.depth}
          onClick={props.onClickShowReplies}
          page={props.metadata[props.id] ? props.metadata[props.id].page + 1 : 1}
        />
      }

      {newReplys.map(comment => (
        <Comment
          containerId={props.containerId}
          key={comment.id}
          postId={props.postId}
          id={comment.id}
          depth={comment.depth}
          text={comment.text}
          date={comment.date}
          userId={comment.userId}
          userAccountName={comment.userAccountName}
          replys={comment.replys}
          nextDepthTotalAmount={comment.nextDepthTotalAmount}
          metadata={props.metadata}
          ownerId={props.ownerId}
          ownerImageUrl={props.ownerImageUrl}
          ownerPageUrl={props.ownerPageUrl}
          ownerName={props.ownerName}
          onSubmit={props.onSubmit}
          onClickShowReplies={props.onClickShowReplies}
          onClickReply={() => {
            setFormVisible(true);
          }}
        />
      ))}

      {formVisible &&
        <Form
          message={`@${props.userAccountName} `}
          containerId={props.containerId}
          postId={props.postId}
          commentId={props.id}
          autoFocus
          depth={props.depth + 1}
          userImageUrl={props.ownerImageUrl}
          userPageUrl={props.ownerPageUrl}
          userName={props.ownerName}
          onSubmit={props.onSubmit}
          onReset={() => setFormVisible(false)}
        />
      }
    </Fragment>
  );
};

Comment.propTypes = {
  containerId: PropTypes.oneOf([COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST]).isRequired,
  id: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
  nextDepthTotalAmount: PropTypes.number,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  userAccountName: PropTypes.string.isRequired,
  ownerId: PropTypes.number,
  ownerImageUrl: PropTypes.string,
  ownerPageUrl: PropTypes.string,
  ownerName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClickShowReplies: PropTypes.func.isRequired,
  onClickReply: PropTypes.func,
  replys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    parentId: PropTypes.number.isRequired,
    isNew: PropTypes.bool.isRequired,
  })),
  metadata: PropTypes.objectOf(PropTypes.shape({
    hasMore: PropTypes.bool,
    page: PropTypes.number,
    perPage: PropTypes.number,
  })).isRequired,
};

Comment.defaultProps = {
  images: [],
  replys: [],
  ownerId: null,
  ownerImageUrl: null,
  ownerPageUrl: null,
  ownerName: null,
  nextDepthTotalAmount: 0,
  onClickReply: null,
};

export default Comment;
