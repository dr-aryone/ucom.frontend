import { GraphQLSchema } from 'ucom-libs-graphql-schemas';
import humps from 'lodash-humps';
import * as axios from 'axios';
import { getBackendConfig } from '../utils/config';
import { getToken } from '../utils/token';
import { COMMENTS_PER_PAGE } from '../utils/comments';
import { FEED_PER_PAGE, OVERVIEW_SIDE_PER_PAGE } from '../utils/feed';
import { NODES_PER_PAGE } from '../utils/governance';

const request = async (data) => {
  const options = {
    baseURL: getBackendConfig().httpEndpoint,
    headers: {},
  };

  const token = getToken();

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const resp = await axios.post('/graphql', data, options);
    return humps(resp.data);
  } catch (e) {
    throw e;
  }
};

export default {
  async getUserWallFeed({
    userId,
    page = 1,
    perPage = FEED_PER_PAGE,
    commentsPage = 1,
    commentsPerPage = COMMENTS_PER_PAGE,
  }) {
    const query = GraphQLSchema.getUserWallFeedQuery(
      userId,
      page,
      perPage,
      commentsPage,
      commentsPerPage,
    );

    try {
      const data = await request({ query });
      return data.data.userWallFeed;
    } catch (e) {
      throw e;
    }
  },

  async getUserNewsFeed({
    page = 1,
    perPage = FEED_PER_PAGE,
    commentsPage = 1,
    commentsPerPage = COMMENTS_PER_PAGE,
  }) {
    const query = GraphQLSchema.getUserNewsFeed(
      page,
      perPage,
      commentsPage,
      commentsPerPage,
    );

    try {
      const data = await request({ query });
      return data.data.userNewsFeed;
    } catch (e) {
      throw e;
    }
  },

  async getOrganizationWallFeed({
    organizationId,
    page = 1,
    perPage = FEED_PER_PAGE,
    commentsPage = 1,
    commentsPerPage = COMMENTS_PER_PAGE,
  }) {
    const query = GraphQLSchema.getOrganizationWallFeedQuery(
      organizationId,
      page,
      perPage,
      commentsPage,
      commentsPerPage,
    );

    try {
      const data = await request({ query });
      return data.data.orgWallFeed;
    } catch (e) {
      throw e;
    }
  },

  async getPostComments({
    commentableId,
    page = 1,
    perPage = COMMENTS_PER_PAGE,
  }) {
    const query = GraphQLSchema.getPostCommentsQuery(
      commentableId,
      page,
      perPage,
    );

    try {
      const data = await request({ query });
      return data.data.feedComments;
    } catch (e) {
      throw e;
    }
  },

  async getCommentsOnComment({
    commentableId,
    parentId,
    parentDepth,
    page = 1,
    perPage = COMMENTS_PER_PAGE,
  }) {
    const query = GraphQLSchema.getCommentsOnCommentQuery(
      commentableId,
      parentId,
      parentDepth,
      page,
      perPage,
    );

    try {
      const data = await request({ query });
      return data.data.commentsOnComment;
    } catch (e) {
      throw e;
    }
  },

  async getOnePost({
    postId,
    page = 1,
    perPage = COMMENTS_PER_PAGE,
  }) {
    const token = getToken();
    const query = (token ? GraphQLSchema.getOnePostQueryAsMyself : GraphQLSchema.getOnePostQueryAsGuest)(
      postId,
      page,
      perPage,
    );

    try {
      const data = await request({ query });
      return data.data.onePost;
    } catch (e) {
      throw e;
    }
  },

  async getTagWallFeed({
    tagIdentity,
    page = 1,
    perPage = FEED_PER_PAGE,
    commentsPage = 1,
    commentsPerPage = COMMENTS_PER_PAGE,
  }) {
    const token = getToken();
    const query = await GraphQLSchema.getTagWallFeedQuery(
      tagIdentity,
      page,
      perPage,
      commentsPage,
      commentsPerPage,
      Boolean(token),
    );

    try {
      const data = await request({ query });
      return data.data.tagWallFeed;
    } catch (e) {
      throw e;
    }
  },


  async getOverview({
    page = 1,
    perPage = FEED_PER_PAGE,
    commentsPage,
    commentsPerPage,
    filter,
    tab,
    postTypeId,
  }) {
    const token = getToken();
    const query = tab === 'Posts' ?
      await GraphQLSchema[`getMany${filter}PostsQuery`](
        postTypeId,
        page,
        perPage,
        commentsPage,
        commentsPerPage,
        Boolean(token),
      ) : await GraphQLSchema[`getMany${filter}${tab}Query`](
        page,
        perPage,
      );

    try {
      const data = await request({ query });
      return data.data;
    } catch (e) {
      throw e;
    }
  },

  async getOverviewSide({
    page = 1,
    perPage = OVERVIEW_SIDE_PER_PAGE,
    filter,
    tab,
    side,
    postTypeId,
  }) {
    const query = tab === 'Posts' ?
      await GraphQLSchema[`getMany${side}For${filter}${tab}Query`](
        postTypeId,
        page,
        perPage,
      ) :
      await GraphQLSchema[`getMany${side}For${filter}${tab}Query`](
        page,
        perPage,
      );
    try {
      const data = await request({ query });
      return data.data;
    } catch (e) {
      throw e;
    }
  },

  async getBlockchainNodes(
    ordering = '-bp_status',
    page = 1,
    perPage = NODES_PER_PAGE,
  ) {
    const query = GraphQLSchema.getManyBlockchainNodes(
      ordering,
      page,
      perPage,
    );

    try {
      const data = await request({ query });
      return data.data.manyBlockchainNodes;
    } catch (e) {
      throw e;
    }
  },
};

