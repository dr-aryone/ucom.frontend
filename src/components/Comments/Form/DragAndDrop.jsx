import classNames from 'classnames';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import IconEnter from '../../Icons/Enter';
import DropZone from '../../DropZone';
import { uploadDropState } from '../../../utils/upload';
import IconClip from '../../Icons/Clip';

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
    const isFocus = props.textareaEl.current === document.activeElement;
    const isContain = props.fieldEl.current.contains(event.target);

    if (isContain) {
      setDropState(IS_DROP_ON_FORM);
    } else if (isFocus && !isContain) {
      setDropState(IS_DROP);
    }
  };

  const onDragLeave = (event) => {
    const isFocus = props.textareaEl.current === document.activeElement;
    const outHtml = (event.target === document.documentElement || !event.relatedTarget) && (event.screenX) === 0 && (event.screenY === 0);

    const isForm = props.formEl.current === event.target;
    if (isFocus && outHtml) {
      setDropState(NOT_DROP);
    } else if (!isFocus && isForm && (tempDropState.current === IS_DROP_ON_FORM)) {
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
  const Parent = canDrop ? Fragment : 'div';

  return (
    <Parent {...canDrop ? {} : { className: styles.actions }}>
      <div
        className={classNames({
          [styles.drop]: canDrop,
          [styles.dropOnForm]: dropState === IS_DROP_ON_FORM,
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
                setDropState(NOT_DROP);
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
