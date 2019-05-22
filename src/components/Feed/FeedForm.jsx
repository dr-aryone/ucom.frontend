import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import Avatar from '../Avatar';
import IconEnter from '../Icons/Enter';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { getGalleryImages, addGalleryImagesWithCatch } from '../../utils/entityImages';
import { addErrorNotification } from '../../actions/notifications';
import { initDragAndDropListeners } from '../../utils/dragAndDrop';
import TributeWrapper from '../TributeWrapper';
import EmbedMenu from './Post/EmbedMenu';
import DragAndDrop from '../DragAndDrop';
import PreviewImagesGrid from '../PreviewImagesGrid';
import urls from '../../utils/urls';
import api from '../../api';

const FeedForm = (props) => {
  const initialText = props.initialText ? `#${props.initialText} ` : false;
  const [message, setMessage] = useState(props.message || initialText || '');
  const [entityImages, setEntityImages] = useState(props.entityImages);
  const [dropOnForm, setDropOnForm] = useState(false);
  const fieldEl = useRef(null);
  const galleryImages = getGalleryImages({ entityImages });
  const isExistGalleryImages = !!galleryImages.length;
  const addGalleryImages = addGalleryImagesWithCatch(props.addErrorNotification);

  useEffect(() => {
    const removeInitDragAndDropListeners = initDragAndDropListeners(fieldEl.current, () => {
      setDropOnForm(true);
    }, () => {
      setDropOnForm(false);
    });
    return removeInitDragAndDropListeners;
  }, []);

  const onMultipleImages = async (files) => {
    const savedEntityImages = entityImages;
    setEntityImages(addGalleryImages(entityImages, Array(files.length).fill({ url: '' })));
    const data = await Promise.all(files.map(url => api.uploadPostImage(url)));
    const urls = data.map(item => item.files[0]);
    setEntityImages(addGalleryImages(savedEntityImages, urls));
  };

  const sumbitForm = () => {
    if (typeof props.onSubmit === 'function' && (message.trim().length !== 0 || isExistGalleryImages)) {
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
              onImage={url => onMultipleImages([url])}
              onParseImgUrl={(url) => {
                setEntityImages(addGalleryImages(entityImages, [{ url }]));
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
                onMultipleImages, dropOnForm,
              }}
            />
          </div>
        </div>
      </div>
      <PreviewImagesGrid {...{
          isExistGalleryImages, setEntityImages, entityImages,
        }}
      />

      <div className="feed-form__actions">
        <EmbedMenu onImage={onMultipleImages} />
        <button
          type="submit"
          className="feed-form__submit"
          disabled={message.trim().length === 0 && !isExistGalleryImages}
        >
          <IconEnter />
        </button>
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
}), {
  addErrorNotification,
})(FeedForm);
