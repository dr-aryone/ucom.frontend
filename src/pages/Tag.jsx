import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LayoutBase from '../components/Layout/LayoutBase';
import Feed from '../components/Feed/FeedUser';
import { TAG_FEED_ID } from '../utils/feed';
import api from '../api';
import { addTags } from '../actions/tags';
import NotFoundPage from './NotFoundPage';
import { existHashTag } from '../utils/text';
import { getPostById } from '../store/posts';
import headerStyles from '../components/EntryHeader/styles.css';
import { formatRate } from '../utils/rate';
import Stats from '../components/Followers/Stats';
import urls from '../utils/urls';
import { getUserName } from '../utils/user';
import { getUsersByIds } from '../store/users';
import { getOrganizationByIds } from '../store/organizations';
import EntryListSection from '../components/EntryListSection';
import EntryCreatedAt from '../components/EntryCreatedAt';
import Footer from '../components/Footer';

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
    <LayoutBase gray>
      <div className="layout layout_profile">
        <div className="layout__header">
          <div className={headerStyles.entryHead}>
            <div className={`${headerStyles.main} ${headerStyles.noAvatar}`}>
              <div className={headerStyles.info}>
                <div className={headerStyles.userName}>#{tag.title}</div>
              </div>
              <div className={headerStyles.rate}>{formatRate(tag.currentRate)}°</div>
            </div>
            <div className={headerStyles.side}>
              <div className={headerStyles.usersLists}>
                <div>
                  <Stats title="Posts" amount={tag.posts.metadata.totalAmount} />
                </div>
                <div>
                  <Stats title="Following" amount={tag.users.metadata.totalAmount} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout__sidebar">
          {tag.users &&
            <EntryListSection
              // TODO: Load More
              // tagTitle={tagTitle}
              title="Top uses by"
              data={getUsersByIds(props.users, tag.users.data).map(item => ({
                id: item.id,
                avatarSrc: urls.getFileUrl(item.avatarFilename),
                url: urls.getUserUrl(item.id),
                title: getUserName(item),
                nickname: item.accountName,
                currentRate: item.currentRate,
                follow: true,
              }))}
            />
          }

          {tag.orgs &&
            <EntryListSection
              // TODO: Load More
              title="Communities"
              data={getOrganizationByIds(props.organizations, tag.orgs.data).map(item => ({
                id: item.id,
                organization: true,
                avatarSrc: urls.getFileUrl(item.avatarFilename),
                url: urls.getOrganizationUrl(item.id),
                title: item.title,
                nickname: item.nickname,
                currentRate: item.currentRate,
              }))}
            />
          }

          <EntryCreatedAt date={tag.createdAt} />
        </div>
        <div className="layout__main">
          {tag &&
            <Feed
              feedTypeId={TAG_FEED_ID}
              userId={props.user.data.id}
              tagIdentity={tag.title}
              feedInputInitialText={tag.title}
              filter={(postId) => {
                const post = getPostById(props.posts, postId);
                return post && post.description && existHashTag(post.description, tag.title);
              }}
            />
          }
        </div>
        <div className="layout__footer">
          <Footer />
        </div>
      </div>
    </LayoutBase>
  );
};

Tag.propTypes = {
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  organizations: PropTypes.objectOf(PropTypes.any).isRequired,
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
    users: state.users,
    organizations: state.organizations,
  }),
  dispatch => bindActionCreators({
    addTags,
  }, dispatch),
)(Tag);
