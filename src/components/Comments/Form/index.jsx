import classNames from 'classnames';
import autosize from 'autosize';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.css';
import UserPick from '../../UserPick/UserPick';
import Image from './Image';
import { COMMENTS_CONTAINER_ID_POST, COMMENTS_CONTAINER_ID_FEED_POST } from '../../../utils/comments';
import TributeWrapper from '../../TributeWrapper';
import IconEnter from '../../Icons/Enter';
import { isSubmitKey, isEscKey } from '../../../utils/keyboard';

// TODO: Upload images

const Form = (props) => {
  const [message, setMessage] = useState(props.message);
  const textareaEl = useRef(null);

  const reset = () => {
    setMessage('');

    if (props.onReset) {
      props.onReset();
    }
  };

  const submit = () => {
    if (message.trim().length) {
      props.onSubmit({
        containerId: props.containerId,
        postId: props.postId,
        commentId: props.commentId,
        message,
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
            {props.uploadEnabled &&
              <div className={styles.action}>
                <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.03115 14.1279V10.128C6.03115 10.128 6.03118 10.1279 6.03122 10.1279C6.03126 10.1279 6.03129 10.1279 6.03129 10.1279V8.62793C6.03129 8.35179 5.80744 8.12793 5.5313 8.12793C5.25516 8.12793 5.03131 8.35179 5.03131 8.62793V12.1279C5.03131 12.6802 4.5836 13.1279 4.03132 13.1279C3.47905 13.1279 3.03134 12.6802 3.03134 12.1279V8.62793C3.03134 7.24722 4.15061 6.12793 5.5313 6.12793C6.91199 6.12793 8.03126 7.24722 8.03126 8.62793V13.1279C8.03126 13.1279 8.03123 13.1279 8.03119 13.1279C8.03115 13.1279 8.03112 13.128 8.03112 13.128V14.1279C8.03112 16.3371 6.24028 18.1279 4.03118 18.1279C1.82208 18.1279 0.03125 16.3371 0.03125 14.1279V4.12793C0.03125 1.91879 1.82208 0.12793 4.03118 0.12793C6.24028 0.12793 8.03112 1.91879 8.03112 4.12793C8.03112 4.6802 7.58341 5.12793 7.03113 5.12793C6.47886 5.12793 6.03115 4.6802 6.03115 4.12793C6.03115 3.02336 5.13573 2.12793 4.03118 2.12793C2.92663 2.12793 2.03122 3.02336 2.03122 4.12793V14.1279C2.03122 15.2325 2.92663 16.1279 4.03118 16.1279C5.13573 16.1279 6.03115 15.2325 6.03115 14.1279Z" />
                </svg>
              </div>
            }

            <div
              role="presentation"
              className={styles.action}
              onClick={submit}
            >
              <IconEnter />
            </div>
          </div>
        </div>

        {props.uploadEnabled && props.images.length &&
          <div className={styles.images}>
            {props.images.map(image => <Image key={image.url} src={image.url} />)}
          </div>
        }
      </div>
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
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  })),
  uploadEnabled: PropTypes.bool,
  userImageUrl: PropTypes.string,
  userPageUrl: PropTypes.string,
  userName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func,
};

Form.defaultProps = {
  flat: false,
  message: '',
  commentId: null,
  depth: 0,
  autoFocus: false,
  images: [],
  uploadEnabled: false,
  userImageUrl: null,
  userPageUrl: null,
  userName: null,
  onReset: null,
};

export default Form;
