import moment from 'moment';
import { connect } from 'react-redux';
import Comments from './index';
import { getCommentById, getCommentsByContainer } from '../../store/comments';
import { getUserById } from '../../store/users';
import urls from '../../utils/urls';
import { getUserName } from '../../utils/user';
import { getCommentsTree } from '../../utils/comments';
import { createComment, getPostComments, getCommentsOnComment } from '../../actions/comments';

export default connect(
  (state, props) => {
    const commentsData = getCommentsByContainer(state, props.containerId, props.postId);
    let comments = [];
    let metadata = {};

    if (commentsData) {
      comments = getCommentsTree(commentsData.commentIds
        .map(id => getCommentById(state.comments, id))
        .map(comment => ({
          id: comment.id,
          depth: comment.depth,
          text: comment.description,
          date: moment(comment.createdAt).fromNow(),
          userId: comment.userId,
          userAccountName: getUserById(state.users, comment.user).accountName,
          nextDepthTotalAmount: comment.metadata.nextDepthTotalAmount,
          parentId: comment.parentId || 0,
          path: comment.path,
          isNew: comment.isNew,
        })));

      ({ metadata } = commentsData);
    }

    return ({
      ...props,
      metadata,
      comments,
      ownerId: state.user.data.id,
      ownerImageUrl: urls.getFileUrl(state.user.data.avatarFilename),
      ownerPageUrl: urls.getUserUrl(state.user.data.id),
      ownerName: getUserName(state.user.data),
    });
  },

  dispatch => ({
    onSubmit: ({
      message,
      postId,
      commentId,
      containerId,
    }) => {
      dispatch(createComment({
        containerId,
        postId,
        commentId,
        data: {
          description: message,
        },
      }));
    },

    onClickShowNext: ({
      containerId,
      postId,
      page,
      perPage,
    }) => {
      dispatch(getPostComments({
        containerId,
        postId,
        page,
        perPage,
      }));
    },

    onClickShowReplies: ({
      containerId,
      postId,
      parentId,
      parentDepth,
      page,
      perPage,
    }) => {
      dispatch(getCommentsOnComment({
        containerId,
        commentableId: postId,
        parentId,
        parentDepth,
        page,
        perPage,
      }));
    },
  }),
)(Comments);
