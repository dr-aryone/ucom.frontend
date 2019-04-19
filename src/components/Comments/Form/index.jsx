import classNames from 'classnames';
import autosize from 'autosize';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.css';
import UserPick from '../../UserPick/UserPick';
import Image from './Image';
import DragAndDrop from './DragAndDrop';
import { COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST } from '../../../utils/comments';
import TributeWrapper from '../../TributeWrapper';
import { isSubmitKey, isEscKey } from '../../../utils/keyboard';
import { getBase64FromFile } from '../../../utils/upload';
import api from '../../../api';

const Form = (props) => {
  const [message, setMessage] = useState(props.message);
  const [entityImages, setEntityImages] = useState({ gallery: [] });
  const [base64Cover, setBase64Cover] = useState('');

  const textareaEl = useRef(null);
  const formEl = useRef(null);
  const fieldEl = useRef(null);

  const reset = () => {
    setMessage('');
    setBase64Cover('');
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
    const base64Cover = await getBase64FromFile(files[0]);
    setBase64Cover(base64Cover);
    const data = await api.uploadPostImage(files[0]);
    const { url } = data.files[0];
    // TODO make multiple upon creating gallery
    // setEntityImages({ gallery: [...entityImages.gallery, { url }] });
    setEntityImages({ gallery: [{ url }] });
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
      ref={formEl}
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
                    setBase64Cover(url);
                    setEntityImages({ gallery: [{ url }] });
                  }
                }
                onChange={(message) => {
                  console.log('message', message);
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
            <DragAndDrop {...{
              ...base64Cover, onImage, submit, textareaEl, formEl, fieldEl,
              }}
            />
          </div>

          {props.uploadEnabled && props.entityImages.gallery.length &&
            <div className={styles.images}>
              {props.entityImages.gallery.map(image => <Image key={image.url} src={image.url} />)}
            </div>
          }
        </div>
      </div>
      {/* TODO in Image.jsx */}
      {base64Cover &&
        <Image
          src={base64Cover}
          onClickRemove={() => {
            setEntityImages('');
            setBase64Cover('');
          }}
        />
      //  (
      //   <div className="cover cover_small">
      //     <div className="cover__inner">
      //       <div className="cover__remove">
      //         <button
      //           type="button"
      //           className="button-clean button-clean_close"
      //           onClick={() => {
      //               setEntityImages('');
      //               setBase64Cover('');
      //           }}
      //         >
      //           <IconClose />
      //         </button>
      //       </div>

      //       <img className="cover__img" src={base64Cover} alt="" />
      //     </div>
      //   </div>
      // )
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
  uploadEnabled: PropTypes.bool,
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
  uploadEnabled: false,
  userImageUrl: null,
  userPageUrl: null,
  userName: null,
  onReset: null,
  entityImages: { gallery: [] },
};

export default Form;
