import api from '../api';
import snakes from '../utils/snakes';
import { getToken, removeToken } from '../utils/token';
import loader from '../utils/loader';
import graphql from '../api/graphql';
// import { enableGtm } from '../utils/gtm';
import { addServerErrorNotification } from './notifications';
import { setUser, setUserLoading } from './';
import { siteNotificationsSetUnreadAmount } from './siteNotifications';
import { getAccountState } from './wallet';
import { addOrganizations } from './organizations';

export const usersAddIFollow = payload => ({ type: 'USERS_ADD_I_FOLLOW', payload });
export const usersRemoveIFollow = payload => ({ type: 'USERS_REMOVE_I_FOLLOW', payload });
export const usersAddFollowedBy = payload => ({ type: 'USERS_ADD_FOLLOWED_BY', payload });
export const usersRemoveFollowedBy = payload => ({ type: 'USERS_REMOVE_FOLLOWED_BY', payload });

export const addUsers = (data = []) => (dispatch) => {
  let users = [];
  let organizations = [];

  data.forEach((user) => {
    if (user.followedBy) {
      users = users.concat(user.followedBy);
      user.followedBy = user.followedBy.map(u => u.id);
    }

    if (user.iFollow) {
      users = users.concat(user.iFollow);
      user.iFollow = user.iFollow.map(u => u.id);
    }

    if (user.organizations) {
      organizations = organizations.concat(user.organizations);
    }

    users.push(user);
  });

  dispatch(addOrganizations(organizations));
  dispatch({ type: 'USERS_ADD', payload: users });
};

export const fetchMyself = () => async (dispatch) => {
  const token = getToken();

  if (!token) {
    return;
  }

  dispatch(setUserLoading(true));
  loader.start();

  try {
    const data = await api.getMyself(token);

    dispatch(setUser(data));
    dispatch(addUsers([data]));
    dispatch(siteNotificationsSetUnreadAmount(data.unreadMessagesCount));
    dispatch(getAccountState());

    // TODO: Сделать disable
    // if (process.env.NODE_ENV === 'production' && data.isTrackingAllowed) {
    //   enableGtm();
    // }
  } catch (e) {
    console.error(e);
    removeToken();
  }

  dispatch(setUserLoading(false));
  loader.done();
};

export const fetchUser = userIdentity => async (dispatch) => {
  try {
    const data = await graphql.fetchUser({ userIdentity });
    dispatch(addUsers([data]));
    return data;
  } catch (e) {
    throw e;
  }
};

export const fetchUserPageData = ({
  userIdentity,
  trustedByOrderBy,
  trustedByPerPage,
  trustedByPage,
}) => async (dispatch) => {
  try {
    const data = await graphql.getUserPageData({
      userIdentity,
      trustedByOrderBy,
      trustedByPerPage,
      trustedByPage,
    });
    const { oneUser, oneUserTrustedBy } = data;
    dispatch(addUsers(oneUserTrustedBy.data.concat([oneUser])));
    return data;
  } catch (e) {
    throw e;
  }
};

export const fetchUserTrustedBy = ({
  userIdentity,
  orderBy,
  perPage,
  page,
}) => async (dispatch) => {
  try {
    const data = await graphql.getUserTrustedBy({
      userIdentity,
      orderBy,
      perPage,
      page,
    });
    dispatch(addUsers(data.data));
    return data;
  } catch (e) {
    throw e;
  }
};

export const updateUser = payload => async (dispatch) => {
  loader.start();

  try {
    const data = await api.patchMyself(snakes(payload));

    delete data.currentRate;

    dispatch(addUsers([data]));
  } catch (e) {
    console.error(e);
    dispatch(addServerErrorNotification(e));
  }

  loader.done();
};

export const followUser = data => async (dispatch) => {
  loader.start();

  try {
    await api.follow(data.user.id, getToken(), data.owner.accountName, data.user.accountName);

    dispatch(usersAddIFollow({
      ownerId: Number(data.owner.id),
      userId: data.user.id,
    }));

    dispatch(usersAddFollowedBy({
      ownerId: Number(data.user.id),
      userId: data.owner.id,
    }));
  } catch (e) {
    console.error(e);
    dispatch(addServerErrorNotification(e));
  }

  loader.done();
};

export const unfollowUser = data => async (dispatch) => {
  loader.start();

  try {
    await api.unfollow(data.user.id, getToken(), data.owner.accountName, data.user.accountName);

    dispatch(usersRemoveIFollow({
      ownerId: Number(data.owner.id),
      userId: data.user.id,
    }));

    dispatch(usersRemoveFollowedBy({
      ownerId: Number(data.user.id),
      userId: data.owner.id,
    }));
  } catch (e) {
    console.error(e);
    dispatch(addServerErrorNotification(e));
  }

  loader.done();
};

export const getManyUsers = ({
  airdropFilter,
  orderBy,
  page,
  perPage,
  isMyself,
}) => async (dispatch) => {
  try {
    const data = await graphql.getManyUsers({
      airdropFilter,
      orderBy,
      page,
      perPage,
      isMyself,
    });
    // console.log('users: ', data);
    dispatch(addUsers([data]));
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const trustUser = ({
  userId,
  userAccountName,
  ownerAccountName,
}) => async (dispatch) => {
  try {
    await api.trustUser(
      ownerAccountName,
      userAccountName,
      userId,
    );
    dispatch({
      type: 'USERS_SET_TRUST',
      payload: {
        userId,
        trust: true,
      },
    });
  } catch (e) {
    console.error(e);
    dispatch(addServerErrorNotification(e));
  }
};

export const untrustUser = ({
  userId,
  userAccountName,
  ownerAccountName,
}) => async (dispatch) => {
  try {
    await api.untrustUser(
      ownerAccountName,
      userAccountName,
      userId,
    );
    dispatch({
      type: 'USERS_SET_TRUST',
      payload: {
        userId,
        trust: false,
      },
    });
  } catch (e) {
    console.error(e);
    dispatch(addServerErrorNotification(e));
  }
};
