import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Popup, { Content } from '../../../Popup';
import Brainkey from '../../Screens/Brainkey';
import Key from '../../Screens/Key';
import SaveKey from '../../Screens/SaveKey';

const STEP_BRAINKEY = 1;
const STEP_ACTIVE_KEY = 2;
const STEP_SAVE_KEY = 3;

const GenerateSocialKey = (props) => {
  const [currentStep, setCurrentStep] = useState(STEP_BRAINKEY);

  return (
    <Popup onClickClose={props.onClickClose}>
      <Content onClickClose={props.onClickClose}>
        {(() => {
          switch (currentStep) {
            case STEP_ACTIVE_KEY:
              return (
                <Key
                  onSubmit={(activeKey) => {
                    setCurrentStep(STEP_SAVE_KEY);
                    console.log(activeKey);
                  }}
                  onClickBack={() => {
                    setCurrentStep(STEP_BRAINKEY);
                  }}
                />
              );

            case STEP_SAVE_KEY:
              return (
                <SaveKey
                  title="Save your Private Social Key"
                  copyText="5JoEYU5adMz2GvfaacAntwPsZbFEzBMZafpTXJG6EkZf6dsKvjy"
                  proceedAsLink={false}
                  proceedText="Finish"
                  onClickProceed={() => {
                    if (props.onClickClose) {
                      props.onClickClose();
                    }
                  }}
                />
              );

            default:
              return (
                <Brainkey
                  title="Generate Social Key with Brainkey"
                  backText="I have Private Active key"
                  onSubmit={(brainkey) => {
                    setCurrentStep(STEP_SAVE_KEY);
                    console.log(brainkey);
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

GenerateSocialKey.propTypes = {
  onClickClose: PropTypes.func.isRequired,
};

export default GenerateSocialKey;
