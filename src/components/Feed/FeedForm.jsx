import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import Avatar from '../Avatar';
import IconEnter from '../Icons/Enter';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { initDragAndDropListeners } from '../../utils/dragAndDrop';
import { removeCoverImage, changeCoverImageUrl, getCoverImage } from '../../utils/entityImages';
import TributeWrapper from '../TributeWrapper';
import EmbedMenu from './Post/EmbedMenu';
import DragAndDrop from '../DragAndDrop';
import Image from '../Comments/Form/Image';
import urls from '../../utils/urls';
import api from '../../api';

const FeedForm = (props) => {
  const initialText = props.initialText ? `#${props.initialText} ` : false;
  const [message, setMessage] = useState(props.message || initialText || '');
  const [entityImages, setEntityImages] = useState(props.entityImages);
  const [dropOnForm, setDropOnForm] = useState(false);
  const fieldEl = useRef(null);

  useEffect(() => {
    const removeInitDragAndDropListeners = initDragAndDropListeners(fieldEl.current, () => {
      setDropOnForm(true);
    }, () => {
      setDropOnForm(false);
    });
    return removeInitDragAndDropListeners;
  }, []);

  const onImage = async (file) => {
    const data = await api.uploadPostImage(file);
    const { url } = data.files[0];
    setEntityImages(changeCoverImageUrl(entityImages, url));
  };

  const sumbitForm = () => {
    if (typeof props.onSubmit === 'function' && (message.trim().length !== 0 || getCoverImage({ entityImages }))) {
      props.onSubmit(message, JSON.stringify(entityImages));
    }
  };

  const user = getUserById(props.users, props.user.id);

  if (!user) {
    return null;
  }

  return (
    <form
      className={classNames(
      'feed-form',
      { 'feed-form__edit': props.formIsVisible },
      )}
      onSubmit={(e) => {
        e.preventDefault();
        sumbitForm();
      }}
    >
      <div className="feed-form__field">
        {!props.formIsVisible &&
        <div className="feed-form__avatar">
          <Avatar src={urls.getFileUrl(user.avatarFilename)} />
        </div>
        }

        <div
          className={classNames(
            'feed-form-message',
            { 'feed-form-message__edit': props.formIsVisible },
            )}
          ref={fieldEl}
        >
          <div className="feed-form__container">
            <TributeWrapper
              enabledImgUrlParse
              onChange={message => setMessage(message)}
              onImage={onImage}
              onParseImgUrl={(url) => {
                setEntityImages(changeCoverImageUrl(entityImages, url));
              }}
            >
              <textarea
                autoFocus
                rows="4"
                className="feed-form__textarea"
                placeholder="Leave a comment"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey && e.keyCode === 13) || (e.metaKey && e.keyCode === 13)) {
                    e.preventDefault();
                    sumbitForm();
                  }

                  if (e.keyCode === 27) {
                    e.preventDefault();
                    props.onCancel();
                  }
                }}
              />
            </TributeWrapper>
            <DragAndDrop {...{
                onImage, dropOnForm,
              }}
            />
          </div>
        </div>
      </div>
      {getCoverImage({ entityImages }) && <Image
        src={getCoverImage({ entityImages })}
        onClickRemove={() => {
          setEntityImages(removeCoverImage(entityImages));
        }}
      />}
      <div className="feed-form__actions">
        <EmbedMenu onImage={onImage} />
        {props.formIsVisible ?
          <Fragment>
            <div
              className="feed-form-button"
              onClick={props.onCancel}
              role="presentation"
            >
              Cancel
            </div>
            <div
              className="feed-form-button feed-form-button__save"
              disabled={message.trim().length === 0 && !getCoverImage({ entityImages })}
              role="presentation"
              onClick={sumbitForm}
            >
              Save
            </div>
          </Fragment> :
          <button
            type="submit"
            className="feed-form__submit"
            disabled={message.trim().length === 0 && !getCoverImage({ entityImages })}
          >
            <IconEnter />
          </button>
          }

      </div>
    </form>
  );
};

FeedForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  message: PropTypes.string,
  entityImages: PropTypes.objectOf(PropTypes.array),
  initialText: PropTypes.string,
  formIsVisible: PropTypes.bool,
};

FeedForm.defaultProps = {
  message: '',
  initialText: '',
  entityImages: {},
  formIsVisible: false,
};

export default connect(state => ({
  users: state.users,
  user: selectUser(state),
}))(FeedForm);
