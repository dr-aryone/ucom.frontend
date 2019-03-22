import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import PostsGroupMain from '../components/PostMedia/PostsGroupMain';
import Promo from '../components/Promo';
import LayoutBase from '../components/Layout/LayoutBase';
import { selectUser } from '../store/selectors';
import { fetchUser } from '../actions/users';
import EntryListSection from '../components/EntryListSection';
import { getUserById, getUsersByIds } from '../store/users';
import Feed from '../components/Feed/FeedUser';
import { USER_NEWS_FEED_ID } from '../utils/feed';
import { getMainPostGroupData } from '../actions/mainPostGroup';
import urls from '../utils/urls';
import { getUserName } from '../utils/user';

const HomePage = (props) => {
  useEffect(() => {
    if (props.user.id) {
      props.dispatch(fetchUser(props.user.id));
    }

    props.dispatch(getMainPostGroupData());
  }, []);

  const user = getUserById(props.users, props.user.id);

  return (
    <LayoutBase>
      <div className="content">
        <div className="content__inner">
          <PostsGroupMain />
        </div>
      </div>

      <div className="content content_shadows">
        {user ? (
          <div className="content__inner">
            <div className="grid grid_content">
              <div className="grid__item grid__item_main">
                <Feed userId={user.id} feedTypeId={USER_NEWS_FEED_ID} />
              </div>

              <div className="grid__item grid__item_side">
                <div className="sidebar sidebar_main">
                  {user.iFollow &&
                    <EntryListSection
                      title="People"
                      count={user.iFollow.length}
                      data={getUsersByIds(props.users, user.iFollow).map(item => ({
                        id: item.id,
                        title: getUserName(item),
                        avatarSrc: urls.getFileUrl(item.avatarFilename),
                        url: urls.getUserUrl(item.id),
                        nickname: item.accountName,
                        currentRate: item.currentRate,
                        follow: true,
                      }))}
                    />
                  }

                  {user.organizations &&
                    <EntryListSection
                      title="Communities"
                      count={user.organizations.length}
                      data={user.organizations.map(item => ({
                        id: item.id,
                        organization: true,
                        title: item.title,
                        avatarSrc: urls.getFileUrl(item.avatarFilename),
                        url: urls.getOrganizationUrl(item.id),
                        nickname: item.nickname,
                        currentRate: item.currentRate,
                      }))}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Promo />
        )}

        <div className="content__inner">
          <Footer />
        </div>
      </div>
    </LayoutBase>
  );
};

export const getHomePageData = store =>
  store.dispatch(getMainPostGroupData());

export default connect(
  state => ({
    user: selectUser(state),
    users: state.users,
  }),
  null,
)(HomePage);
