import PropTypes from 'prop-types';
import React, { memo, Fragment } from 'react';
import styles from './styles.css';
import IconArrowLeft from '../../Icons/ArrowLeft';
import { getSocialPrivateKey } from '../../../utils/keys';
import BrainkeyForm from '../BrainkeyForm';

const GenerateSocialKey = props => (
  <Fragment>
    <div
      role="presentation"
      className={styles.navigation}
      onClick={props.onClickBack}
    >
      <span className={styles.icon}>
        <IconArrowLeft />
      </span>
      <span className={styles.label}>
        <span className={styles.navText}>Authorization</span>
      </span>
    </div>

    <div className={`${styles.content} ${styles.generateKey}`}>
      <div className={styles.main}>
        <BrainkeyForm
          title="Generate Social Key with Brainkey"
          onChange={props.onChange}
          onSubmit={(brainkey) => {
            if (props.onSubmit) {
              props.onSubmit(getSocialPrivateKey(brainkey));
            }
          }}
        />
      </div>
    </div>
  </Fragment>
);

GenerateSocialKey.propTypes = {
  onClickBack: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

GenerateSocialKey.defaultProps = {
  onChange: undefined,
  onSubmit: undefined,
};

export default memo(GenerateSocialKey);
