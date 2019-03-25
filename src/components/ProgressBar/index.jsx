import React, { PureComponent } from 'react';
import styles from './styles.css';

class ProgressBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      percentage: props.percentage,
    };
    // this.nextStep = this.nextStep.bind(this);
  }

  // nextStep() {
  //   if (this.state.percentage === 100) {
  //     return this.setState({ percentage: this.state.percentage + 20 });
  //   }
  // }

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

export default ProgressBar;
