import humps from 'lodash-humps';

export const getYearOfDate = (date) => {
  if (!date) {
    return null;
  }

  return date.split('-')[0];
};

export const getUserName = (user) => {
  if (!user) {
    return null;
  }

  const userData = humps(user);

  if (userData.firstName) {
    return userData.firstName;
  }

  return userData.accountName;
};

export const userIsFollowed = (followers, userId) => {
  if (!followers || !followers.length || !userId) {
    return false;
  }

  return !!followers.find(i => +i.id === +userId);
};

export const userIsOwner = (user, owner) => user && owner && +user.id === +owner.id;
