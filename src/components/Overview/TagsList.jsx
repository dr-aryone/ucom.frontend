import React from 'react';
import LoadMore from './../Feed/LoadMore';
import TagCard from './TagCard';

const TagsList = props => (
  <div className="feed">
    {props.tagIds.length > 0 &&
      <div className="feed__list">
        {props.tagIds.map((tag, i) => (
          <div className="feed__item" key={i}>
            <TagCard tag={tag} />
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

export default TagsList;
