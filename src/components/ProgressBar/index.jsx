import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

class ProgressBar extends PureComponent {
  render() {
    return (
      <div>
        <Line percentage={this.props.percentage} />
      </div>
    );
  }
}

const Line = props => (
  <div className={styles.bar}>
    <Filler percentage={props.percentage} />
  </div>
);

const Filler = props => (
  <div className={styles.filler} style={{ width: `${props.percentage}%` }} />
);

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

Line.propTypes = {
  percentage: PropTypes.number.isRequired,
};

Filler.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default ProgressBar;
