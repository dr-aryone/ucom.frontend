import PropTypes from 'prop-types';
import React from 'react';
import Form from './Form/wrapper';
import Post from './Post/Post';
import LoadMore from './LoadMore';

const Feed = props => (
  <div className="feed">
    {props.onSubmitPostForm &&
      <Form
        message={props.feedInputInitialText}
        onSubmit={props.onSubmitPostForm}
      />
    }

    {props.postIds.length > 0 &&
      <div className="feed__list">
        {(props.filter ? props.postIds.filter(props.filter) : props.postIds).map(id => (
          <div className="feed__item" key={id}>
            <Post id={id} />
          </div>
        ))}
      </div>
    }

    {props.hasMore &&
      <div className="feed__loadmore">
        <LoadMore
          url={props.loadMoreUrl}
          disabled={props.loading}
          onClick={() => {
            if (props.loading) return;
            props.onClickLoadMore();
          }}
        />
      </div>
    }
  </div>
);

Feed.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  postIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  loading: PropTypes.bool.isRequired,
  loadMoreUrl: PropTypes.string,
  feedInputInitialText: PropTypes.string,
  onSubmitPostForm: PropTypes.func,
  onClickLoadMore: PropTypes.func.isRequired,
  filter: PropTypes.func,
};

Feed.defaultProps = {
  loadMoreUrl: null,
  onSubmitPostForm: null,
  feedInputInitialText: null,
  filter: null,
};

export default Feed;
