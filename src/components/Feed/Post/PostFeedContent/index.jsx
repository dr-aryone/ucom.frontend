import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FeedForm from '../../FeedForm';
import IconEdit from '../../../Icons/Edit';
import { updatePost } from '../../../../actions/posts';
import { getPostById } from '../../../../store/posts';
import { postIsEditable } from '../../../../utils/posts';
import DescDirectPost from './DescDirectPost';
import { checkMentionTag, escapeQuotes } from '../../../../utils/text';
import styles from './styles.css';
import urls from '../../../../utils/urls';

class PostFeedContent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formIsVisible: false,
    };
  }

  showForm = () => {
    this.setState({ formIsVisible: true });
  }

  hideForm = () => {
    this.setState({ formIsVisible: false });
  }

  render() {
    const post = getPostById(this.props.posts, this.props.postId);

    if (!post) {
      return null;
    }

    return (
      <Fragment>
        {this.state.formIsVisible ? (
          <div className={styles.form}>
            <FeedForm
              message={post.description}
              postId={post.id}
              mainImageFilename={post.mainImageFilename}
              onCancel={this.hideForm}
              onSubmit={(description, mainImageFilename) => {
                this.hideForm();
                this.props.updatePost({
                  postId: post.id,
                  data: { description, mainImageFilename },
                });
              }}
            />
          </div>
        ) : (
          <Fragment>
            {(this.props.postTypeId === 10 || post.postTypeId === 10) ? (
              <Fragment>
                {post.mainImageFilename && !this.state.formIsVisible && (
                  <div className={styles.cover}>
                    <img src={urls.getFileUrl(post.mainImageFilename)} alt="cover" />
                  </div>
                )}
                {post.description &&
                  <div className={styles.content}>
                    <DescDirectPost
                      desc={checkMentionTag(escapeQuotes(post.description))}
                      limit={100}
                    />
                  </div>
                }
                {post.userId === this.props.userId && postIsEditable(post.createdAt) && (
                  <div className="toolbar__side">
                    <button className="button-icon button-icon_edit button-icon_edit_small" onClick={this.showForm}>
                      <IconEdit />
                    </button>
                  </div>
                )}
              </Fragment>
            ) : (
              null
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

PostFeedContent.propTypes = {
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number,
  updatePost: PropTypes.func.isRequired,
  postTypeId: PropTypes.number,
  posts: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    updatePost,
  }, dispatch),
)(PostFeedContent);
