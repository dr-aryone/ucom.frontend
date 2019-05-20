import humps from 'lodash-humps';
import api from '../api';
import snakes from '../utils/snakes';
import { parseErrors } from '../utils/errors';
import { addValidationErrorNotification } from './notifications';
import loader from '../utils/loader';

export const setOrganizationActiveTab = payload => ({ type: 'SET_ORGANIZATION_ACTIVE_TAB', payload });
export const setOrganizationData = payload => ({ type: 'SET_ORGANIZATION_DATA', payload });
export const setOrganizationErrors = payload => ({ type: 'SET_ORGANIZATION_ERRORS', payload });
export const setOrganizationSaved = payload => ({ type: 'SET_ORGANIZATION_SAVED', payload });
export const setOrganizationLoading = payload => ({ type: 'SET_ORGANIZATION_LOADING', payload });
export const setOrganizationEntitySources = payload => ({ type: 'SET_ORGANIZATION_ENTITY_SOURCES', payload });
export const setOrganizationEntitySource = payload => ({ type: 'SET_ORGANIZATION_ENTITY_SOURCE', payload });
export const addOrganizationCommunitiesNetwork = payload => ({ type: 'ADD_ORGANIZATION_COMMUNITIES_NETWORK', payload });
export const removeOrganizationCommunitiesNetwork = payload => ({ type: 'REMOVE_ORGANIZATION_COMMUNITIES_NETWORK', payload });
export const addOrganizationPartnershipNetwork = payload => ({ type: 'ADD_ORGANIZATION_PARTNERSHIP_NETWORK', payload });
export const removeOrganizationPartnershipNetwork = payload => ({ type: 'REMOVE_ORGANIZATION_PARTNERSHIP_NETWORK', payload });
export const resetOrganizationData = () => ({ type: 'RESET_ORGANIZATION' });

export const saveOrganization = payload => async (dispatch) => {
  loader.start();
  dispatch(setOrganizationLoading(true));

  try {
    const saveFn = (payload.id ? api.updateOrganization : api.createOrganization).bind(api);
    const data = await saveFn(snakes(payload));
    dispatch(setOrganizationData(data));
    dispatch(setOrganizationSaved(true));
  } catch (e) {
    const errors = parseErrors(e);
    dispatch(setOrganizationErrors(errors));
    dispatch(addValidationErrorNotification());
  }

  loader.done();
  dispatch(setOrganizationLoading(false));
};

export const fetchOrganization = payload => (dispatch) => {
  loader.start();
  dispatch(setOrganizationLoading(true));
  api.getOrganization(payload)
    .then((data) => {
      dispatch(setOrganizationData(humps(data.data)));
      dispatch(setOrganizationEntitySources(humps(data.data.social_networks)));
      dispatch(setOrganizationLoading(false));
    })
    .catch(() => loader.done())
    .then(() => loader.done());
};

export const setDiscussions = ({
  organizationId,
  discussions,
}) => async () => {
  loader.start();
  try {
    if (discussions.length) {
      await api.setDiscussions(organizationId, snakes({ discussions }));
    } else {
      await api.deleteAllDiscussions(organizationId).bind(api);
    }
  } catch (e) {
    console.error(e);
    // TODO: Show error notification
  }
  loader.done();
};
