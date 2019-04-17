import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import TextInput from './TextInput';
import Button from './Button';
import IconRemove from './Icons/Remove';

class SocialNetworks extends PureComponent {
  removeField = (index) => {
    const { fields, onChange } = this.props;
    onChange([...fields.filter((_, i) => index !== i)]);
  }

  addField = () => {
    const { fields, onChange } = this.props;
    onChange([...fields, { sourceUrl: '' }]);
  }

  render() {
    const { fields, onChange, errors } = this.props;

    if (!fields) return null;

    const myErrors = _.isEmpty(errors) ? [] :
      Object.entries(errors)
        .filter(e => e[0].indexOf('usersSources') + 1)
        .map(e => ({ [e[0].replace('usersSources.', '').replace('.sourceUrl', '')]: e[1] }));

    return (
      <Fragment>
        {fields.map((value, index) => (
          <div className="fields__item fields__item_short" key={index}>
            <div className="field">
              <div className="field__label">Your website</div>
              <div className="field__input">
                <div className="toolbar">
                  <div className="toolbar__main">
                    <TextInput
                      touched
                      value={value.sourceUrl}
                      error={myErrors.find(e => e[index]) && myErrors.find(e => e[index])[index]}
                      onChange={sourceUrl => onChange(Object.assign([], fields, { [index]: { ...fields[index], sourceUrl } }))}
                    />
                  </div>

                  {fields.length > 1 &&
                  <div className="toolbar__side toolbar__side_remove-field">
                    <div
                      role="presentation"
                      className="communitie-list__remove"
                      onClick={() => this.removeField(index)}
                    >
                      <IconRemove />
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="fields__item">
          <div className="field">
            <div className="field__label" />
            <div className="field__input">
              <Button
                size="small"
                theme="transparent"
                text="Add another"
                onClick={this.addField}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SocialNetworks;
