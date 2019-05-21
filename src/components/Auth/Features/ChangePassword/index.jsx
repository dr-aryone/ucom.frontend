import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Popup, { Content } from '../../../Popup';
import Brainkey from '../../Screens/Brainkey';
import Key from '../../Screens/Key';
import Password from './Password';
import { getActivePrivateKey, saveAndEncryptActiveKey } from '../../../../utils/keys';
import { addSuccessNotification, addErrorNotification } from '../../../../actions/notifications';

const STEP_BRAINKEY = 1;
const STEP_ACTIVE_KEY = 2;
const STEP_PASSWORD = 3;

const ChangePassword = (props) => {
  const [currentStep, setCurrentStep] = useState(STEP_BRAINKEY);
  const [brainkey, setBrainkey] = useState(null);
  const [activeKeyValue, setActiveKeyValue] = useState(null);

  return (
    <Popup onClickClose={props.onClickClose}>
      <Content
        fullHeight
        closeText={props.closeText}
        onClickClose={props.onClickClose}
      >
        {(() => {
          switch (currentStep) {
            case STEP_ACTIVE_KEY:
              return (
                <Key
                  onSubmit={(activeKey) => {
                    setActiveKeyValue(activeKey);
                    setCurrentStep(STEP_PASSWORD);
                  }}
                  onClickBack={() => {
                    setCurrentStep(STEP_BRAINKEY);
                  }}
                />
              );

            case STEP_PASSWORD:
              return (
                <Password
                  onSubmit={(password) => {
                    try {
                      let activeKey;
                      if (brainkey) {
                        activeKey = getActivePrivateKey(brainkey);
                      } else if (activeKeyValue) {
                        activeKey = activeKeyValue;
                      } else {
                        setCurrentStep(STEP_BRAINKEY);
                        return;
                      }
                      saveAndEncryptActiveKey(activeKey, password);
                      props.onSubmit();
                      props.dispatch(addSuccessNotification('Password for Active Key has changed'));
                    } catch (e) {
                      props.dispatch(addErrorNotification(e.message));
                    }
                  }}
                />
              );

            default:
              return (
                <Brainkey
                  title="Generate Private Active Key with Brainkey"
                  description={props.description}
                  backText="I have Active Private key"
                  onSubmit={(brainkey) => {
                    setBrainkey(brainkey);
                    setCurrentStep(STEP_PASSWORD);
                  }}
                  onClickBack={() => {
                    setCurrentStep(STEP_ACTIVE_KEY);
                  }}
                />
              );
          }
        })()}
      </Content>
    </Popup>
  );
};

ChangePassword.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  description: Brainkey.propTypes.description,
  closeText: PropTypes.string,
};

ChangePassword.defaultProps = {
  description: Brainkey.defaultProps.description,
  closeText: undefined,
};

export default connect()(ChangePassword);
