import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import DropZone from '../../../DropZone';
import { uploadDropState } from '../../../../utils/upload';

const DragAndDrop = (props) => {
  const { notDrop, isDrop, isDropOnForm } = uploadDropState;
  const [dropState, _setDropState] = useState(notDrop);

  const tempDropState = useRef(dropState);


  const setDropState = (x) => {
    if (tempDropState.current !== x) {
      tempDropState.current = x;
      _setDropState(x);
    }
  };

  const onDrag = (event) => {
    const isContain = props.fieldEl.current.contains(event.target);
    const isFocus = props.textareaEl.current === document.activeElement;

    if (isContain) {
      setDropState(isDropOnForm);
    } else if (isFocus || !isContain) {
      setDropState(isDrop);
    }
  };

  const onDragLeave = (event) => {
    const outHtml = (event.target === document.documentElement || !event.relatedTarget) && (event.screenX) === 0 && (event.screenY === 0);
    const isForm = props.formEl.current === event.target;

    if (outHtml) {
      setDropState(notDrop);
    } else if (isForm && (tempDropState.current === isDropOnForm)) {
      setDropState(notDrop);
    }
  };

  const onDropEnd = () => setDropState(notDrop);

  useEffect(() => {
    document.addEventListener('dragenter', onDrag);
    document.addEventListener('dragleave', onDragLeave);
    document.addEventListener('drop', onDropEnd);

    return () => {
      document.removeEventListener('dragenter', onDrag);
      document.removeEventListener('dragleave', onDragLeave);
      document.removeEventListener('drop', onDropEnd);
    };
  }, []);

  const canDrop = dropState === isDrop || dropState === isDropOnForm;

  return (
    <div
      className={classNames({
      [styles.nonVisible]: true,
      [styles.drop]: canDrop,
      [styles.dropOnForm]: dropState === isDropOnForm,
    })}
    >
      <DropZone
        className={styles.dropZoneComments}
        multiple
        onDrop={async (files) => {
          setDropState(notDrop);
          await props.onImage(files[0]);
          }
        }
      />
      <div className={styles.dropText}>Drop image here</div>
    </div>
  );
};

DragAndDrop.propTypes = {
  onImage: PropTypes.func.isRequired,
};

export default DragAndDrop;
