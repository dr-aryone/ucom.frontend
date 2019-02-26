import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { Tooltip } from 'react-tippy';
import styles from './DiscussionBoard.css';
import urls from '../../utils/urls';
import TextInput from '../TextInput';
import CloseIcon from '../Icons/Close';
import EnterIcon from '../Icons/Enter';
import EllipsisIcon from '../Icons/Ellipsis';
import CommentIcon from '../Icons/Comment';
import { postsFetch } from '../../actions/posts';

const DiscussionBoard = () => {
  const [discussion, setDiscussions] = useState([313, 322, 32644]);
  const [isAdd, setIsAdd] = useState(false);
  const [ellipsisVisibility, setEllipsisVisibility] = useState(false);
  const [discussionLink, setDiscussionLink] = useState('');
  const [error, setError] = useState('');

  const SortableItem = SortableElement(({ value, myIndex }) => {
    const [ellipsisItemVisibility, setEllipsisItemVisibility] = useState(false);
    const ellipsisClassItemName = cx(styles.ellipsis, {
      [styles.visibleEllipsis]: ellipsisItemVisibility,
    });
    console.log(value, myIndex);
    return (
      <div>
        <div className={styles.item}>
          <div className={styles.itemContainer}>
            <div className={styles.itemMain}>
              <Link target="_blank" to={`/posts/${value}`} className={styles.caption}>{value}</Link>
              <div className={styles.author}>{value}</div>
            </div>
            <div className={styles.itemSide}>
              <div className={styles.comment}>{value}</div>
              <div className={styles.commentIcon}><CommentIcon dimension="10" /></div>
              <Tooltip
                html={(
                  <div className={styles.tooltip}>
                    <span className={styles.tooltipText} role="presentation" onClick={() => setDiscussions(discussion.splice(myIndex, 1))}>Remove</span>
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
    <div className={styles.list}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} myIndex={index} index={index} value={value} />
      ))}
    </div>
  ));

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setDiscussions(arrayMove(discussion.slice(), oldIndex, newIndex));
  };


  const onAddLink = () => {
    const { origin } = document.location;
    let url;
    let pathnames;

    try {
      url = new URL(discussionLink);
      pathnames = url.pathname.split('/');
    } catch (e) {
      return setError(`Incorrect link. Format: ${origin}/posts/1`);
    }

    if (origin === url.origin && pathnames.length === 3 && pathnames[1] === 'posts' && Number.isInteger(+pathnames[2])) {
      setDiscussions([...discussion, pathnames[2]]);
      setDiscussionLink('');
      return setIsAdd(false);
    }

    return setError(`Incorrect link. Format: ${origin}/posts/1`);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAddLink();
    } else if (e.key === 'Escape') {
      setIsAdd(false); setDiscussionLink('');
    }
  };

  useEffect(() => {
    if (isAdd) {
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }
    return null;
  });

  const ellipsisClassName = cx(styles.ellipsis, {
    [styles.visibleEllipsis]: ellipsisVisibility,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>Discussion Board
        {discussion.length ?
          <Tooltip
            html={(
              <div className={styles.tooltip}>
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
      {!isAdd && !discussion.length &&
        <div>
          Nothing here yet. <span className={styles.accent} role="presentation" onClick={() => setIsAdd(true)}>Paste link</span> or create <Link target="_blank" className={styles.accent} to={urls.getNewPostUrl()}>new article</Link>.
        </div>
      }
      {isAdd &&
        <div className={styles.textinput}>
          <TextInput error={error} placeholder="Link to article" value={discussionLink} onChange={setDiscussionLink} />
          <div className={styles.icon} role="presentation" onClick={onAddLink}><EnterIcon /></div>
          <div className={styles.icon} role="presentation" onClick={() => { setIsAdd(false); setDiscussionLink(''); }}><CloseIcon /></div>
        </div>
      }
      <SortableList pressDelay={150} helperClass={styles.itemDragged} items={discussion} onSortEnd={onSortEnd} />
    </div>
  );
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    postsFetch,
  }, dispatch),
)(DiscussionBoard);

