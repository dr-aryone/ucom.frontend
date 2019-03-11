import React from 'react';
import GovernanceTable from './GovernanceTable';
import Tick from '../Icons/Tick';

const GovernanceBlock = ({
  title, description, table, vis, setVis,
}) => (
  <div className="governance-all">
    <div role="presentation" onClick={() => setVis()} className={`governance-switch ${vis ? 'governance-switch_rotated' : ''}`} >
      <Tick />
    </div>
    <div>
      <div className="governance-all__title" >
        <h2 className="title title_bold title_small">{title}</h2>
      </div>
      <div className="governance__text governance__text_small governance__text_description">
        {description}
      </div>
      {vis &&
        <div className="governance-all__table">
          <GovernanceTable
            data={table}
            isPreview
          />
        </div>
        }
    </div>
  </div>
);

export default GovernanceBlock;
