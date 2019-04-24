import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles.css';
import TextInput from '../TextInput';
import EnterIcon from '../Icons/Enter';
import CloseIcon from '../Icons/Close';
import { isEnterKey, isEscKey } from '../../utils/keyboard';
import loader from '../../utils/loader';

const Form = (props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const submit = async () => {
    loader.start();

    try {
      const postId = await props.validatePostUrlFn(value);
      setError(null);
      props.onSubmit(postId);
    } catch (e) {
      setError(e.message);
    }

    loader.done();
  };

  return (
    <div className={styles.form}>
      <TextInput
        autoFocus
        value={value}
        placeholder={props.placeholder}
        error={error}
        onChange={value => setValue(value)}
        onKeyDown={(e) => {
          if (isEnterKey(e)) {
            submit();
          } else if (isEscKey(e)) {
            props.onReset();
          }
        }}
      />
      <div className={styles.iconWrapper}>
        <button
          className={styles.icon}
          onClick={submit}
        >
          <EnterIcon />
        </button>
      </div>
      <div className={styles.iconWrapper}>
        <button
          className={styles.icon}
          onClick={() => props.onReset(value)}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

Form.propTypes = {
  placeholder: PropTypes.string.isRequired,
  validatePostUrlFn: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default Form;
