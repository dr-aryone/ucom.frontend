import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import Button from '../Button';
import RegistrationAccountField from './RegistrationAccountField';
import { FIRST_STEP_ID, SECOND_STEP_ID } from '../../store/registration';
import { registrationSetStep } from '../../actions/registration';

const RegistrationStepFirst = props => (
  <div
    className={classNames(
      'registration__section',
      'registration__section_first',
      { 'registration__section_active': props.registration.activeStepId === FIRST_STEP_ID },
    )}
  >
    <div className="registration__title">
      <div className="registration__step">1/3</div>
      <h3 className="title title_small">
        {props.registration.activeStepId === FIRST_STEP_ID ? (
          <Fragment>Choose Account Name</Fragment>
        ) : (
          <Fragment>Account Name: @{props.registration.accountName}</Fragment>
        )}
      </h3>
    </div>

    <div className="registration__content">
      <div className="registration-account-info">
        <div className="registration-account-info__section">
          <div className="registration-account-info__title">12</div>
          <div className="registration-account-info__description">Must be <strong>12 characters</strong></div>
        </div>

        <div className="registration-account-info__section">
          <div className="registration-account-info__title">a <strike><span>A</span></strike></div>
          <div className="registration-account-info__description">Must be <strong>lowercase</strong> only</div>
        </div>

        <div className="registration-account-info__section">
          <div className="registration-account-info__title">1-5</div>
          <div className="registration-account-info__description">Can only have <strong>numbers 1–5</strong></div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.registrationSetStep(SECOND_STEP_ID);
        }}
      >
        <RegistrationAccountField />

        <div className="registration__action">
          <Button
            isStretched
            isUpper
            isDisabled={!props.registration.accountNameIsValid}
            size="big"
            theme="red"
            type="submit"
            text="Proceed"
            // onClick={() => props.registrationSetStep(SECOND_STEP_ID)}
          />
        </div>
      </form>
    </div>
  </div>
);

export default connect(
  state => ({
    registration: state.registration,
  }),
  dispatch => bindActionCreators({
    registrationSetStep,
  }, dispatch),
)(RegistrationStepFirst);
