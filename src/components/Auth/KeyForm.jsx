import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import styles from './styles.css';
import Button from '../Button/index';
import IconInputError from '../Icons/InputError';

const KeyForm = (props) => {
  const [key, setKey] = useState('');

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(key);
      }}
    >
      <h2 className={styles.title}>{props.title}</h2>
      <div className={styles.field}>
        <input
          className={styles.input}
          placeholder={props.placeholder}
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            if (props.onChange) {
              props.onChange(e.target.value);
            }
          }}
        />
        {props.error &&
          <div className={styles.error}>
            <IconInputError />
            <span className={styles.text}>{props.error}</span>
          </div>
        }
      </div>
      <div className={styles.action}>
        <Button
          red
          big
          cap
          strech
          disabled={props.loading || props.error}
        >
          {props.submitText}
        </Button>
      </div>
    </form>
  );
};

KeyForm.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  submitText: PropTypes.string,
};

KeyForm.defaultProps = {
  error: '',
  loading: false,
  onChange: undefined,
  submitText: 'Enter',
};

export default memo(KeyForm);
