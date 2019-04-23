import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import DropZone from '../../../DropZone';
import { uploadDropState } from '../../../../utils/upload';

const DragAndDrop = (props) => {
  const { NOT_DROP, IS_DROP, IS_DROP_ON_FORM } = uploadDropState;
  const [dropState, _setDropState] = useState(NOT_DROP);

  const tempDropState = useRef(dropState);


  const setDropState = (x) => {
    if (tempDropState.current !== x) {
      tempDropState.current = x;
      _setDropState(x);
    }
  };

  const onDrag = (event) => {
    if (dropState) {
      console.log(dropState);
    }
    const isContain = props.fieldEl.current.contains(event.target);
    const isFocus = props.textareaEl.current === document.activeElement;

    if (isContain) {
      setDropState(IS_DROP_ON_FORM);
    } else if (isFocus || !isContain) {
      setDropState(IS_DROP);
    }
  };

  const onDragLeave = (event) => {
    const outHtml = (event.target === document.documentElement || !event.relatedTarget) && (event.screenX) === 0 && (event.screenY === 0);
    const isForm = props.formEl.current === event.target;

    if (outHtml) {
      setDropState(NOT_DROP);
    } else if (isForm && (tempDropState.current === IS_DROP_ON_FORM)) {
      setDropState(NOT_DROP);
    }
  };

  const onDropEnd = () => setDropState(NOT_DROP);

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

  const canDrop = dropState === IS_DROP || dropState === IS_DROP_ON_FORM;

  return (
    <div
      className={classNames({
      [styles.nonVisible]: true,
      [styles.drop]: canDrop,
      [styles.dropOnForm]: dropState === IS_DROP_ON_FORM,
    })}
    >
      <DropZone
        className={styles.dropZoneComments}
        multiple
        onDrop={async (files) => {
          setDropState(NOT_DROP);
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
