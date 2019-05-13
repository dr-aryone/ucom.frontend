export const FIRST_STEP_ID = 1;
export const SECOND_STEP_ID = 2;
export const THIRD_STEP_ID = 3;
export const FOUR_STEP_ID = 4;

export const FIRST_BRAINKEY_STEP_ID = 1;
export const SECOND_BRAINKEY_STEP_ID = 2;
export const THIRD_BRAINKEY_STEP_ID = 3;

const getInitialState = () => ({
  loading: false,
  accountName: '',
  accountNameIsValid: false,
  accountNameError: '',
  brainkey: '',
  activeStepId: FIRST_STEP_ID,
  activeBrainkeyStepId: FIRST_BRAINKEY_STEP_ID,
  isTrackingAllowed: true,
  userId: null,
  socialKey: null,
});

const registration = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'REGISTRATION_RESET':
      return getInitialState();

    case 'REGISTRATION_SET_STEP':
      return { ...state, activeStepId: action.payload };

    case 'REGISTRATION_SET_ACCOUNT_NAME':
      return { ...state, accountName: action.payload };

    case 'REGISTRATION_SET_ACCOUNT_NAME_ERROR':
      return { ...state, accountNameError: action.payload };

    case 'REGISTRATION_SET_ACCOUNT_NAME_IS_VALID':
      return { ...state, accountNameIsValid: action.payload };

    case 'REGISTRATION_SET_BRAINKEY_STEP':
      return { ...state, activeBrainkeyStepId: action.payload };

    case 'REGISTRATION_SET_BRAINKEY':
      return { ...state, brainkey: action.payload };

    case 'REGISTRATION_SET_BRAINKEY_IS_VALID':
      return { ...state, brainkeyIsValid: action.payload };

    case 'REGISTRATION_SET_LOADING':
      return { ...state, loading: action.payload };

    case 'REGISTRATION_SET_USER_ID':
      return { ...state, userId: action.payload };

    case 'REGISTRATION_SET_SOCIAL_KEY':
      return { ...state, socialKey: action.payload };

    case 'REGISTRATION_SET_IS_TRACKING_ALLOWED':
      return { ...state, isTrackingAllowed: action.payload };

    default:
      return state;
  }
};

export default registration;
