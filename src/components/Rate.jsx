import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { formatRate } from '../utils/rate';

const Rate = (props) => {
  if (props.value === undefined) {
    return null;
  }

  return (
    <div className={classNames('rate', props.className)}>
      <div className="rate__value">
        {formatRate(+props.value)}
        <span className="rate__degree">{props.dimension}</span>
      </div>
      <div className="rate__label">{props.label}</div>
    </div>
  );
};

Rate.propTypes = {
  dimension: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
};

Rate.defaultProps = {
  dimension: '°',
  label: 'Rate',
};

export default Rate;
