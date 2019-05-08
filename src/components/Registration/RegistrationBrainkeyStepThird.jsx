import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment, useState } from 'react';
import Button from '../Button';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import { registrationSetStep } from '../../actions/registration';
import { THIRD_STEP_ID } from '../../store/registration';

const RegistrationBrainkeyStepThird = ({
  registration: { brainkey },
  registrationSetStep,
}) => {
  const [brainkeyPopupVisible, setBrainkeyPopupVisible] = useState(false);
  const [brainkeyPopupAgree, setBrainkeyPopupAgree] = useState(false);

  return (
    <Fragment>
      <div className="registration__text">
        <div className="text">
          <p>Write it down on a paper <span role="img" aria-label="Paper">📝</span>, make a photo <span role="img" aria-label="Photo">📷</span></p>
        </div>
      </div>

      <div className="registration-brainkey">
        {brainkey.split(' ').map((item, index) => (
          <div className="registration-brainkey__item" key={index} data-index={index + 1}>{item}&nbsp;</div>
        ))}
      </div>

      {!brainkeyPopupAgree ? (
        <div className="registration__action">
          <Button
            isStretched
            isUpper
            size="big"
            theme="red"
            type="submit"
            text="Proceed"
            onClick={() => {
              setBrainkeyPopupVisible(true);
            }}
          />
        </div>
      ) : (
        <div className="registration__action registration__action_fluid">
          <Button
            isUpper
            size="big"
            theme="red"
            type="submit"
            text="I’ve saved it, Proceed"
            onClick={() => {
              registrationSetStep(THIRD_STEP_ID);
            }}
          />
        </div>
      )}

      {brainkeyPopupVisible &&
        <Popup
          onClickClose={() => {
            setBrainkeyPopupVisible(false);
          }}
        >
          <ModalContent mod="brainkey-info">
            <div className="registration__title">
              <h3 className="title title_small">The Brainkey cannot be restored if lost</h3>
            </div>

            <div className="registration__text">
              <div className="text">
                <p>Write down or memorize your Brainkey. The Brainkey is your access to your account. <strong>It can’t be restored</strong></p>
              </div>
            </div>

            <div className="registration__action">
              <Button
                isStretched
                isUpper
                size="big"
                theme="red"
                type="submit"
                text="Got it"
                onClick={() => {
                  setBrainkeyPopupVisible(false);
                  setBrainkeyPopupAgree(true);
                }}
              />
            </div>
          </ModalContent>
        </Popup>
      }
    </Fragment>
  );
};

RegistrationBrainkeyStepThird.propTypes = {
  registration: PropTypes.shape({
    brainkey: PropTypes.string,
  }).isRequired,
  registrationSetStep: PropTypes.func.isRequired,
};

export default connect(state => ({
  registration: state.registration,
}), {
  registrationSetStep,
})(RegistrationBrainkeyStepThird);
