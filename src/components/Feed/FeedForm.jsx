import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState, useRef } from 'react';
import Avatar from '../Avatar';
import IconEnter from '../Icons/Enter';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { removeGalleryImage, getGalleryImages, addGalleryImages } from '../../utils/entityImages';
import TributeWrapper from '../TributeWrapper';
import EmbedMenu from './Post/EmbedMenu';
import FeedDragAndDrop from './Post/FeedDragAndDrop';
import Image from '../Comments/Form/Image';
import urls from '../../utils/urls';
import api from '../../api';

const FeedForm = (props) => {
  const initialText = props.initialText ? `#${props.initialText} ` : false;
  const [message, setMessage] = useState(props.message || initialText || '');
  const [entityImages, setEntityImages] = useState(props.entityImages);
  const textareaEl = useRef(null);
  const formEl = useRef(null);
  const fieldEl = useRef(null);
  const galleryImages = getGalleryImages({ entityImages });
  const isExistGalleryImages = !!galleryImages.length;

  const onImage = async (file) => {
    const data = await api.uploadPostImage(file);
    const image = data.files[0];
    setEntityImages(addGalleryImages(entityImages, [image]));
  };

  const onMultipleImages = async (files) => {
    const data = await Promise.all(files.map(url => api.uploadPostImage(url)));
    const urls = data.map(item => item.files[0]);
    setEntityImages(addGalleryImages(entityImages, urls));
  };

  const sumbitForm = (message, entityImages) => {
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
      className="feed-form"
      onSubmit={(e) => {
        e.preventDefault();
        sumbitForm(message, entityImages);
      }}
      ref={formEl}
    >
      <div className="feed-form__field">
        <div className="feed-form__avatar">
          <Avatar src={urls.getFileUrl(user.avatarFilename)} />
        </div>

        <div
          className="feed-form__message"
          ref={fieldEl}
        >
          <div className="feed-form__container">
            <TributeWrapper
              enabledImgUrlParse
              onChange={message => setMessage(message)}
              onImage={onImage}
              onParseImgUrl={(url) => {
                setEntityImages(addGalleryImages(entityImages, [{ url }]));
              }}
            >
              <textarea
                ref={textareaEl}
                autoFocus
                rows="4"
                className="feed-form__textarea"
                placeholder="Leave a comment"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey && e.keyCode === 13) || (e.metaKey && e.keyCode === 13)) {
                    e.preventDefault();
                    sumbitForm(message, entityImages);
                  }
                }}
              />
            </TributeWrapper>
            <FeedDragAndDrop {...{
                onImage, textareaEl, formEl, fieldEl,
              }}
            />
          </div>
        </div>
      </div>
      <div className="feed-form__previews">
        {isExistGalleryImages &&
          galleryImages.map((url, index) => (
            <Image
              key={index}
              src={url}
              isMultiple={galleryImages.length > 1}
              onClickRemove={() => {
                setEntityImages(removeGalleryImage(entityImages, index));
              }}
            />
          ))
        }
      </div>

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
  onSubmit: PropTypes.func.isRequired,
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  message: PropTypes.string,
  entityImages: PropTypes.objectOf(PropTypes.array),
  initialText: PropTypes.string,
};

FeedForm.defaultProps = {
  message: '',
  initialText: '',
  entityImages: {},
};

export default connect(state => ({
  users: state.users,
  user: selectUser(state),
}))(FeedForm);
