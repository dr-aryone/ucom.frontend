import React from 'react';
import propTypes from 'prop-types';

const RadioButton = props => (
  <div className="radio-button">
    <input id={props.id} className="radio-button__radio" name={props.name} type="radio" />
    <label htmlFor={props.id} className="radio-button__label">{props.label}</label>
  </div>
);

RadioButton.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  name: propTypes.string,
};

export default RadioButton;
