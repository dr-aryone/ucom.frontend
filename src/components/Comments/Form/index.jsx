import classNames from 'classnames';
import autosize from 'autosize';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.css';
import UserPick from '../../UserPick/UserPick';
import Image from './Image';
import DragAndDrop from '../../DragAndDrop';
import { COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST } from '../../../utils/comments';
import TributeWrapper from '../../TributeWrapper';
import { isSubmitKey, isEscKey } from '../../../utils/keyboard';
import { getGalleryImage } from '../../../utils/entityImages';
import { initDragAndDropListeners } from '../../../utils/dragAndDrop';
import api from '../../../api';
import DropZone from '../../DropZone';
import IconClip from '../../Icons/Clip';
import IconEnter from '../../Icons/Enter';

const Form = (props) => {
  const [message, setMessage] = useState(props.message);
  const [entityImages, setEntityImages] = useState({ gallery: [] });
  const [dropOnForm, setDropOnForm] = useState(false);
  const fieldEl = useRef(null);
  const textareaEl = useRef(null);

  const reset = () => {
    setMessage('');
    setEntityImages({ gallery: [] });

    if (props.onReset) {
      props.onReset();
    }
  };

  const submit = () => {
    if (message.trim().length || (entityImages.gallery[0] && entityImages.gallery[0].url)) {
      props.onSubmit({
        containerId: props.containerId,
        postId: props.postId,
        commentId: props.commentId,
        message,
        entityImages: JSON.stringify(entityImages),
      });
      reset();
    }
  };

  const onImage = async (files) => {
    const data = await api.uploadPostImage(files);
    const { url } = data.files[0];
    // TODO: make multiple upon creating gallery
    // setEntityImages({ gallery: [...entityImages.gallery, { url }] });
    setEntityImages({ gallery: [{ url }] });
  };

  useEffect(() => {
    autosize(textareaEl.current);

    const removeInitDragAndDropListeners = initDragAndDropListeners(fieldEl.current, () => {
      setDropOnForm(true);
    }, () => {
      setDropOnForm(false);
    });

    return () => {
      autosize.destroy(textareaEl);
      removeInitDragAndDropListeners();
    };
  }, []);

  useEffect(() => {
    autosize.update(textareaEl.current);
  }, [message]);

  return (
    <div
      className={classNames({
        [styles.form]: true,
        [styles.flat]: props.flat,
      })}
      depth={props.depth}
    >
      <div className={styles.formMain}>
        <div className={styles.userPick}>
          <UserPick src={props.userImageUrl} url={props.userPageUrl} alt={props.userName} />
        </div>

        <div className={styles.content}>
          <div
            ref={fieldEl}
            className={styles.field}
          >
            <div className={styles.inputWrapper}>
              <TributeWrapper
                enabledImgUrlParse
                onParseImgUrl={(url) => {
                    setEntityImages({ gallery: [{ url }] });
                  }
                }
                onChange={(message) => {
                  setMessage(message);
                  setTimeout(() => autosize.update(textareaEl.current), 0);
                }}
                onImage={e => onImage([e])}
              >
                <textarea
                  ref={textareaEl}
                  autoFocus={props.autoFocus}
                  rows="1"
                  className={styles.input}
                  placeholder="Leave a comment..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (isSubmitKey(e)) {
                      submit();
                    } else if (isEscKey(e)) {
                      reset();
                    }
                  }}
                />
              </TributeWrapper>
            </div>
            <div
              className={styles.containerActions}
            >
              <label name="img" className={styles.label}>
                <IconClip />
                <DropZone
                  className={styles.labelFile}
                  multiple
                  onDrop={async (files) => {
                    await onImage(files[0]);
                  }
                }
                />
              </label>

              <div
                role="presentation"
                className={styles.action}
                onClick={submit}
              >
                <IconEnter />
              </div>
            </div>
            <DragAndDrop {...{
                onImage, dropOnForm,
              }}
            />
          </div>
        </div>
      </div>

      {getGalleryImage({ entityImages }) &&
        <Image
          src={getGalleryImage({ entityImages })}
          onClickRemove={() => {
            setEntityImages('');
          }}
        />
      }
    </div>
  );
};

Form.propTypes = {
  flat: PropTypes.bool,
  message: PropTypes.string,
  containerId: PropTypes.oneOf([COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST]).isRequired,
  postId: PropTypes.number.isRequired,
  commentId: PropTypes.number,
  depth: PropTypes.number,
  autoFocus: PropTypes.bool,
  userImageUrl: PropTypes.string,
  userPageUrl: PropTypes.string,
  userName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  entityImages: PropTypes.shape({
    gallery: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })),
  }),
};

Form.defaultProps = {
  flat: false,
  message: '',
  commentId: null,
  depth: 0,
  autoFocus: false,
  userImageUrl: null,
  userPageUrl: null,
  userName: null,
  onReset: null,
  entityImages: { gallery: [] },
};

export default Form;
