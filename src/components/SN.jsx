import React, { Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import TextInput from './TextInput';
import Button from './Button/index';
import IconRemove from './Icons/Remove';
import styles from '../pages/Profile.css';

const SocialNetworks = (props) => {
  const removeField = (index) => {
    const { fields, onChange } = props;
    onChange([...fields.filter((_, i) => index !== i)]);
  };

  const addField = () => {
    const { fields, onChange } = props;
    onChange([...fields, { sourceUrl: '' }]);
  };

  const { fields, onChange, errors } = props;

  if (!fields) return null;

  const myErrors = _.isEmpty(errors) ? [] :
    Object.entries(errors)
      .filter(e => e[0].indexOf('usersSources') + 1)
      .map(e => ({ [e[0].replace('usersSources.', '').replace('.sourceUrl', '')]: e[1] }));

  return (
    <Fragment>
      <div className={classNames(styles.field, styles.fieldSoical)}>
        <div className={styles.label}>Social Networks</div>
        <div className={styles.inputBlock}>
          {fields.map((value, index) => (
            <div className={styles.inputBlockSocial} key={index}>
              <TextInput
                touched
                value={value.sourceUrl}
                onChange={sourceUrl => onChange(Object.assign([], fields, { [index]: { ...fields[index], sourceUrl } }))}
                className={styles.input}
              />
              <div
                role="presentation"
                className={styles.trashIcon}
                onClick={() => removeField(index)}
              >
                <IconRemove />
              </div>
            </div>
          ))}
          <Button
            small
            grayBorder
            onClick={addField}
          >
            {fields.length === 0 ? 'Add profile' : 'Add Another'}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default SocialNetworks;
