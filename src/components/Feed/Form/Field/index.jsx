import { KEY_RETURN, KEY_ESCAPE } from 'keycode-js';
import autosize from 'autosize';
import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import UserPick from '../../../UserPick/UserPick';
import styles from './styles.css';
import IconEnter from '../../../Icons/Enter';
import EmbedMenu from './EmbedMenu';
import ImagesList from '../../../ImagesList';
import TributeWrapper from '../../../TributeWrapper';
import PollForm from '../../../Poll/Form';

const Field = (props) => {
  const containerEl = useRef(null);
  const textareaEl = useRef(null);
  const [message, setMessage] = useState(props.message);
  const [mainImageFilename, setMainImageFilename] = useState(props.mainImageFilename);
  const [poll, setPoll] = useState(null);

  const submit = () => {
    if (message.trim() || mainImageFilename) {
      props.onSubmit({ message, mainImageFilename });
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
  }, [message, poll]);

  useEffect(() => {
    setMessage(props.message);
  }, [props.message]);

  return (
    <form
      ref={containerEl}
      role="presentation"
      className={styles.field}
      onClick={(e) => {
        if (e.target === containerEl.current) {
          props.onReset();
        }
      }}
    >
      <div className={styles.inner}>
        <div className={styles.data}>
          <div>
            <UserPick
              url={props.ownerPickUrl}
              alt={props.ownerPickAlt}
              src={props.ownerPickSrc}
            />
          </div>
          <div>
            <TributeWrapper onChange={m => setMessage(m)}>
              <textarea
                autoFocus
                rows={poll ? 1 : 3}
                className={styles.message}
                placeholder="Leave a comment"
                ref={textareaEl}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.keyCode === KEY_RETURN) {
                    e.preventDefault();
                    submit();
                  }

                  if (e.keyCode === KEY_ESCAPE) {
                    props.onReset();
                  }
                }}
              />
            </TributeWrapper>


            {mainImageFilename &&
              <div className={styles.gallery}>
                <ImagesList
                  images={[mainImageFilename]}
                  onClickRemove={() => setMainImageFilename(null)}
                />
              </div>
            }
          </div>
        </div>

        {poll &&
          <div className={styles.poll}>
            <PollForm
              poll={poll}
              onClickCLose={() => setPoll(null)}
              onChange={(poll) => {
                console.log(poll);
                setPoll(poll);
              }} // Сюда записывается отредактированный опрос
            />
          </div>
        }

        <div className={styles.actions}>
          <EmbedMenu
            onChangeImage={(file) => {
              setMainImageFilename(file);
            }}
            onClickPoll={() => {
              setPoll({}); // TODO: Передавать пустую структуру опроса с помощью либы Володи
            }}
          />
          <button
            type="button"
            className={styles.enter}
            disabled={!message.trim() && !mainImageFilename}
            onClick={() => submit()}
          >
            <IconEnter />
          </button>
        </div>
      </div>
    </form>
  );
};

Field.propTypes = {
  message: PropTypes.string,
  mainImageFilename: PropTypes.shape({
    url: PropTypes.string,
  }),
  ownerPickUrl: PropTypes.string,
  ownerPickAlt: PropTypes.string,
  ownerPickSrc: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

Field.defaultProps = {
  message: '',
  mainImageFilename: null,
  ownerPickUrl: null,
  ownerPickAlt: null,
  ownerPickSrc: null,
};

export default Field;
