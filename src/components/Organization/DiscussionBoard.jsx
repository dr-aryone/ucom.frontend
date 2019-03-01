import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import styles from './DiscussionBoard.css';
import urls from '../../utils/urls';
import { copyToClipboard } from '../../utils/text';
import TextInput from '../TextInput';
import CloseIcon from '../Icons/Close';
import EnterIcon from '../Icons/Enter';
import EllipsisIcon from '../Icons/Ellipsis';
import CommentIcon from '../Icons/Comment';
import { setApiDiscussions } from '../../actions/organization';
import { getOrganization, addOrganizations } from '../../actions/organizations';
import api from '../../api';

const DiscussionBoard = ({
  isCurrentUser, organizationId, apiDiscussions, setApiDiscussions, getOrganization, organization, addOrganizations,
}) => {
  const [discussion, setDiscussions] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [ellipsisVisibility, setEllipsisVisibility] = useState(false);
  const [discussionLink, setDiscussionLink] = useState('');
  const [error, setError] = useState('');

  const SortableItem = SortableElement(({ item, myIndex }) => {
    const [ellipsisItemVisibility, setEllipsisItemVisibility] = useState(false);
    const ellipsisClassItemName = cx(styles.ellipsis, {
      [styles.visibleEllipsis]: ellipsisItemVisibility,
    });

    return (
      <div>
        <div className={styles.item}>
          <div className={styles.itemContainer}>
            <div className={styles.itemMain}>
              <Link target="_blank" to={`/posts/${item.id}`} className={styles.caption}>{item.title}</Link>
              <Link target="_blank" to={`/user/${item.userId}`} className={styles.author}>{item.user.firstName || item.user.accountТame}</Link>
            </div>
            <div className={styles.itemSide}>
              <div className={styles.comment}>{item.commentsCount}</div>
              <div className={styles.commentIcon}><CommentIcon dimension="10" /></div>
              <Tooltip
                html={(
                  <div className={styles.tooltip}>
                    {isCurrentUser &&
                    <span
                      className={styles.tooltipText}
                      role="presentation"
                      onClick={() => onRemove(myIndex) // eslint-disable-line
                    }
                    >Remove
                    </span>}
                    <span
                      className={styles.tooltipText}
                      role="presentation"
                      onClick={() => copyToClipboard(`${document.location.origin}/posts/${item.id}`)}
                    >Copy Link
                    </span>
                  </div>
              )}
                position="bottom"
                trigger="click"
                useContext
                theme="discussion"
                arrow
                interactive
                onShow={() => setEllipsisItemVisibility(true)}
                onHide={() => setEllipsisItemVisibility(false)}
              >
                <div className={ellipsisClassItemName}><EllipsisIcon /></div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>);
  });

  const SortableList = SortableContainer(({ items }) => (
    <div className={`${styles.list} ${isCurrentUser ? '' : styles.notCursor}`} >
      {items.map((item, index) => (
        <SortableItem disabled={!isCurrentUser} key={`item-${index}`} myIndex={index} index={index} item={item} />
      ))}
    </div>
  ));

  const setMyApiDiscussions = async (discussion) => {
    await setApiDiscussions({ organizationId, payload: { discussions: discussion.map(e => ({ id: e })) } });
    await getOrganization(organizationId);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    addOrganizations([{ ...organization, discussions: arrayMove(apiDiscussions.slice(), oldIndex, newIndex) }]);
    setMyApiDiscussions(arrayMove(discussion.slice(), oldIndex, newIndex));
  };

  const onRemove = (myIndex) => {
    setMyApiDiscussions(discussion.filter((e, index) => index !== myIndex));
  };

  const onAddLink = async () => {
    const { origin } = document.location;
    let url;
    let pathnames;
    let postId;
    try {
      url = new URL(discussionLink);
      pathnames = url.pathname.split('/');
      postId = pathnames[2]; // eslint-disable-line
    } catch (e) {
      return setError(`Incorrect link. Format: ${origin}/posts/1`);
    }

    if (!(origin === url.origin && pathnames.length === 3 && pathnames[1] === 'posts' && Number.isInteger(+postId))) {
      return setError(`Incorrect link. Format: ${origin}/posts/1`);
    } else if (discussion.some(e => e === +postId)) {
      return setError('All discussions must be unique.');
    } else if (discussion.length === 10) {
      return setError('Organization has maximum allowed amount of discussions: 10');
    }

    try {
      await api.validateDiscussionsPostId(organizationId, postId);
    } catch (e) {
      return setError(e.response.data.errors);
    }
    await setMyApiDiscussions([...discussion, postId]);
    setDiscussionLink('');
    setError('');

    return setIsAdd(false);
  };

  const resetError = () => {
    setIsAdd(false);
    setDiscussionLink('');
    setError('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAddLink();
    } else if (e.key === 'Escape') {
      resetError();
    }
  };

  useEffect(() => {
    if (isAdd) {
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }
    return null;
  });

  useEffect(() => {
    setIsAdd(false);
  }, [organizationId]);

  useEffect(() => {
    setDiscussions(apiDiscussions.map(e => e.id));
  }, [apiDiscussions]);

  const ellipsisClassName = cx(styles.ellipsis, {
    [styles.visibleEllipsis]: ellipsisVisibility,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>Discussion Board
        {apiDiscussions.length && isCurrentUser ?
          <Tooltip
            html={(
              <div className={styles.tooltip}>
                <Link target="_blank" className={styles.tooltipText} to={urls.getNewPostUrl()}>Create and add Article</Link>
                <span className={styles.tooltipText} role="presentation" onClick={() => setIsAdd(true)}>Add Article</span>
              </div>
            )}
            position="bottom"
            trigger="click"
            useContext
            theme="discussion"
            arrow
            interactive
            onShow={() => setEllipsisVisibility(true)}
            onHide={() => setEllipsisVisibility(false)}
          >
            <div className={ellipsisClassName}><EllipsisIcon /></div>
          </Tooltip> : null
        }
      </div>
      {!isAdd && !apiDiscussions.length && isCurrentUser &&
        <div className={styles.initial}>
          Nothing here yet. <span className={styles.accent} role="presentation" onClick={() => setIsAdd(true)}>Paste link</span> or create <Link target="_blank" className={styles.accent} to={urls.getNewPostUrl()}>new article</Link>.
        </div>
      }
      {isAdd &&
        <div className={styles.textinput}>
          <TextInput error={error} placeholder="Link to article" value={discussionLink} onChange={setDiscussionLink} />
          <div className={styles.icon} role="presentation" onClick={onAddLink}><EnterIcon /></div>
          <div className={`${styles.icon} ${styles.close}`} role="presentation" onClick={resetError}><CloseIcon /></div>
        </div>
      }
      <SortableList pressDelay={150} helperClass={styles.itemDragged} items={apiDiscussions} onSortEnd={onSortEnd} />
    </div>
  );
};

export default connect(
  null,
  dispatch => bindActionCreators({
    setApiDiscussions,
    getOrganization,
    addOrganizations,
  }, dispatch),
)(DiscussionBoard);

