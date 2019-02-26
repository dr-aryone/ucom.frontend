import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.css';
import IconClose from '../../Icons/Close';
import IconDelete from '../../Icons/Delete';
import Checkbox from '../../Checkbox';
import TextareaAutosize from '../../TextareaAutosize';
import DateInput from '../../DateInput';

const PollForm = props => (
  <div className={styles.pollForm}>
    <div
      role="presentation"
      className={styles.close}
      onClick={props.onClickCLose}
    >
      <IconClose />
    </div>

    <TextareaAutosize
      autoFocus
      rows="1"
      className={styles.question}
      placeholder="Your question"
      value={props.poll.question}
      onChange={(e) => {
        props.onChange({ ...props.poll, question: e.target.value });
      }}
    />

    <div className={styles.options}>
      {props.poll.options && props.poll.options.map((option, index) => (
        <div className={styles.option} key={index}>
          <TextareaAutosize
            rows="1"
            className={styles.optionData}
            placeholder="Poll option"
            value={option}
            onChange={(e) => {
              const options = [...props.poll.options];
              options[index] = e.target.value;
              props.onChange({
                ...props.poll,
                options,
              });
            }}
          />
          <span
            title="Remove option"
            role="presentation"
            className={styles.optionDelete}
            onClick={() => {
              props.onChange({
                ...props.poll,
                options: (props.poll.options || []).filter((o, i) => i !== index),
              });
            }}
          >
            <IconDelete />
          </span>
        </div>
      ))}
    </div>

    <button
      type="button"
      className={styles.button}
      onClick={() => {
        props.onChange({
          ...props.poll,
          options: (props.poll.options || []).concat(''),
        });
      }}
    >
      Add another poll option
    </button>

    <div className={styles.settings}>
      <div>
        <label className={styles.checkbox}>
          <Checkbox />
          <span className={styles.checkboxLabel}>Multiple choices</span>
        </label>
      </div>
      <div>
        <label className={styles.checkbox}>
          <Checkbox
            isChecked={Boolean(props.poll.endTime)}
            onChange={() => {
              props.onChange({
                ...props.poll,
                endTime: props.poll.endTime ? null : new Date(),
              });
            }}
          />
          <span className={styles.checkboxLabel}>Time-limited poll</span>
        </label>
      </div>
    </div>

    {/* TODO: Доделать выбор даты */}
    {props.poll.endTime &&
      <div className={styles.endTime}>
        <div className={styles.endTimeLabel}>Ends</div>
        <div className={styles.endTimeDate}>
          <DateInput />
        </div>
      </div>
    }
  </div>
);

PollForm.propTypes = {
  onClickCLose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  poll: PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    endTime: PropTypes.string,
  }),
};

PollForm.defaultProps = {
  poll: {},
};

export default PollForm;
