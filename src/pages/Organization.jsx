import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { connect } from 'react-redux';
import Links from '../components/Links';
import Footer from '../components/Footer';
import OrganizationHead from '../components/Organization/OrganizationHead';
import VerticalCards from '../components/VerticalCards';
import OrganizationHeader from '../components/Organization/OrganizationHeader';
import { getFileUrl } from '../utils/upload';
import { getSourceUrl } from '../utils/sources';
import { getOrganization } from '../actions/organizations';
import { selectUser } from '../store/selectors';
import LayoutBase from '../components/Layout/LayoutBase';
import { getOrganizationById } from '../store/organizations';
import { getPostById } from '../store/posts';
import Popup from '../components/Popup';
import ModalContent from '../components/ModalContent';
import Post from '../components/Feed/Post/Post';
import urls from '../utils/urls';
import { fetchPost } from '../actions/posts';
import Feed from '../components/Feed/FeedUser';
import { ORGANIZATION_FEED_ID } from '../utils/feed';

const OrganizationPage = (props) => {
  const organizationId = Number(props.match.params.id);
  const postId = Number(props.match.params.postId);

  useEffect(() => {
    props.getOrganization(organizationId);
  }, [organizationId]);

  useEffect(() => {
    if (postId) {
      props.fetchPost(postId);
    }
  }, [postId]);

  const organization = getOrganizationById(props.organizations, organizationId);
  const post = getPostById(props.posts, postId);

  if (!organization) {
    return null;
  }

  const socialNetworks = (organization.socialNetworks || [])
    .filter(item => item.sourceUrl && item.sourceUrl.length > 0);

  return (
    <LayoutBase>
      {Boolean(post) &&
        <Popup onClickClose={() => props.history.push(urls.getOrganizationUrl(organizationId))}>
          <ModalContent mod="post">
            <Post id={post.id} postTypeId={post.postTypeId} />
          </ModalContent>
        </Popup>
      }

      <div className="content">
        <div className="content__inner">
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <OrganizationHead organizationId={organizationId} />
              </div>
            </div>

            <div className="sheets__content sheets__content_theme_organization">
              <div className="organization">
                <div className="organization__header">
                  <OrganizationHeader organizationId={organizationId} />
                </div>
                <div className="organization__content">
                  <div className="grid grid_organization">
                    <div className="grid__item">
                      {organization.about && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Mission</h3>
                          </div>
                          <div className="user-section__content">{organization.about}</div>
                        </div>
                      )}

                      <div className="user-section">
                        <Feed organizationId={organizationId} feedTypeId={ORGANIZATION_FEED_ID} />
                      </div>
                    </div>

                    <div className="grid__item">
                      {(organization.country || organization.city) && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Location</h3>
                          </div>
                          <div className="user-section__content">
                            {organization.country && organization.city ? `${organization.country}, ${organization.city}` : (organization.country || organization.city)}
                          </div>
                        </div>
                      )}

                      {organization.partnershipSources && organization.partnershipSources.length > 0 && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Partners</h3>
                          </div>
                          <div className="user-section__content">
                            <VerticalCards
                              title="Partners"
                              userCards={organization.partnershipSources.map(item => ({
                                id: item.id,
                                userName: item.title,
                                avatarUrl: getFileUrl(item.avatarFilename),
                                accountName: item.nickname || item.description,
                                profileLink: getSourceUrl(item),
                              }))}
                            />
                          </div>
                        </div>
                      )}

                      {organization.communitySources && organization.communitySources.length > 0 && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Communities</h3>
                          </div>
                          <div className="user-section__content">
                            <VerticalCards
                              title="Communities"
                              userCards={organization.communitySources.map(item => ({
                                id: item.id,
                                userName: item.title,
                                avatarUrl: getFileUrl(item.avatarFilename),
                                accountName: item.nickname || item.description,
                                profileLink: getSourceUrl(item),
                              }))}
                            />
                          </div>
                        </div>
                      )}

                      {organization.personalWebsiteUrl && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">
                              Contacts
                            </h3>
                          </div>
                          <div className="user-section__content">
                            <Links userSources={[{ sourceUrl: organization.personalWebsiteUrl }]} />
                          </div>
                        </div>
                      )}

                      {socialNetworks && socialNetworks.length > 0 && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">
                              Social Networks
                            </h3>
                          </div>
                          <div className="user-section__content">
                            <Links userSources={socialNetworks} />
                          </div>
                        </div>
                      )}

                      {organization.createdAt && (
                        <div className="user-section">
                          <div className="user-section__title">
                            <h3 className="title title_xsmall title_light">Created</h3>
                          </div>
                          <div className="user-section__content">
                            {moment(organization.createdAt).format('D MMM YYYY')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </LayoutBase>
  );
};

OrganizationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
      postId: PropTypes.number,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  organizations: PropTypes.arrayOf(PropTypes.any).isRequired,
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
  getOrganization: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: selectUser(state),
    organizations: state.organizations,
    posts: state.posts,
  }),
  dispatch => bindActionCreators({
    getOrganization,
    fetchPost,
  }, dispatch),
)(OrganizationPage);
