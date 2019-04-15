import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import { getEntryImageAttr } from '../../utils/upload';
import { escapeQuotes } from '../../utils/text';
import { removeCoverImages, changeCoverImagesUrl } from '../../utils/entityImages';
import IconClip from '../Icons/Clip';
import IconClose from '../Icons/Close';
import DropZone from '../DropZone';
import TributeWrapper from '../TributeWrapper';
import urls from '../../utils/urls';
import api from '../../api';

const FeedForm = (props) => {
  const initialText = props.initialText ? `#${props.initialText} ` : false;
  const [message, setMessage] = useState(escapeQuotes(props.message) || initialText || '');
  const [entityImages, setEntityImages] = useState(props.entityImages);

  const onImage = async (file) => {
    const data = await api.uploadPostImage(file);
    const { url } = data.files[0];
    setEntityImages(changeCoverImagesUrl(entityImages, url));
  };

  const sumbitForm = (message, entityImages) => {
    if (typeof props.onSubmit === 'function' && (message.trim().length !== 0 || getEntryImageAttr({ entityImages }))) {
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
    >
      <div className="feed-form__field">
        <div className="feed-form__avatar">
          <Avatar src={urls.getFileUrl(user.avatarFilename)} />
        </div>

        <div className="feed-form__message">
          <TributeWrapper
            enabledImgUrlParse
            onChange={message => setMessage(message)}
            onImage={onImage}
            onParseImgUrl={(url) => {
              setEntityImages(changeCoverImagesUrl(entityImages, url));
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
                  sumbitForm(message, entityImages);
                }
              }}
            />
          </TributeWrapper>
        </div>

        <div>
          <label name="img" className="feed-form__clip">
            <IconClip />
          </label>

          {getEntryImageAttr({ entityImages }) ? (
            <div className="cover cover_small">
              <div className="cover__inner">
                <div className="cover__remove">
                  <button
                    type="button"
                    className="button-clean button-clean_close"
                    onClick={() => {
                      setEntityImages(removeCoverImages(entityImages)); // JSON.stringify({ articleTitle: [] }),
                    }}
                  >
                    <IconClose />
                  </button>
                </div>

                <img className="cover__img" src={getEntryImageAttr({ entityImages })} alt="" />
              </div>
            </div>
          ) : (
            <DropZone
              className="drop-zone_clip"
              onDrop={onImage}
            />
          )}
        </div>
      </div>

      <div className="feed-form__actions">
        <div className="inline">
          <div className="inline__item">
            <Button
              text="Cancel"
              size="small"
              theme="light"
              onClick={() => {
                if (typeof props.onCancel === 'function') {
                  props.onCancel();
                }
              }}
            />
          </div>
          <div className="inline__item">
            <Button
              text={props.message || getEntryImageAttr(props) ? 'Save' : 'Post'}
              type="submit"
              size="small"
              theme="red"
              isDisabled={message.trim().length === 0 && !getEntryImageAttr({ entityImages })}
            />
          </div>
        </div>
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
