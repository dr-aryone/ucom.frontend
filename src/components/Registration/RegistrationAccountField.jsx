import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';
import InputErrorIcon from '../Icons/InputError';
import InputCompleteIcon from '../Icons/InputComplete';
import { registrationSetAndValidateAccountName } from '../../actions/registration';

const RegistrationAccountField = ({
  registration: {
    accountName,
    accountNameIsValid,
    accountNameError,
  },
  registrationSetAndValidateAccountName,
}) => {
  const accountNameLength = accountName.length;

  return (
    <div className="registration-account-field">
      <div className="registration-account-field__label">Account name</div>
      <div className="registration-account-field__input">
        <span className="registration-account-field__sign">@</span>

        <input
          type="text"
          className="registration-account-field__data"
          placeholder="helloworld12"
          minLength="12"
          maxLength="12"
          value={accountName}
          onChange={e => registrationSetAndValidateAccountName(e.target.value)}
        />

        <span className="registration-account-field__counter">{`${accountNameLength} / 12`}</span>

        <span
          className={classNames(
            'registration-account-field__progress',
            { 'registration-account-field__progress_success': Boolean(accountNameIsValid) },
            { 'registration-account-field__progress_full': accountNameLength === 12 },
          )}
          style={{ width: `${(100 * accountNameLength) / 12}%` }}
        />
      </div>

      {accountNameError &&
        <div className="registration-account-field__hint">
          <span className="inline inline_small">
            <span className="inline__item">
              <InputErrorIcon />
            </span>
            <span className="inline__item">
              {accountNameError}
            </span>
          </span>
        </div>
      }

      {accountNameIsValid &&
        <div className="registration-account-field__hint">
          <span className="inline inline_small">
            <span className="inline__item">
              <InputCompleteIcon />
            </span>
            <span className="inline__item">
              Nice name! Memorize it
            </span>
          </span>
        </div>
      }
    </div>
  );
};

RegistrationAccountField.propTypes = {
  registration: PropTypes.shape({
    accountName: PropTypes.string,
    accountNameIsValid: PropTypes.bool,
    accountNameError: PropTypes.string,
  }).isRequired,
  registrationSetAndValidateAccountName: PropTypes.func.isRequired,
};

export default connect(state => ({
  registration: state.registration,
}), {
  registrationSetAndValidateAccountName,
})(RegistrationAccountField);
