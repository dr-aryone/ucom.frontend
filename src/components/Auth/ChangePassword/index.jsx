import React, { useState } from 'react';
import Popup, { Content } from '../../Popup';
import Brainkey from './Brainkey';
import ActiveKey from './ActiveKey';
import Password from './Password';

const STEP_BRAINKEY = 1;
const STEP_ACTIVE_KEY = 2;
const STEP_PASSWORD = 3;

const ChangePassword = () => {
  const [currentStep, setCurrentStep] = useState(STEP_BRAINKEY);

  return (
    <Popup onClickClose={() => {}}>
      <Content onClickClose={() => {}}>
        {(() => {
          switch (currentStep) {
            case STEP_ACTIVE_KEY:
              return (
                <ActiveKey
                  onSubmit={(activeKey) => {
                    setCurrentStep(STEP_PASSWORD);
                    console.log(activeKey);
                  }}
                  onClickBack={() => {
                    setCurrentStep(STEP_BRAINKEY);
                  }}
                />
              );

            case STEP_PASSWORD:
              return (
                <Password />
              );

            default:
              return (
                <Brainkey
                  onSubmit={(brainkey) => {
                    setCurrentStep(STEP_PASSWORD);
                    console.log(brainkey);
                  }}
                  onClickActiveKey={() => {
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

};

ChangePassword.defaultProps = {
};

export default ChangePassword;
