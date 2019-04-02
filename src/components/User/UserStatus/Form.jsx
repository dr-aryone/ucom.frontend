import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Button from '../../Button';
import styles from './styles.css';
import TextareaAutosize from '../../TextareaAutosize';
import { PLACEHOLDER, STATUS_MAX_LENGTH } from './index';
import { isSubmitKey, isEscKey } from '../../../utils/keyboard';
import { getClosest } from '../../../utils/dom';

const UserStatusForm = (props) => {
  let element;
  const [moodMessage, setMoodMessage] = useState(props.moodMessage || '');

  const hideFormOnClick = (e) => {
    if (!element) {
      return;
    }

    if (!element.contains(e.target) && !getClosest(e.target, '.tribute-container')) {
      props.onClickHide();
    }
  };

  useEffect(() => {
    document.addEventListener('click', hideFormOnClick);

    return () => {
      document.removeEventListener('click', hideFormOnClick);
    };
  });

  const save = () => {
    props.onClickSave(moodMessage);
    props.onClickHide();
  };

  return (
    <div className={styles.form} ref={(el) => { element = el; }}>
      <TextareaAutosize
        autoFocus
        rows="2"
        className={styles.textarea}
        placeholder={PLACEHOLDER}
        maxLength={STATUS_MAX_LENGTH}
        value={moodMessage}
        onChange={e => setMoodMessage(e.target.value)}
        onChangeValue={e => setMoodMessage(e)}
        onKeyDown={(e) => {
          if (isEscKey(e)) {
            props.onClickHide();
          }

          if (isSubmitKey(e)) {
            save();
          }
        }}
      />

      <div className={styles.actions}>
        <Button
          text="Save"
          size="small"
          theme="transparent"
          onClick={() => save()}
        />

        <div className={styles.counter}>
          {moodMessage.length}/{STATUS_MAX_LENGTH}
        </div>
      </div>
    </div>
  );
};

UserStatusForm.propTypes = {
  moodMessage: PropTypes.string,
  onClickHide: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
};

UserStatusForm.defaultProps = {
  moodMessage: null,
};

export default UserStatusForm;
