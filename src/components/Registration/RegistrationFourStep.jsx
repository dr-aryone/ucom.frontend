import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React from 'react';
import { FOUR_STEP_ID } from '../../store/registration';
import CopyPanel from '../CopyPanel';
import Button from '../Button';
import { getAirdropOfferId } from '../../utils/airdrop';
import { registrationFinish } from '../../actions/registration';
import urls from '../../utils/urls';

const RegistrationStepFour = ({ registrationFinish, registration, prevPath }) => {
  const getPrevPageId = () => {
    let prevPageId;
    const offerId = getAirdropOfferId();
    const postId = prevPath !== null ? prevPath.match(/\d+/) : null;

    if (postId !== null && +postId[0] === offerId) {
      prevPageId = offerId;
    } else {
      prevPageId = null;
    }

    return prevPageId;
  };

  return (
    <div
      className={classNames(
        'registration__section',
        'registration__section_four',
        { 'registration__section_active': registration.activeStepId === FOUR_STEP_ID },
      )}
    >
      <div className="registration__title">
        <div className="registration__step">4/4</div>
        <h3 className="title title_small">Keys</h3>
      </div>

      <div className="registration__content registration__content_finish">
        <div className="registration__text">
          <div className="text">
            <p>
              This is your Social Private Key. <strong>You will need it to authorize on a platform</strong> from any device. Keep it safe.
            </p>
          </div>
        </div>

        <div className="registration__text">
          <CopyPanel
            value={registration.socialKey}
          />
        </div>

        <div className="registration__action">
          <Button
            isStretched
            isUpper
            size="big"
            theme="red"
            text="Finish"
            onClick={() => registrationFinish(getPrevPageId() || registration.userId)}
          />
        </div>

        <div className="registration__hint">
          You can see all your keys in&nbsp;
          <a
            className="link red"
            href={urls.getUserSettingsUrl(registration.userId)}
          >
            settings
          </a>.
        </div>
      </div>
    </div>
  );
};

RegistrationStepFour.propTypes = {
  registrationFinish: PropTypes.func.isRequired,
  registration: PropTypes.shape({
    activeStepId: PropTypes.number.isRequired,
    userId: PropTypes.number,
  }).isRequired,
  prevPath: PropTypes.string,
};

RegistrationStepFour.defaultProps = {
  prevPath: null,
};

export default connect(state => ({
  registration: state.registration,
}), {
  registrationFinish,
})(RegistrationStepFour);
