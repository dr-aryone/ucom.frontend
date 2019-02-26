import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LayoutBase from '../components/Layout/LayoutBase';
import TagHead from '../components/Tag/TagHead';
import Feed from '../components/Feed/FeedUser';
import { TAG_FEED_ID } from '../utils/feed';
import api from '../api';
import TagOrganizations from '../components/Tag/TagOrganizations';
import TagUsers from '../components/Tag/TagUsers';
import TagCreatedAt from '../components/Tag/TagCreatedAt';
import { addTags } from '../actions/tags';
import NotFoundPage from './NotFoundPage';
import { existHashTag } from '../utils/text';
import { getPostById } from '../store/posts';

const Tag = (props) => {
  const tagTitle = props.match.params.title;

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const getTag = async () => {
    try {
      const tag = await api.getTag(props.match.params.title);
      props.addTags([tag]);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
    setLoaded(true);
  };

  useEffect(() => {
    if (tagTitle) {
      getTag(tagTitle);
    }
  }, [tagTitle]);

  const tag = props.tags.data[props.match.params.title];

  if (loading) {
    return null;
  }

  if (loaded && !tag) {
    return <NotFoundPage />;
  }

  return (
    <LayoutBase>
      <div className="content content_sheet">
        <div className="content__inner content__inner_straight">
          {tag &&
            <TagHead
              title={tag.title}
              currentRate={tag.currentRate}
              postsAmount={tag.posts.metadata.totalAmount}
              usersAmount={tag.users.metadata.totalAmount}
            />
          }

          <div className="grid grid_user">
            <div className="grid__item">
              {tag &&
                <Feed
                  feedTypeId={TAG_FEED_ID}
                  userId={props.user.data.id}
                  tagIdentity={tag.title}
                  feedInputInitialText={`#${tag.title} `}
                  filter={(postId) => {
                    const post = getPostById(props.posts, postId);
                    return post && post.description && existHashTag(post.description, tag.title);
                  }}
                />
              }
            </div>

            {tag &&
              <div className="grid__item">
                <TagUsers
                  users={tag.users.data}
                  tagTitle={tagTitle}
                />
                <TagOrganizations
                  orgs={tag.orgs.data}
                  orgsAmount={tag.orgs.metadata.totalAmount}
                  tagTitle={tagTitle}
                />
                <TagCreatedAt createdAt={tag.createdAt} />
              </div>
            }
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

Tag.propTypes = {
  posts: PropTypes.shape({
    data: PropTypes.shape({
      description: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  tags: PropTypes.objectOf(PropTypes.any).isRequired,
  addTags: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
};

export default connect(
  state => ({
    posts: state.posts,
    tags: state.tags,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    addTags,
  }, dispatch),
)(Tag);
