import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import Avatar from '../Avatar';
import FeedForm from './FeedForm';
import { selectUser } from '../../store/selectors/user';
import { getUserById } from '../../store/users';
import urls from '../../utils/urls';

class FeedInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  showForm = () => {
    this.setState({ active: true });
  }

  hideForm = () => {
    this.setState({ active: false });
  }

  createPost = (message, fileImg) => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(message, fileImg);
    }

    this.hideForm();
  }

  render() {
    const user = getUserById(this.props.users, this.props.user.id);

    if (!user) {
      return null;
    }

    return (
      <div className="feed-input">
        <div className="feed-input__invite" role="presentation" onClick={this.showForm}>
          <span className="inline">
            <span className="inline__item">Hey</span>
            <span className="inline__item">
              <Avatar src={urls.getFileUrl(user.avatarFilename)} />
            </span>
            <span className="inline__item">what’s new?</span>
          </span>
        </div>

        {this.state.active && (
          <div className="feed-input__container">
            <div className="feed-input__overlay" role="presentation" onClick={this.hideForm} />
            <FeedForm
              onSubmit={this.createPost}
              onCancel={this.hideForm}
              initialText={this.props.initialText || ''}
            />
          </div>
        )}
      </div>
    );
  }
}

FeedInput.propTypes = {
  onSubmit: PropTypes.func,
  users: PropTypes.objectOf(PropTypes.object),
};

export default connect(state => ({
  users: state.users,
  posts: state.posts,
  user: selectUser(state),
}))(FeedInput);
