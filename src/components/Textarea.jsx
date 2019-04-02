import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TributeWrapper from './TributeWrapper';

const Textarea = ({
  label, value, placeholder, rows, onChange, className, error, isMentioned, ...rest
}) => (
  <div className={cn(
      'textarea',
      { 'textarea_error': !!error },
      className,
    )}
  >
    { label && <label className="textarea__label">{label}</label> }
    {isMentioned ?
      <TributeWrapper onChange={e => onChange(e)}>
        <textarea
          className="textarea__text"
          value={value === null ? '' : value}
          rows={rows}
          placeholder={placeholder}
          onChange={(e) => {
            if (typeof onChange === 'function') {
              onChange(e.target.value);
            }
          }}
          {...rest}
        />
      </TributeWrapper>
      :
      <textarea
        className="textarea__text"
        value={value === null ? '' : value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => {
        if (typeof onChange === 'function') {
          onChange(e.target.value);
        }
      }}
        {...rest}
      />
      }
    {error && <div className="textarea__error">{error}</div>}
  </div>
);

Textarea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default Textarea;
