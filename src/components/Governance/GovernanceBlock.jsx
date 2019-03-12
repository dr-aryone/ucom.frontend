import React, { Fragment } from 'react';
import GovernanceTable from './GovernanceTable';
import Tick from '../Icons/Tick';
import Button from '../Button';
import { formatRate } from '../../utils/rate';

const GovernanceBlock = ({
  title, description, table, vis, setVis, rate, voters, myVotes, go,
}) => (
  <div className="governance-all">
    <div role="presentation" onClick={() => setVis()} className="governance-switch " >
      <div className={`${vis ? 'governance-switch_rotated' : ''}`}><Tick /></div>
    </div>
    <div className="governance-all__container">
      <div className="governance-all__title" >
        <h2 className="title title_bold title_small">{title}</h2>
        <h2 className="title title_bold title_small">{formatRate(rate)}°</h2>
      </div>
      <div className="governance-all-info">
        <span className="governance-all-info__item"> Created 12.12.2019</span><span>Ongoing voting </span>
      </div>
      <div className="governance__text governance__text_small governance__text_description">
        {description}
      </div>
      <div className="governance-all-info governance-all__votes">
        <span className="governance-all-info__item">{formatRate(voters)} voters</span>
        {myVotes ? <span>You casted <span className="governance-all__accent" >{formatRate(myVotes) } votes</span></span> :
        <span> You didn’t vote </span>}
      </div>

      {vis &&
      <Fragment>
        <div className="governance__button">
          <Button
            size="small"
            theme="red"
            text="Go to Voting"
            isStretched
            onClick={go}
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

export default GovernanceBlock;
