import ecc from 'eosjs-ecc';
import humps from 'lodash-humps';
import param from 'jquery-param';
import HttpActions from './HttpActions';
import { getToken } from '../utils/token';
import { getActivePrivateKey } from '../utils/keys';
import { getBackendConfig } from '../utils/config';
import snakes from '../utils/snakes';
import { LIST_PER_PAGE } from '../utils/list';

const { Dictionary } = require('ucom-libs-wallet');

const BLOCK_PRODUCERS = Dictionary.BlockchainNodes.typeBlockProducer();
const CALCULATOR_NODES = Dictionary.BlockchainNodes.typeCalculator();

const { WalletApi, SocialApi } = require('ucom-libs-wallet');
const AppTransaction = require('ucom-libs-social-transactions');

const { TransactionFactory } = AppTransaction;

if (process.env.NODE_ENV === 'production') {
  TransactionFactory.initForProductionEnv();
  WalletApi.initForProductionEnv();
} else {
  TransactionFactory.initForStagingEnv();
  WalletApi.initForStagingEnv();
}

class Api {
  constructor() {
    this.actions = new HttpActions(getBackendConfig().httpEndpoint);
    this.uploaderActions = new HttpActions(getBackendConfig().uploaderEndpoint);
  }

  getPrivateHeaders() {
    return { Authorization: `Bearer ${getToken()}` };
  }

  async login({ brainkey, account_name }) {
    const activeKey = getActivePrivateKey(brainkey);
    const sign = ecc.sign(account_name, activeKey);
    const publicKey = ecc.privateToPublic(activeKey);
    const response = await this.actions.post('/api/v1/auth/login', {
      sign,
      account_name,
      public_key: publicKey,
    });
    return humps(response.data);
  }

  async register({ brainkey, accountName, isTrackingAllowed }) {
    const activeKey = getActivePrivateKey(brainkey);
    const sign = ecc.sign(accountName, activeKey);
    const publicKey = ecc.privateToPublic(activeKey);
    const response = await this.actions.post('/api/v1/auth/registration', {
      sign,
      brainkey,
      is_tracking_allowed: isTrackingAllowed,
      account_name: accountName,
      public_key: publicKey,
    });

    return humps(response.data);
  }

  async getMyself() {
    const response = await this.actions.get('/api/v1/myself');
    const data = humps(response.data);

    // API HOT FIX https://github.com/UOSnetwork/ucom.backend/issues/84
    data.organizations.forEach(item => delete item.followedBy);

    return data;
  }

  async patchMyself(data) {
    const response = await this.actions.patch('/api/v1/myself', snakes(data));

    return humps(response.data);
  }

  async getUser(id) {
    const response = await this.actions.get(`/api/v1/users/${id}`);

    return humps(response.data);
  }

  async getUsers(params) {
    const response = await this.actions.get(`/api/v1/users?${param(snakes(params))}&v2=true`);

    return humps(response.data);
  }

  async getOrganizations(params) {
    const response = await this.actions.get(`/api/v1/organizations?${param(params)}`);

    return humps(response.data);
  }

  async searchUsers(query) {
    const response = await this.actions.get(`/api/v1/users/search/?q=${query}`);

    return humps(response.data);
  }

  async createPost(data) {
    const response = await this.actions.post('/api/v1/posts', snakes(data));

    return response.data;
  }

  async repostPost(postId) {
    const response = await this.actions.post(`/api/v1/posts/${postId}/repost`);

    return response.data;
  }

  async updatePost(data, id) {
    const response = await this.actions.patch(`/api/v1/posts/${id}`, snakes(data));

    return humps(response.data);
  }

  async getPost(id) {
    const response = await this.actions.get(`/api/v1/posts/${id}`);

    return humps(response.data);
  }

  async getUserPosts(id) {
    const response = await this.actions.get(`/api/v1/users/${id}/posts`);

    return humps(response.data);
  }

  async getPosts(params) {
    const response = await this.actions.get(`/api/v1/posts?${param(snakes(params))}`);

    return humps(response.data);
  }

  async getTag(title) {
    const response = await this.actions.get(`/api/v1/tags/${title}`);

    return humps(response.data);
  }

  async getTagWallFeed({
    tagTitle,
    perPage,
    page,
    lastId,
  }) {
    const response = await this.actions.get(`/api/v1/tags/${tagTitle}/wall-feed/?page=${page}&per_page=${perPage}&last_id=${lastId}`);

    return humps(response.data);
  }

  async getTagOrgs({
    tagTitle,
    perPage,
    page,
    lastId,
  }) {
    const response = await this.actions.get(`/api/v1/tags/${tagTitle}/organizations/?page=${page}&per_page=${perPage}&last_id=${lastId}`);

    return humps(response.data);
  }

  async getTagUsers({
    tagTitle,
    perPage = LIST_PER_PAGE,
    page = 1,
    lastId,
  }) {
    const response = await this.actions.get(`/api/v1/tags/${tagTitle}/users/?&v2=true&page=${page}&per_page=${perPage}&last_id=${lastId}`);

    return humps(response.data);
  }

