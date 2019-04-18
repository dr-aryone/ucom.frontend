import React, { useState, Fragment } from 'react';
import styles from './styles.css';
import Button from '../Button/index';
import TextInput from '../TextInput';
import IconEnter from '../Icons/Enter';

const OwnerActiveKeys = () => {
  const [brainkey, setBrainkey] = useState('');
  const [inputActive, setInputActive] = useState(true);

  return (
    <Fragment>
      <h4 className={styles.title}>Get Owner and Active key pairs with Brainkey</h4>
      <p>Here you can generate your keys from Brainkey.</p>

      {inputActive ? (
        <form
          className={styles.brainkeyForm}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextInput
            touched
            placeholder="Brainkey"
            value={brainkey}
            onChange={(value) => {
              setBrainkey(value);
            }}
          />
          <button className={styles.button}>
            <IconEnter />
          </button>
        </form>
      ) : (
        <div className={styles.action}>
          <Button strech small>Show</Button>
        </div>
      )}
    </Fragment>
  );
};

export default OwnerActiveKeys;
