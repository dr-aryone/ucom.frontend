import classNames from 'classnames';
import autosize from 'autosize';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import styles from './styles.css';
import UserPick from '../../UserPick/UserPick';
import Image from './Image';
import { COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST } from '../../../utils/comments';
import TributeWrapper from '../../TributeWrapper';
import IconEnter from '../../Icons/Enter';
import { isSubmitKey, isEscKey } from '../../../utils/keyboard';
import DropZone from '../../DropZone';
import IconClose from '../../Icons/Close';
import { getBase64FromFile } from '../../../utils/upload';
import IconClip from '../../Icons/Clip';
import api from '../../../api';

// TODO: Upload images

const Form = (props) => {
  const [message, setMessage] = useState(props.message);
  const [entityImages, setEntityImages] = useState(props.entityImages);
  const [base64Cover, setBase64Cover] = useState('');

  const textareaEl = useRef(null);

  const reset = () => {
    setMessage('');
    setBase64Cover('');

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

  useEffect(() => {
    autosize(textareaEl.current);

    return () => {
      autosize.destroy(textareaEl);
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
          <div className={styles.field}>
            <div className={styles.inputWrapper}>
              <TributeWrapper onChange={message => setMessage(message)}>
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

            <div className={styles.actions}>
              {base64Cover ? null : (
                <div className={styles.containerActions}>
                  <Fragment>
                    <label name="img" className={styles.clipComments}>
                      <IconClip />
                    </label>
                    <DropZone
                      className={styles.dropZoneComments}
                      multiple
                      nonDefaultclass
                      onDrop={(files) => {
                        getBase64FromFile(files[0]).then(async (base64Cover) => {
                          setBase64Cover(base64Cover);
                          const data = await api.uploadPostImage(files[0]);
                          const { url } = data.files[0];
                          setEntityImages({ gallery: [...entityImages.gallery, { url }] });
                        });
                      }}
                    />
                  </Fragment>
                </div>
              )}
              <div
                role="presentation"
                className={styles.action}
                onClick={submit}
              >
                <IconEnter />
              </div>
            </div>
          </div>

          {props.uploadEnabled && props.entityImages.gallery.length &&
            <div className={styles.images}>
              {props.entityImages.gallery.map(image => <Image key={image.url} src={image.url} />)}
            </div>
          }
        </div>
      </div>
      {base64Cover ? (
        <div className="cover cover_small">
          <div className="cover__inner">
            <div className="cover__remove">
              <button
                type="button"
                className="button-clean button-clean_close"
                onClick={() => {
                    setEntityImages('');
                    setBase64Cover('');
                }}
              >
                <IconClose />
              </button>
            </div>

            <img className="cover__img" src={base64Cover} alt="" />
          </div>
        </div>
        ) : null}
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
  uploadEnabled: PropTypes.bool,
  userImageUrl: PropTypes.string,
  userPageUrl: PropTypes.string,
  userName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  entityImages: PropTypes.objectOf(PropTypes.any),
};

Form.defaultProps = {
  flat: false,
  message: '',
  commentId: null,
  depth: 0,
  autoFocus: false,
  uploadEnabled: false,
  userImageUrl: null,
  userPageUrl: null,
  userName: null,
  onReset: null,
  entityImages: { gallery: [] },
};

export default Form;
