import { connect } from 'react-redux';
import React, { Fragment, PureComponent } from 'react';
import PostInput from '../components/PostInput';
import Post from '../components/Post';
import UserCard from '../components/UserCard';
import Footer from '../components/Footer';
import PostsGroup from '../components/PostsGroup';
import { getUsers, getPosts, getUserPosts } from '../api';
import { getUserUrl, getUserName } from '../utils/user';
import { getFileUrl } from '../utils/upload';
import { getPostUrl } from '../utils/posts';

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      posts: [],
      userPosts: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const promises = [
      getUsers(),
      getPosts(),
      this.props.user.id ? getUserPosts(this.props.user.id) : null,
    ];

    Promise.all(promises)
      .then((result) => {
        this.setState({
          posts: result[1],
          users: result[0],
          userPosts: result[2] || [],
        });
      });
  }

  render() {
    return (
      <Fragment>
        <div className="content">
          <div className="content__inner">
            <div className="page-nav">
              <div className="menu menu_media menu_responsive">
                <div className="menu__item menu__item_active">
                  <a href="#" className="menu__link">Editorial Media</a>
                </div>
                <div className="menu__item">
                  <a href="#" className="menu__link">Community Media</a>
                </div>
                <div className="menu__item">
                  <a href="#" className="menu__link">Organizations Offers</a>
                </div>
                <div className="menu__item">
                  <a href="#" className="menu__link">People Offers</a>
                </div>
              </div>
            </div>

            <PostsGroup posts={this.state.posts} />
          </div>
        </div>

        <div className="content content_shadows">
          <div className="content__inner">

            <div className="grid grid_content">
              <div className="grid__item">
                {this.props.user.id && (
                  <div className="feed">
                    <div className="feed__title">
                      <h1 className="title title_small">Ur News Feed</h1>
                    </div>

                    <div className="feed__post-form">
                      <PostInput />
                    </div>

                    <div className="feed__toolbar">
                      <div className="toolbar">
                        <div className="toolbar__main">
                          <div className="menu menu_nav menu_responsive">
                            <div className="menu__item menu__item_active">
                              <button className="menu__link">All</button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Call</button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Poll</button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Appeal</button>
                            </div>
                            <div className="menu__item">
                              <button className="menu__link">Promote</button>
                            </div>
                          </div>
                        </div>

                        <div className="toolbar__side">
                          Sort by
                        </div>
                      </div>
                    </div>

                    {this.props.user && (
                      <div className="feed__list">
                        {this.state.userPosts.map(item => (
                          <div className="feed__item" key={item.id}>
                            <Post
                              postId={item.id}
                              updatedAt={item.updated_at}
                              rating={item.current_vote}
                              userName={getUserName(this.props.user)}
                              accountName={this.props.user.account_name}
                              profileLink={getUserUrl(this.props.user.id)}
                              avatarUrl={getFileUrl(this.props.user.avatar_filename)}
                              title={item.title}
                              url={getPostUrl(item.id)}
                              leadingText={item.leading_text}
                              coverUrl={getFileUrl(item.main_image_filename)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid__item">
                <div className="sidebar">
                  <div className="sidebar__section">
                    <div className="users-group">
                      <h4 className="users-group__title">Organizations</h4>

                      <div className="users-group__list">
                        {[0, 0, 0, 0, 0].map((i, index) => (
                          <div className="users-group__item" key={index}>
                            <UserCard squareAvatar />
                          </div>
                        ))}
                      </div>

                      <div className="users-group__show-more">
                        <a href="#">View All</a>
                      </div>
                    </div>
                  </div>

                  {this.state.users.length > 0 && (
                    <div className="sidebar__section">
                      <div className="users-group">
                        <h4 className="users-group__title">People</h4>

                        <div className="users-group__list">
                          {this.state.users.map(user => (
                            <div className="users-group__item" key={user.id}>
                              <UserCard
                                userName={getUserName(user)}
                                accountName={user.nickname}
                                profileLink={getUserUrl(user.id)}
                                avatarUrl={getFileUrl(user.avatar_filename)}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="users-group__show-more">
                          <a href="#">View All</a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  user: state.user,
}))(HomePage);
