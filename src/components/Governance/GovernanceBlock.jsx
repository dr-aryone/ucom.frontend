import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GovernanceTable from './GovernanceTable';
import Tick from '../Icons/Tick';
import Button from '../Button';
import { formatRate } from '../../utils/rate';
import styles from './GovernanceBlock.css';

const GovernanceBlock = ({
  title, description, table, visibility, onClickTick, /* rate, voters, */ myVotes, onClickVoteButton,
}) => (
  <div className={styles.block}>
    <div role="presentation" onClick={() => onClickTick()} className={styles.switch} >
      <div className={visibility ? styles.rotated : ''}><Tick /></div>
    </div>
    <div className={styles.container}>
      <div className={styles.title} >
        <h2 className="title title_bold title_small">{title}</h2>
        {/* <h2 className="title title_bold title_small">{formatRate(rate)}°</h2> */}
      </div>
      <div className={styles.info}>
        {/* <span className={styles.item}> Created 12.12.2019</span> */}<span>Ongoing voting </span>
      </div>
      <div className="governance__text governance__text_small governance__text_description">
        {description}
      </div>
      <div className={`${styles.info} ${styles.votes}`}>
        {/* <span className={styles.item}>{formatRate(voters)} voters</span> */}
        {myVotes ? <span className={styles.item}>You casted <span className={styles.accent} >{formatRate(myVotes) } votes</span></span> :
        <span> You didn’t vote </span>}
      </div>

      {visibility &&
        <Fragment>
          <div className={styles.button}>
            <Button
              size="small"
              theme="red"
              text="Go to Voting"
              isStretched
              onClick={onClickVoteButton}
            />
          </div>
          <div className="governance-all__table">
            <GovernanceTable
              data={table}
              isPreview
            />
          </div>
        </Fragment>
      }
    </div>
  </div>
);

GovernanceBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  table: PropTypes.arrayOf(PropTypes.object).isRequired,
  visibility: PropTypes.bool.isRequired,
  onClickTick: PropTypes.func.isRequired,
  onClickVoteButton: PropTypes.func.isRequired,
  myVotes: PropTypes.number.isRequired,
  // rate: PropTypes.number.isRequired,
  // voters: PropTypes.number.isRequired,
};

export default GovernanceBlock;
