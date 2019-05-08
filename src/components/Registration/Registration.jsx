import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React, { useEffect } from 'react';
import RegistrationStepIntro from './RegistrationStepIntro';
import RegistrationStepFirst from './RegistrationStepFirst';
import RegistrationStepSecond from './RegistrationStepSecond';
import RegistrationStepThird from './RegistrationStepThird';
import LayoutClean from '../Layout/LayoutClean';
import { registrationReset } from '../../actions/registration';
import Close from '../Close';

const Registration = ({ location, registrationReset }) => {
  useEffect(() => {
    registrationReset();
  }, []);

  return (
    <LayoutClean>
      <div className="registration">
        <div className="registration__container">
          <div className="registration__close">
            <Close />
          </div>
          <div className="registration__inner">
            <div className="registration__sections">
              <RegistrationStepIntro />
              <RegistrationStepFirst />
              <RegistrationStepSecond />
              <RegistrationStepThird prevPath={location && location.state ? location.state.prevPath : null} />
            </div>
          </div>
        </div>
      </div>
    </LayoutClean>
  );
};

Registration.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      prevPath: PropTypes.string,
    }),
  }).isRequired,
  registrationReset: PropTypes.func.isRequired,
};

export default withRouter(connect(state => ({
  registration: state.registration,
}), {
  registrationReset,
})(Registration));
