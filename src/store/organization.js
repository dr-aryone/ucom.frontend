import Validator from './../utils/validator';

export const SOURCES_ID_FACEBOOK = 1;
export const SOURCES_ID_REDDIT = 2;
export const SOURCES_ID_MEDIUM = 3;
export const SOURCES_ID_TWITTER = 4;
export const SOURCES_ID_GITHUB = 5;
export const STEPS_ID_GENERAL = 1;
export const STEPS_ID_COMMUNITY = 2;
export const STEPS_ID_CONTACTS = 3;
export const USERS_TEAM_STATUS_ID_PENDING = 0;
export const USERS_TEAM_STATUS_ID_CONFIRMED = 1;
export const USERS_TEAM_STATUS_ID_DECLINED = 2;

const getInitialState = () => ({
  data: {
    title: null,
    nickname: null,
    avatarFilename: null,
    currencyToShow: null,
    poweredBy: null,
    about: null,
    country: null,
    city: null,
    address: null,
    email: null,
    phoneNumber: null,
    personalWebsiteUrl: null,
    socialNetworks: [{
      sourceTypeId: SOURCES_ID_FACEBOOK,
      sourceUrl: '',
    }, {
      sourceTypeId: SOURCES_ID_REDDIT,
      sourceUrl: '',
    }, {
      sourceTypeId: SOURCES_ID_MEDIUM,
      sourceUrl: '',
    }, {
      sourceTypeId: SOURCES_ID_TWITTER,
      sourceUrl: '',
    }, {
      sourceTypeId: SOURCES_ID_GITHUB,
      sourceUrl: '',
    }],
    communitySources: [],
    partnershipSources: [],
  },
  loading: false,
  saved: false,
  errors: {},
  isValid: false,
  activeStepId: STEPS_ID_GENERAL,
  communitieFromVisible: false,
  steps: [{
    id: STEPS_ID_GENERAL,
    name: 'General info',
    rules: {
      title: 'required',
      nickname: 'required',
    },
    fields: [
      'title',
      'nickname',
      'avatarFilename',
      'currencyToShow',
      'poweredBy',
      'about',
      'country',
      'city',
      'address',
    ],
  }, {
    id: STEPS_ID_COMMUNITY,
    name: 'Community',
    fields: [
      'communitySources',
      'partnershipSources',
    ],
  }, {
    id: STEPS_ID_CONTACTS,
    name: 'Contacts',
    rules: {
      email: 'email',
      personalWebsiteUrl: 'shortUrl',
    },
    fields: [
      'email',
      'phoneNumber',
      'personalWebsiteUrl',
    ],
  }],
});

const organization = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'RESET_ORGANIZATION': {
      return getInitialState();
    }

    case 'SET_ORGANIZATION_DATA': {
      delete action.payload.socialNetworks;

      const keys = Object.keys(action.payload);
      const data = Object.assign({}, state.data, action.payload);
      const activeStep = state.steps.find(step => step.id === state.activeStepId);
      const validation = new Validator(data, activeStep.rules);
      const isValid = validation.passes();
      const currentErrors = keys.reduce((value, key) => ({ ...value, [key]: validation.errors.get(key) }), {});
      const errors = Object.assign({}, state.errors, currentErrors);

      return Object.assign({}, state, {
        data,
        isValid,
        errors,
      });
    }

    case 'SET_ORGANIZATION_ACTIVE_TAB': {
      const activeStep = state.steps.find(step => step.id === state.activeStepId);
      const validation = new Validator(state.data, activeStep.rules);
      const isValid = validation.passes();

      return Object.assign({}, state, {
        activeStepId: action.payload,
        isValid,
      });
    }

    case 'SET_ORGANIZATION_SAVED': {
      return { ...state, saved: action.payload };
    }

    case 'SET_ORGANIZATION_LOADING': {
      return { ...state, loading: action.payload };
    }

    case 'SET_ORGANIZATION_ENTITY_SOURCES': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          socialNetworks: state.data.socialNetworks
            .map(source => Object.assign({}, source, action.payload
              .find(item => source.sourceTypeId === item.sourceTypeId))),
        }),
      });
    }

    case 'SET_ORGANIZATION_ENTITY_SOURCE': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          socialNetworks: state.data.socialNetworks
            .map(source => Object.assign({}, source, source.sourceTypeId === action.payload.sourceTypeId ?
              action.payload : {})),
        }),
      });
    }

    case 'ADD_ORGANIZATION_COMMUNITIES_NETWORK': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          communitySources: (action.payload.id ?
            state.data.communitySources.filter(item => item.id !== action.payload.id) :
            state.data.communitySources).concat(action.payload),
        }),
      });
    }

    case 'REMOVE_ORGANIZATION_COMMUNITIES_NETWORK': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          communitySources: state.data.communitySources
            .filter((item, index) => index !== action.payload),
        }),
      });
    }

    case 'ADD_ORGANIZATION_PARTNERSHIP_NETWORK': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          partnershipSources: (action.payload.id ?
            state.data.partnershipSources.filter(item => item.id !== action.payload.id) :
            state.data.partnershipSources).concat(action.payload),
        }),
      });
    }

    case 'REMOVE_ORGANIZATION_PARTNERSHIP_NETWORK': {
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          partnershipSources: state.data.partnershipSources
            .filter((item, index) => index !== action.payload),
        }),
      });
    }

    case 'SET_ORGANIZATION_ERRORS': {
      return Object.assign({}, state, {
        errors: action.payload.reduce((value, item) => ({ ...value, [item.field]: [item.message] }), {}),
        activeStepId: state.steps.find(item => item.fields.indexOf(action.payload[0].field) > -1).id,
        isValid: false,
      });
    }

    default: {
      return state;
    }
  }
};

export default organization;
