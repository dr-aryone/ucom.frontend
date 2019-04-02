import PropTypes from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { selectUser } from '../../../store/selectors/user';
import { getUserById } from '../../../store/users';
import { updateUser } from '../../../actions/users';
import IconEdit from '../../Icons/Edit';
import Form from './Form';
import styles from './styles.css';
import { userIsOwner } from '../../../utils/user';
import { sanitizeCommentText, checkMentionTag, checkHashTag } from '../../../utils/text';

export const PLACEHOLDER = 'What’s Ur Passion…';
export const STATUS_MAX_LENGTH = 130;

const UserStatus = (props) => {
  const [formVisibility, setFormVisibility] = useState(false);

  const showForm = () => {
    setFormVisibility(true);
  };

  const hideForm = () => {
    setFormVisibility(false);
  };

  const user = getUserById(props.users, props.userId);

  if (!user) {
    return null;
  }

  const moodMessage = user.moodMessage && user.moodMessage.trim();

  if (!moodMessage && !userIsOwner(user, props.owner)) {
    return null;
  }

  const dangerousInnerHTML = {
    __html: sanitizeCommentText(checkMentionTag(checkHashTag(moodMessage || PLACEHOLDER))),
  };

  return (
    <div className={styles.status}>
      {!userIsOwner(user, props.owner) ? (
        <div
          className={styles.message}
          dangerouslySetInnerHTML={dangerousInnerHTML}
        />
      ) : (
        <div
          role="presentation"
          className={classNames({
            [styles.message]: true,
            [styles.messageEditable]: true,
            [styles.messageEmpty]: !moodMessage,
          })}
          onClick={() => showForm()}

        >
          <span dangerouslySetInnerHTML={dangerousInnerHTML} />
          <span className={styles.editIcon}>
            <IconEdit />
          </span>
        </div>
      )}

      {formVisibility &&
        <Form
          moodMessage={moodMessage}
          onClickHide={() => hideForm()}
          onClickSave={moodMessage => props.updateUser({ moodMessage })}
        />
      }
    </div>
  );
};

UserStatus.propTypes = {
  updateUser: PropTypes.func.isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default connect(
  state => ({
    users: state.users,
    owner: selectUser(state),
  }),
  dispatch => bindActionCreators({
    updateUser,
  }, dispatch),
)(UserStatus);
