import humps from 'lodash-humps';
import api from '../api';
import { addUsers } from './users';
import { getToken } from '../utils/token';

export const addOrganizations = payload => ({ type: 'ADD_ORGANIZATIONS', payload });
export const addOrganizationFollower = payload => ({ type: 'ADD_ORGANIZATION_FOLLOWER', payload });
export const removeOrganizationFollower = payload => ({ type: 'REMOVE_ORGANIZATION_FOLLOWER', payload });

export const getOrganization = organizationId => async (dispatch) => {
  try {
    const data = humps(await api.getOrganization(organizationId));
    dispatch(addUsers([data.data.user].concat(data.data.followedBy, data.data.usersTeam)));
    dispatch(addOrganizations([data.data]));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const followOrganization = ({
  organization,
  owner,
  activeKey,
}) => async (dispatch) => {
  try {
    await api.followOrganization(
      organization.id,
      getToken(),
      owner.accountName,
      organization.blockchainId,
      activeKey,
    );
    dispatch(addOrganizationFollower({
      organizationId: organization.id,
      user: owner,
    }));
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const unfollowOrganization = ({
  organization,
  owner,
  activeKey,
}) => async (dispatch) => {
  try {
    await api.unfollowOrganization(
      organization.id,
      getToken(),
      owner.accountName,
      organization.blockchainId,
      activeKey,
    );
    dispatch(removeOrganizationFollower({
      organizationId: organization.id,
      user: owner,
    }));
  } catch (e) {
    console.error(e);
    throw e;
  }
};
