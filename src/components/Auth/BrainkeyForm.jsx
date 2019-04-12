import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import styles from './styles.css';
import Button from '../Button/index';
import IconInputError from '../Icons/InputError';
import { BRAINKEY_SYMBOLS_REGEXP, BRAINKEY_LENGTH } from '../../utils/brainkey';
import { removeMultipleSpaces } from '../../utils/text';

const ERROR_WRONG_BRAINKEY = 'Wrong brainkey format';

const GenerateSocialKey = (props) => {
  const [brainkey, setBrainkey] = useState('');
  const [formError, setFormError] = useState('');

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        const trimedBrainkey = brainkey.trim();
        if (!BRAINKEY_SYMBOLS_REGEXP.test(trimedBrainkey) || trimedBrainkey.split(' ').length !== BRAINKEY_LENGTH) {
          setFormError(ERROR_WRONG_BRAINKEY);
          return;
        }
        setFormError('');
        if (props.onSubmit) {
          props.onSubmit(trimedBrainkey);
        }
      }}
    >
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder="Enter your 12-word Brainkey"
          value={brainkey}
          onChange={(e) => {
            const value = removeMultipleSpaces(e.target.value);
            setBrainkey(value);
            if (!BRAINKEY_SYMBOLS_REGEXP.test(value)) {
              setFormError(ERROR_WRONG_BRAINKEY);
            } else {
              setFormError('');
            }
            if (props.onChange) {
              props.onChange(value);
            }
          }}
        />
        {formError &&
          <div className={styles.error}>
            <IconInputError />
            <span className={styles.text}>{formError}</span>
          </div>
        }
      </div>
      <div className={styles.action}>
        <Button
          red
          big
          cap
          strech
          disabled={!!formError}
        >
          Proceed
        </Button>
      </div>
    </form>
  );
};

GenerateSocialKey.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

GenerateSocialKey.defaultProps = {
  onChange: undefined,
  onSubmit: undefined,
};

export default memo(GenerateSocialKey);
