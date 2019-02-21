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
import { postsFetch } from '../../actions/posts';

const DiscussionBoard = () => {
  const [discussion, setDiscussions] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [ellipsisVisibility, setEllipsisVisibility] = useState(false);
  const [discussionLink, setDiscussionLink] = useState('');

  const SortableItem = SortableElement(({ value }) => <div className={styles.item}>{value}</div>);

  const SortableList = SortableContainer(({ items }) => (
    <div className={styles.list}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  ));

  const onSortEnd = ({ oldIndex, newIndex, items }) => {
    setDiscussions(arrayMove(items, oldIndex, newIndex));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      setDiscussions([...discussion, discussionLink]); setDiscussionLink(''); setIsAdd(false);
    } else if (e.key === 'Escape') {
      setIsAdd(false); setDiscussionLink('');
    }
  };

  // useEffect(() => {
  //   [15, 14175, 39].forEach(e => props.postsFetch(e));
  // }, []);


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
      {!isAdd && !discussion.length &&
        <div>
          Nothing here yet. <span className={styles.accent} role="presentation" onClick={() => setIsAdd(true)}>Paste link</span> or create <Link target="_blank" className={styles.accent} to={urls.getNewPostUrl()}>new article</Link>.
        </div>
      }
      {isAdd &&
        <div className={styles.textinput}>
          <TextInput placeholder="Link to article" value={discussionLink} onChange={setDiscussionLink} />
          <div className={styles.icon} role="presentation" onClick={() => { setDiscussions([...discussion, discussionLink]); setDiscussionLink(''); setIsAdd(false); }}><EnterIcon /></div>
          <div className={styles.icon} role="presentation" onClick={() => { setIsAdd(false); setDiscussionLink(''); }}><CloseIcon /></div>
        </div>
      }
      <SortableList helperClass={styles.itemDragged} items={discussion} onSortEnd={onSortEnd} />
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