  async vote(isUp, postId, commentId) {
    let url = `/api/v1/posts/${postId}`;

    if (commentId) {
      url = `${url}/comments/${commentId}`;
    }

    url = `${url}/${isUp ? 'upvote' : 'downvote'}`;

    const response = await this.actions.post(url);

    return humps(response.data);
  }

  async checkAccountName(accountName) {
    const response = await this.actions.post('/api/v1/auth/registration/validate-account-name', {
      account_name: accountName,
    });

    return humps(response.data);
  }

  async follow(userId, token, senderAccountName, recipientAccountName, senderActivePrivateKey) {
    const signedTransaction = await TransactionFactory.getSignedUserFollowsUser(
      senderAccountName,
      senderActivePrivateKey,
      recipientAccountName,
      true,
    );

    const response = await this.actions.post(`/api/v1/users/${userId}/follow`, {
      signed_transaction: signedTransaction,
    });

    return response;
  }

  async unfollow(userId, token, senderAccountName, recipientAccountName, senderActivePrivateKey) {
    const signedTransaction = await TransactionFactory.getSignedUserUnfollowsUser(
      senderAccountName,
      senderActivePrivateKey,
      recipientAccountName,
      true,
    );

    const response = await this.actions.post(`/api/v1/users/${userId}/unfollow`, {
      signed_transaction: signedTransaction,
    });

    return humps(response.data);
  }

  async trustUser(ownerAccountName, userAccountName, userId, ownerPrivateKey) {
    const signedTransaction = await SocialApi.getTrustUserSignedTransactionsAsJson(
      ownerAccountName,
      ownerPrivateKey,
      userAccountName,
    );
    const response = await this.actions.post(`/api/v1/users/${userId}/trust`, {
      signed_transaction: signedTransaction,
    });

    return humps(response.data);
  }

  async untrustUser(ownerAccountName, userAccountName, userId, ownerPrivateKey) {
    const signedTransaction = await SocialApi.getUnTrustUserSignedTransactionsAsJson(
      ownerAccountName,
      ownerPrivateKey,
      userAccountName,
    );
    const response = await this.actions.post(`/api/v1/users/${userId}/untrust`, {
      signed_transaction: signedTransaction,
    });

    return humps(response.data);
  }

  async followOrganization(id, token, senderAccountName, recipientAccountName, senderActivePrivateKey) {
    const signedTransaction = await TransactionFactory.getSignedUserFollowsOrg(
      senderAccountName,
      senderActivePrivateKey,
      recipientAccountName,
    );

    const response = await this.actions.post(`/api/v1/organizations/${id}/follow`, {
      signed_transaction: signedTransaction,
    });

    return humps(response.data);
  }

  async unfollowOrganization(id, token, senderAccountName, recipientAccountName, senderActivePrivateKey) {
    const signedTransaction = await TransactionFactory.getSignedUserUnfollowsOrg(
      senderAccountName,
      senderActivePrivateKey,
      recipientAccountName,
    );
    const response = await this.actions.post(`/api/v1/organizations/${id}/unfollow`, {
      signed_transaction: signedTransaction,
    });

    return humps(response.data);
  }

  async join(userId) {
    const response = await this.actions.post(`/api/v1/posts/${userId}/join`);

    return humps(response.data);
  }

  async createComment(data, postId, commentId) {
    let url = `/api/v1/posts/${postId}/comments`;

    if (commentId) {
      url = `${url}/${commentId}/comments`;
    }

    const response = await this.actions.post(url, data);

    return humps(response.data);
  }

  async createOrganization(data) {
    const url = '/api/v1/organizations';
    const response = await this.actions.post(url, data);

    return response.data;
  }

  async updateOrganization(data) {
    const response = await this.actions.patch(`/api/v1/organizations/${data.id}`, data);

    return response.data;
  }

  async getOrganization(id) {
    const url = `/api/v1/organizations/${id}`;

    const response = await this.actions.get(url);

    return response.data;
  }

  async setDiscussions(organizationId, data) {
    const url = `/api/v1/organizations/${organizationId}/discussions`;
    const response = await this.actions.post(url, snakes(data));
    return humps(response.data);
  }

  async deleteAllDiscussions(organizationId) {
    const url = `/api/v1/organizations/${organizationId}/discussions`;
    const response = await this.actions.del(url);
    return humps(response.data);
  }

  async validateDiscussionsPostId(organizationId, postId) {
    const url = `/api/v1/organizations/${organizationId}/discussions/${postId}/validate`;
    const response = await this.actions.get(url);
    return humps(response.data);
  }

  async getOrganizationPosts(id) {
    const url = `/api/v1/organizations/${id}/posts`;

    const response = await this.actions.get(url);

    return humps(response.data);
  }

  async getOrganizationWallFeed({ organizationId, perPage, page }) {
    const url = `/api/v1/organizations/${organizationId}/wall-feed?per_page=${perPage}&page=${page}`;

    const response = await this.actions.get(url);

    return humps(response.data);
  }

