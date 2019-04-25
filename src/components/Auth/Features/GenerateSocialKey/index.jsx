import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Popup, { Content } from '../../../Popup';
import Brainkey from '../../Screens/Brainkey';
import Key from '../../Screens/Key';
import SaveKey from '../../Screens/SaveKey';
import { getSocialPrivateKeyByBrainkey, getSocialPrivateKeyByActiveKey } from '../../../../utils/keys';
import { addErrorNotification } from '../../../../actions/notifications';

const STEP_BRAINKEY = 1;
const STEP_ACTIVE_KEY = 2;
const STEP_SAVE_KEY = 3;

const GenerateSocialKey = (props) => {
  const [currentStep, setCurrentStep] = useState(STEP_BRAINKEY);
  const [socialKey, setSocailKey] = useState(null);

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
                    try {
                      setSocailKey(getSocialPrivateKeyByActiveKey(activeKey));
                      setCurrentStep(STEP_SAVE_KEY);
                    } catch (e) {
                      props.dispatch(addErrorNotification(e.message));
                    }
                  }}
                  onClickBack={() => {
                    setSocailKey(null);
                    setCurrentStep(STEP_BRAINKEY);
                  }}
                />
              );

            case STEP_SAVE_KEY:
              return (
                <SaveKey
                  title="Save your Private Social Key"
                  copyText={socialKey}
                  proceedAsLink={false}
                  proceedText="Finish"
                  onClickProceed={() => {
                    props.onSubmit(socialKey);
                  }}
                />
              );

            default:
              return (
                <Brainkey
                  title="Generate Social Key with Brainkey"
                  backText="I have Private Active key"
                  onSubmit={(brainkey) => {
                    try {
                      setSocailKey(getSocialPrivateKeyByBrainkey(brainkey));
                      setCurrentStep(STEP_SAVE_KEY);
                    } catch (e) {
                      props.dispatch(addErrorNotification(e.message));
                    }
                  }}
                  onClickBack={() => {
                    setSocailKey(null);
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

GenerateSocialKey.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  closeText: PropTypes.string,
};

GenerateSocialKey.defaultProps = {
  closeText: undefined,
};

export default connect()(GenerateSocialKey);
