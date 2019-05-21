import { uniqBy, compact } from 'lodash';

const getInitialState = () => ({
  data: {},
});

const organizations = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'ORGANIZATIONS_RESET': {
      return getInitialState();
    }

    case 'ADD_ORGANIZATIONS': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, action.payload
          .filter(item => item && item.id)
          .reduce((value, item) => ({ ...value, [item.id]: Object.assign({}, state.data[item.id], item) }), {})),
      });
    }

    case 'ADD_ORGANIZATION_FOLLOWER': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.organizationId]: Object.assign({}, state.data[action.payload.organizationId], {
            followedBy: uniqBy(compact([].concat(
              state.data[action.payload.organizationId].followedBy,
              action.payload.user,
            )), item => item.id),
          }),
        }),
      });
    }

    case 'REMOVE_ORGANIZATION_FOLLOWER': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          [action.payload.organizationId]: Object.assign({}, state.data[action.payload.organizationId], {
            followedBy: state.data[action.payload.organizationId].followedBy.filter(item => item.id !== action.payload.user.id),
          }),
        }),
      });
    }

    default: {
      return state;
    }
  }
};

export const getOrganizationById = (organizations, organizationId) =>
  organizations.data[organizationId];

export const getOrganizationByIds = (organizations, ids = [], limit) => {
  let result = ids.map(id => getOrganizationById(organizations, id))
    .filter(organization => Boolean(organization));

  if (limit) {
    result = result.slice(0, limit);
  }

  return result;
};

export default organizations;