  async searchCommunity(q) {
    const url = `/api/v1/community/search?q=${q}`;

    const response = await this.actions.get(url);

    return humps(response.data);
  }

  async searchPartnership(q) {
    const url = `/api/v1/partnership/search?q=${q}`;

    const response = await this.actions.get(url);

    return humps(response.data);
  }

  async createUserCommentPost({ userId, data }) {
    const url = `/api/v2/users/${userId}/posts`;
    const response = await this.actions.post(url, snakes(data));

    return humps(response.data);
  }

  async updateUserCommentPost(userId, postId, data) {
    const url = `/api/v2/users/${userId}/posts/${postId}`;
    const response = await this.actions.patch(url, data);

    return humps(response.data);
  }

  async createOrganizationsCommentPost({ organizationId, data }) {
    const url = `/api/v1/organizations/${organizationId}/posts`;
    const response = await this.actions.post(url, snakes(data));

    return humps(response.data);
  }

  async updateOrganizationsCommentPost(orgId, postId, data) {
    const url = `/api/v1/organizations/${orgId}/posts/${postId}`;
    const response = await this.actions.path(url, data);

    return humps(response.data);
  }

  async getUserWallFeed({ userId, perPage, page }) {
    const response = await this.actions.get(`/api/v1/users/${userId}/wall-feed?per_page=${perPage}&page=${page}`);

    return humps(response.data);
  }

  async getUserNewsFeed({ perPage, page }) {
    const response = await this.actions.get(`/api/v1/myself/news-feed?per_page=${perPage}&page=${page}`);

    return humps(response.data);
  }

  async getNotifications(perPage, page) {
    const response = await this.actions.get(`/api/v1/myself/notifications?per_page=${perPage}&page=${page}`);

    return humps(response.data);
  }

  async confirmNotification(id) {
    const response = await this.actions.post(`/api/v1/myself/notifications/${id}/confirm`);

    return humps(response.data);
  }


  async declineNotification(id) {
    const response = await this.actions.post(`/api/v1/myself/notifications/${id}/decline`);

    return humps(response.data);
  }

  async seenNotification(id) {
    const response = await this.actions.post(`/api/v1/myself/notifications/${id}/seen`);

    return humps(response.data);
  }

  async getAccountState(accountName) {
    const response = await WalletApi.getAccountState(accountName);

    return humps(response);
  }

  async getAccountBalance(accountName, symbol) {
    const response = await WalletApi.getAccountBalance(accountName, symbol);

    return humps(response);
  }

  async sendTokens(accountNameFrom, accountNameTo, amount, memo, privateKey) {
    const response = await WalletApi.sendTokens(accountNameFrom, privateKey, accountNameTo, amount, memo);

    return humps(response);
  }

  async stakeOrUnstakeTokens(accountName, netAmount, cpuAmount, privateKey) {
    const response = await WalletApi.stakeOrUnstakeTokens(
      accountName,
      privateKey,
      netAmount,
      cpuAmount,
    );

    return humps(response);
  }

  async getCurrentNetAndCpuStakedTokens(accountName) {
    const response = await WalletApi.getCurrentNetAndCpuStakedTokens(accountName);

    return humps(response);
  }

  async claimEmission(accountName, privateKey) {
    const response = await WalletApi.claimEmission(accountName, privateKey);

    return humps(response);
  }

  async getApproximateRamPriceByBytesAmount(bytesAmount) {
    const response = await WalletApi.getApproximateRamPriceByBytesAmount(bytesAmount);

    return humps(response);
  }

  async buyRam(accountName, bytesAmount, privateKey) {
    const response = await WalletApi.buyRam(accountName, privateKey, bytesAmount);

    return humps(response);
  }

  async sellRam(accountName, bytesAmount, privateKey) {
    const response = await WalletApi.sellRam(accountName, privateKey, bytesAmount);

    return humps(response);
  }

  async getNodes() {
    const response = await this.actions.get('/api/v1/blockchain/nodes/');

    return humps(response.data);
  }

  async voteForNodes(accountName, producers, privateKey, nodeType) {
    const voteFunctions = {
      [BLOCK_PRODUCERS]: WalletApi.voteForBlockProducers,
      [CALCULATOR_NODES]: WalletApi.voteForCalculatorNodes,
    };

    const response = await voteFunctions[nodeType](accountName, privateKey, producers);
    return humps(response);
  }

  async getTransactions(perPage, page) {
    const response = await this.actions.get(`/api/v1/myself/blockchain/transactions?per_page=${perPage}&page=${page}`);

    return humps(response.data);
  }

  async uploadPostImage(file) {
    const response = await this.uploaderActions.post('/api/v1/images/one-image', { one_image: file });

    return humps(response.data);
  }

  async getStats() {
    const response = await this.actions.get('/api/v1/stats/total');

    return humps(response.data);
  }

  async syncAccountGithub(options) {
    const response = await this.actions.post('/api/v1/users-external/users/pair', {}, options);

    return humps(response.data);
  }
}

export default new Api();
