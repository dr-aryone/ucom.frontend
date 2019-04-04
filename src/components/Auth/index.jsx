import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import styles from './styles.css';
import Popup from '../Popup';
import IconClose from '../Icons/Close';
import Account from './Account';
import SocialKey from './SocialKey';
import NewSocialKey from './NewSocialKey';
import SaveSocialKey from './SaveSocialKey';

const STEP_ACCOUNT = 1;
const STEP_SOCIAL_KEY = 2;
const STEP_NEW_SOCIAL_KEY = 3;
const STEP_SAVE_SOCIAL_KEY = 4;

const Auth = (props) => {
  const [currentStep, setCurrentStep] = useState(STEP_ACCOUNT);

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
              return (
                <SocialKey
                  onClickBack={() => setCurrentStep(STEP_ACCOUNT)}
                  onClickNewKeys={() => setCurrentStep(STEP_NEW_SOCIAL_KEY)}
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
                  onClickProceed={() => setCurrentStep(STEP_SOCIAL_KEY)}

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
};

Auth.defaultProps = {
  onClickClose: undefined,
};

export default memo(Auth);
