import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import styles from './styles.css';
import Popup from '../Popup';
import IconClose from '../Icons/Close';
import Account from './Account';
import SocialKey from './SocialKey';
import NewSocialKey from './NewSocialKey';
import SaveSocialKey from './SaveSocialKey';
import { fetchUser } from '../../actions/users';
import loader from '../../utils/loader';
import { getUserById } from '../../store/users';
import urls from '../../utils/urls';
import { getUserName } from '../../utils/user';

const STEP_ACCOUNT = 1;
const STEP_SOCIAL_KEY = 2;
const STEP_NEW_SOCIAL_KEY = 3;
const STEP_SAVE_SOCIAL_KEY = 4;

const ERROR_ACCOUNT_NOT_EXIST = 'Such Фccount does not exist in a blockchain';

const Auth = (props) => {
  const [currentStep, setCurrentStep] = useState(STEP_ACCOUNT);
  const [loading, setLoading] = useState(false);
  const [accountError, setAccountError] = useState('');
  const [socialKeyError, setSocialKeyError] = useState('');
  const [userId, setUserId] = useState(null);
  const user = getUserById(props.users, userId);

  return (
    <Popup
      onClickClose={props.onClickClose}
    >
      <div className={styles.auth}>
        <div
          role="presentation"
          className={styles.close}
          onClick={props.onClickClose}
        >
          <span className={styles.icon}>
            <IconClose />
          </span>
        </div>

        {(() => {
          switch (currentStep) {
            case STEP_SOCIAL_KEY:
              return user && (
                <SocialKey
                  error={socialKeyError}
                  loading={loading}
                  userName={getUserName(user)}
                  userAccountName={user.accountName}
                  userAvatarSrc={urls.getFileUrl(user.avatarFilename)}
                  onClickBack={() => setCurrentStep(STEP_ACCOUNT)}
                  onClickNewKeys={() => setCurrentStep(STEP_NEW_SOCIAL_KEY)}
                  onSubmit={() => {
                    // TODO: Auth with social key, need backed
                  }}
                />
              );
            case STEP_NEW_SOCIAL_KEY:
              return (
                <NewSocialKey
                  onClickBack={() => setCurrentStep(STEP_SOCIAL_KEY)}
                  onClickProceed={() => setCurrentStep(STEP_SAVE_SOCIAL_KEY)}
                />
              );
            case STEP_SAVE_SOCIAL_KEY:
              return (
                <SaveSocialKey
                  onClickBack={() => setCurrentStep(STEP_SOCIAL_KEY)}
                />
              );
            default:
              return (
                <Account
                  loading={loading}
                  error={accountError}
                  onChange={() => {
                    setAccountError('');
                  }}
                  onSubmit={async (accountName) => {
                    setLoading(true);
                    loader.start();
                    try {
                      const userData = await props.dispatch(fetchUser(accountName));
                      setAccountError('');
                      setUserId(userData.id);
                      setCurrentStep(STEP_SOCIAL_KEY);
                    } catch (e) {
                      setAccountError(ERROR_ACCOUNT_NOT_EXIST);
                    }
                    setLoading(false);
                    loader.done();
                  }}
                />
              );
          }
        })()}
      </div>
    </Popup>
  );
};

Auth.propTypes = {
  onClickClose: PropTypes.func,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
};

Auth.defaultProps = {
  onClickClose: undefined,
};

export default connect(state => ({
  users: state.users,
}))(memo(Auth));
