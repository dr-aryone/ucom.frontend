import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import Popup, { Content } from '../../../Popup';
import PasswordSet from './PasswordSet';
import ActiveKey from './ActiveKey';
import Password from './Password';
import ChangePassword from '../ChangePassword';
import { activeKeyIsExists, restoreActiveKey } from '../../../../utils/keys';

const STEP_PASSWORD_SET = 1;
const STEP_PASSWORD = 2;
const STEP_ACTIVE_KEY = 3;
const STEP_PASSWORD_CREATE = 4;

const GetActiveKey = (props) => {
  const [currentStep, setCurrentStep] = useState(null);
  const [visible, setVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const resetStep = () => {
    if (activeKeyIsExists()) {
      setCurrentStep(STEP_PASSWORD);
    } else {
      setCurrentStep(STEP_PASSWORD_SET);
    }
  };

  const show = () => {
    resetStep();
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <Fragment>
      {props.children(show)}

      {visible && (() => {
        switch (currentStep) {
          case STEP_PASSWORD_CREATE:
            return (
              <ChangePassword
                description="To send this transaction, you need a Private Active Key. We generate it from your Brainkey."
                onClickClose={resetStep}
                onSubmit={resetStep}
              />
            );

          case STEP_PASSWORD_SET:
          case STEP_PASSWORD:
          case STEP_ACTIVE_KEY:
            return (
              <Popup onClickClose={hide}>
                <Content
                  walletAction
                  roundBorders={false}
                  onClickClose={hide}
                >
                  {(() => {
                    switch (currentStep) {
                      case STEP_PASSWORD:
                        return (
                          <Password
                            error={passwordError}
                            onChange={() => setPasswordError('')}
                            onClickActiveKey={() => setCurrentStep(STEP_ACTIVE_KEY)}
                            onSubmit={(password) => {
                              try {
                                const activeKey = restoreActiveKey(password);
                                props.onSubmit(activeKey);
                                hide();
                              } catch (e) {
                                setPasswordError(e.message);
                              }
                            }}
                          />
                        );

                      case STEP_ACTIVE_KEY:
                        return (
                          <ActiveKey
                            onClickSetPassword={() => setCurrentStep(STEP_PASSWORD_CREATE)}
                            onSubmit={props.onSubmit}
                          />
                        );

                      case STEP_PASSWORD_SET:
                        return (
                          <PasswordSet
                            onSubmit={() => setCurrentStep(STEP_PASSWORD_CREATE)}
                            onClickActiveKey={() => setCurrentStep(STEP_ACTIVE_KEY)}
                          />
                        );

                      default:
                        return null;
                    }
                  })()}
                </Content>
              </Popup>
            );

          default:
            return null;
        }
      })()}
    </Fragment>
  );
};

GetActiveKey.propTypes = {
  children: PropTypes.func.isRequired,
};

export default GetActiveKey;
