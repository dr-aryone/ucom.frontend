import { Redirect } from 'react-router';
import humps from 'lodash-humps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import LayoutClean from '../components/Layout/LayoutClean';
import CreateBy from '../components/CreateBy';
import Button from '../components/Button';
import Medium from '../components/Medium/index';
import api from '../api';
import { selectUser } from '../store/selectors';
import { postSetSaved, setPostData, validatePost, resetPost, setDataToStoreToLS } from '../actions';
import { authShowPopup } from '../actions/auth';
import loader from '../utils/loader';
import urls from '../utils/urls';
import Close from '../components/Close';
import { parseMediumContent, POSTS_DRAFT_LOCALSTORAGE_KEY } from '../utils/posts';
import Popup from '../components/Popup';
import ModalContent from '../components/ModalContent';
import PostSubmitForm from '../components/Post/PostSubmitForm';
import { addServerErrorNotification } from '../actions/notifications';

const EditPost = (props) => {
  // const postId = props.match.params.id;
  const { organizationId, postId } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [submitPopupVisible, setSubmitPopupVisible] = useState(false);

  const getPost = async () => {
    loader.start();
    setLoading(true);

    try {
      const data = await api.getPost(props.match.params.id);
      props.setPostData(data);
    } catch (e) {
      props.addServerErrorNotification(e);
      console.error(e);
    }

    loader.done();
    setLoaded(true);
    setLoading(false);
  };

  const savePost = async () => {
    if (!props.user.id) {
      props.authShowPopup();
      return;
    }

    if (!props.post.isValid) {
      props.validatePost();
      return;
    }

    const saveFn = (postId ? api.updatePost : api.createPost).bind(api);
    loader.start();
    setLoading(true);

    try {
      const data = await saveFn(props.post.data, props.match.params.id);
      props.postSetSaved(true);
      props.setPostData({ id: data.id || data.postId });
    } catch (e) {
      console.error(e);
      props.addServerErrorNotification(e);
      setLoading(false);
    }

    loader.done();
  };

  useEffect(() => {
    props.resetPost();

    if (postId) {
      getPost(postId);
    } else if (localStorage[POSTS_DRAFT_LOCALSTORAGE_KEY]) {
      const value = localStorage.getItem(POSTS_DRAFT_LOCALSTORAGE_KEY);
      props.setPostData(JSON.parse(value));
    }

    props.setPostData({ organization_id: organizationId });

    return () => {
      props.resetPost();
    };
  }, [postId, organizationId]);

  if (props.post.data.id && props.post.saved) {
    localStorage.removeItem(POSTS_DRAFT_LOCALSTORAGE_KEY);
    return <Redirect to={urls.getPostUrl(humps(props.post.data))} />;
  }

  return (
    <LayoutClean>
      {submitPopupVisible &&
        <Popup onClickClose={() => setSubmitPopupVisible(false)}>
          <ModalContent
            mod={['post-submit', 'small-close']}
            onClickClose={() => setSubmitPopupVisible(false)}
          >
            <PostSubmitForm onSubmit={() => savePost()} />
          </ModalContent>
        </Popup>
      }

      <div className="edit-post">
        <div className="edit-post__container">
          <div className="edit-post__toolbar">
            <div className="edit-post-toolbar">
              <div className="edit-post-toolbar__title">
                <h1 className="title title_xxsmall title_medium">{`${postId ? 'Edit' : 'Create'} Media Post`}</h1>
              </div>
              <div className="edit-post-toolbar__user">
                <CreateBy />
              </div>
              <div className="edit-post-toolbar__action">
                <Button isStretched theme="red" size="small" text="Publish" onClick={() => setSubmitPopupVisible(true)} isDisabled={loading || !props.post.isValid} />
              </div>
              <div className="edit-post-toolbar__close">
                <Close />
              </div>
            </div>
          </div>
        </div>

        <div className="edit-post__content">
          {(!postId || loaded) &&
            <Medium
              value={props.post.data.description}
              onChange={(content) => {
                const data = parseMediumContent(content);
                const dataToSave = {
                  description: data.description,
                };

                if (!props.post.data.id) {
                  dataToSave.title = data.title;
                  dataToSave.leadingText = data.leadingText;
                  dataToSave.entityImages = data.entityImages;
                }

                props.setDataToStoreToLS(dataToSave);
                props.validatePost();
              }}
              onUploadStart={() => {
                setLoading(true);
                loader.start();
              }}
              onUploadDone={() => {
                setLoading(false);
                loader.done();
              }}
            />
          }
        </div>

        <div className="edit-post__container">
          <div className="edit-post__toolbar">
            <div className="edit-post-toolbar">
              <div className="edit-post-toolbar__user">
                <CreateBy />
              </div>
              <div className="edit-post-toolbar__action">
                <Button
                  isStretched
                  theme="red"
                  size="small"
                  text="Publish"
                  onClick={() => setSubmitPopupVisible(true)}
                  isDisabled={loading || !props.post.isValid}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutClean>
  );
};

export default connect(
  state => ({
    user: selectUser(state),
    post: state.post,
  }),
  dispatch => bindActionCreators({
    resetPost,
    setPostData,
    validatePost,
    authShowPopup,
    postSetSaved,
    setDataToStoreToLS,
    addServerErrorNotification,
  }, dispatch),
)(EditPost);
