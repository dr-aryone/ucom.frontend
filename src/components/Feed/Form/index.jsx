import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Placeholder from './Placeholder';
import Field from './Field';
import styles from './styles.css';

const Form = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.form}>
      <Placeholder
        ownerPickUrl={props.ownerPickUrl}
        ownerPickAlt={props.ownerPickAlt}
        ownerPickSrc={props.ownerPickSrc}
        onClick={() => setActive(true)}
      />

      {active &&
        <Field
          message={props.message}
          ownerPickUrl={props.ownerPickUrl}
          ownerPickAlt={props.ownerPickAlt}
          ownerPickSrc={props.ownerPickSrc}
          onReset={() => setActive(false)}
          onSubmit={(data) => {
            props.onSubmit(data.message, data.mainImageFilename);
            setActive(false);
          }}
        />
      }
    </div>
  );
};

Form.propTypes = {
  message: PropTypes.string,
  ownerPickUrl: PropTypes.string,
  ownerPickAlt: PropTypes.string,
  ownerPickSrc: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
  message: '',
  ownerPickUrl: null,
  ownerPickAlt: null,
  ownerPickSrc: null,
};

export default Form;
