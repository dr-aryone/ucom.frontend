import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconCheck from './Icons/Check';

const Button = (props) => {
  const btnClass = classNames('button', {
    [`button_theme_${props.theme}`]: Boolean(props.theme),
    [`button_size_${props.size}`]: true,
    button_disabled: props.isDisabled,
    button_stretched: props.isStretched,
    button_rounded: props.isRounded,
    button_upper: props.isUpper,
  });

  const renderCheckedIcon = () => (
    <div className="button__checked-icon">
      <IconCheck />
    </div>
  );

  return (
    <button
      type={props.type}
      className={btnClass}
      disabled={props.isDisabled}
      onClick={() => {
        if (typeof props.onClick === 'function') {
          props.onClick();
        }
      }}
    >
      { props.text || props.children }
      { props.withCheckedIcon && renderCheckedIcon() }
    </button>
  );
};

Button.propTypes = {
  theme: PropTypes.string,
  isDisabled: PropTypes.bool,
  isStretched: PropTypes.bool,
  isRounded: PropTypes.bool,
  isUpper: PropTypes.bool,
  withCheckedIcon: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  isDisabled: false,
  text: '',
};

export default Button;
