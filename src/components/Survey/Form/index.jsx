import React from 'react';
import styles from './styles.css';
import TextareaAutosize from '../../TextareaAutosize';
import IconClose from '../../Icons/Close';
import Checkbox from '../../Checkbox';

const Survey = () => (
  <div className={styles.survey}>
    <div className={styles.close}>
      <IconClose />
    </div>

    <TextareaAutosize
      placeholder="Write your question"
      className={styles.title}
      rows={1}
    />

    <ul className={styles.list}>
      <li className={styles.item}>
        <TextareaAutosize
          placeholder="Poll option"
          className={styles.question}
          rows={1}
        />
      </li>
      <li className={styles.item}>
        <TextareaAutosize
          placeholder="Poll option"
          className={styles.question}
          rows={1}
        />
      </li>
    </ul>

    <button className={styles.action}>Add another poll option</button>

    <div className={styles.options}>
      <div className={styles.option}>
        <Checkbox /> Multiple choices
      </div>
      <div className={styles.option}>
        <Checkbox /> Time-limited poll
      </div>
    </div>
  </div>
);

export default Survey;
