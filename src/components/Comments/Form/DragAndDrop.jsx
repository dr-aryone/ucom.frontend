import classNames from 'classnames';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import IconEnter from '../../Icons/Enter';
import DropZone from '../../DropZone';
import { uploadDropState } from '../../../utils/upload';
import IconClip from '../../Icons/Clip';

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
    const isFocus = props.textareaEl.current === document.activeElement;
    const isContain = props.fieldEl.current.contains(event.target);

    if (isContain) {
      setDropState(isDropOnForm);
    } else if (isFocus && !isContain) {
      setDropState(isDrop);
    }
  };

  const onDragLeave = (event) => {
    const isFocus = props.textareaEl.current === document.activeElement;
    // const outHtml = event.target === document.documentElement;
    const outHtml = (event.target === document.documentElement || !event.relatedTarget) && (event.screenX) === 0 && (event.screenY === 0);

    const isForm = props.formEl.current === event.target;
    if (isFocus && outHtml) {
      setDropState(notDrop);
    } else if (!isFocus && isForm && (tempDropState.current === isDropOnForm)) {
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
  const Parent = canDrop ? Fragment : 'div';

  return (
    <Parent {...canDrop ? {} : { className: styles.actions }}>
      <div
        className={classNames({
          [styles.drop]: canDrop,
          [styles.dropOnForm]: dropState === isDropOnForm,
          [styles.containerActions]: true,
        })}
      >
        <Fragment>
          <label name="img" className={styles.clipComments}>
            <IconClip />
          </label>
          {!props.base64Cover && (
            <DropZone
              className={styles.dropZoneComments}
              multiple
              onDrop={async (files) => {
                setDropState(notDrop);
                await props.onImage(files);
                }
              }
            />
            )}
          <div className={styles.dropText}>Drop image here</div>
        </Fragment>
      </div>
      <div
        role="presentation"
        className={styles.action}
        onClick={props.submit}
      >
        <IconEnter />
      </div>
    </Parent>
  );
};

DragAndDrop.propTypes = {
  submit: PropTypes.func.isRequired,
  onImage: PropTypes.func.isRequired,
};

export default DragAndDrop;
