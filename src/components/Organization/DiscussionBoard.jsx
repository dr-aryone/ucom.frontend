import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import styles from './DiscussionBoard.css';
import urls from '../../utils/urls';
import TextInput from '../TextInput';
import CloseIcon from '../Icons/Close ';
import EnterIcon from '../Icons/Enter ';

const DiscussionBoard = () => {
  const [discussion, setDiscussions] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [discussionLink, setDiscussionLink] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.title}>Discussion Board </div>
      {!isAdd && !discussion.length &&
        <div>
          Nothing here yet. <span className={styles.accent} role="presentation" onClick={() => setIsAdd(true)}>Paste link</span> or create <Link target="_blank" className={styles.accent} to={urls.getNewPostUrl()}>new article</Link>.
        </div>
      }
      {isAdd &&
        <div className={styles.textinput}>
          <TextInput placeholder="Link to article" value={discussionLink} onChange={setDiscussionLink} />
          <div className="icon" role="presentation" onClick={() => setDiscussions([...discussion, discussionLink])}><EnterIcon /></div>
          <div className="icon" role="presentation" onClick={() => setIsAdd(false)}><CloseIcon /></div>
        </div>
      }
      {discussion.map((e, index) => <div key={index}>{e}</div>)}
    </div>
  );
};

export default DiscussionBoard;

