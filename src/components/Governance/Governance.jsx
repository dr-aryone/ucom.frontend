import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tippy';
import GovernanceBlock from './GovernanceBlock';
import Button from '../Button';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import OrganizationHead from '../Organization/OrganizationHead';
import { governanceNodesGet, governanceHideVotePopup, governanceShowVotePopup, voteForBlockProducers } from '../../actions/governance';
import { getOrganization } from '../../actions/organizations';
import { getAccountState, setWalletEditStakeVisible } from '../../actions/wallet';
import { getSelectedNodes } from '../../store/governance';
import { selectUser } from '../../store/selectors/user';
import LayoutBase from '../Layout/LayoutBase';
import { getUosGroupId } from '../../utils/config';
import SetStakePopup from '../Wallet/SetStakePopup';
import GovernanceElection from './GovernanceElection';
import GovernanceConfirmation from './GovernanceConfirmation';
import { formatRate } from '../../utils/rate';

const governanceTabs = [
  { name: 'Network', active: true },
  { name: 'My Projects', active: false },
  { name: 'Ideas', active: false },
  { name: 'Projects', active: false },
  { name: 'Results', active: false },
];

const Governance = (props) => {
  const organizationId = getUosGroupId();

  useEffect(() => {
    props.getAccountState();
    props.getOrganization(organizationId);
    props.governanceNodesGet();
  }, [organizationId]);

  const stakedTokens = (props.wallet.state.data.tokens && props.wallet.state.data.tokens.staked) || 0;
  const table = props.governance.nodes.data;
  const { selectedNodes, user } = props;
  const [electionVisibility, setElectionVisibility] = useState(false);
  const [confirmationVisibility, setConfirmationVisibility] = useState(false);
  const [closeVisibility, setCloseVisibility] = useState(false);
  const [nodeVisibility, setNodeVisibility] = useState({ prod: false, calc: false });

  const setVotes = () => {
    setConfirmationVisibility(false);
    setElectionVisibility(false);
    setCloseVisibility(false);
    props.voteForBlockProducers();
  };

  const close = () => {
    setConfirmationVisibility(false);
    setElectionVisibility(false);
    setCloseVisibility(false);
    props.getAccountState();
    props.governanceNodesGet();
    props.getOrganization(organizationId);
  };

  return (
    <LayoutBase>
      <SetStakePopup />
      {electionVisibility && (
        <Popup onClickClose={() => setElectionVisibility(false)}>
          <ModalContent closeText="Close" mod="governance-election" onClickClose={() => setElectionVisibility(false)}>
            <GovernanceElection {...{
              stakedTokens, table, selectedNodes, setConfirmationVisibility, user, nodeVisibility,
            }}
            />
          </ModalContent>
        </Popup>
      )}

      {confirmationVisibility && (
        <Popup onClickClose={() => setCloseVisibility(true)}>
          <ModalContent closeText="Close" mod="governance-election" onClickClose={() => setCloseVisibility(true)}>
            <GovernanceConfirmation {...{
              selectedNodes, table, user, setVotes,
            }}
            />
          </ModalContent>
        </Popup>
      )}

      {closeVisibility && (
        <Popup onClickClose={() => setCloseVisibility(false)}>
          <ModalContent mod="governance-close" onClickClose={() => setCloseVisibility(false)}>
            <div className="governance-close">
              <h3 className="title_small title_bold governance-close__title">You didn&apos;t vote for the 30 selected Block Producers</h3>
              <div className="governance-buttons">
                <div className="governance-button">
                  <Button
                    isStretched
                    text="Close"
                    size="medium"
                    theme="light-black"
                    onClick={close}
                  />
                </div>
                <div className="governance-button">
                  <Button
                    isStretched
                    text="Vote"
                    size="medium"
                    theme="red"
                    onClick={setVotes}
                  />
                </div>
              </div>
            </div>
          </ModalContent>
        </Popup>
      )}

      <div className="governance">
        <div className="content">
          <div className="content__inner governance-inner">
            <div className="governance__main-title">
              <h1 className="title title_bold">Governance</h1>
              {props.user.id &&
                <div className="governance__status">
                  <span className="governance__status-text">Voting Power:</span>
                  <h3 className="title_small">
                    {formatRate(stakedTokens)}°
                  </h3>
                </div>
              }
            </div>
            <div className="nav-bar__categories nav-bar__categories_governance">
              {governanceTabs.map(item => (
                <div key={item.name} className={`overview__link ${item.active ? 'overview__link_active' : 'overview__link_disabled'}`}>
                  <Tooltip disabled={item.active} position="bottom" arrow title="Coming Soon">{item.name}</Tooltip>
                </div>
              ))}
            </div>
            <div className="governance__section">
              <div className="governance__text">
                Govern the U°OS protocol through voting. You can vote for Block Producers and Calculator Nodes. Vote with your Importance.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content__inner">
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item sheets__item_governance">
                <OrganizationHead organizationId={organizationId} isGovernance />
              </div>
            </div>

            <div className="sheets__content sheets__content_theme_governance">
              {/* {props.user.id &&
                <div className="content__section content__section_small">
                  <Panel
                    title={`Selected (${props.selectedNodes.length})`}
                    active={selectedPanelActive}
                    onClickToggler={() => setSelectedPanelActive(!selectedPanelActive)}
                  >
                    <div className="governance-selected">
                      <div className="governance-selected__table">
                        <GovernanceTable data={props.selectedNodes} />
                      </div>
                      <div className="governance-selected__actions">
                        <div className="governance-selected__vote">
                          <Button
                            isStretched
                            size="small"
                            theme="red"
                            text="Vote"
                            isDisabled={props.governance.nodes.loading}
                            onClick={() => props.governanceShowVotePopup()}
                          />
                        </div>
                      </div>
                    </div>
                  </Panel>
                </div>
              } */}

              {props.governance.nodes.data.length > 0 &&
              <div>
                <GovernanceBlock
                  onClickVoteButton={() => setElectionVisibility(true)}
                  myVotes={346}
                  voters={12345}
                  rate={15000}
                  onClickTick={() => setNodeVisibility({ calc: false, prod: !nodeVisibility.prod })}
                  visibility={nodeVisibility.prod}
                  table={table}
                  title="Block Producers"
                  description="The Block Producers are decentralized entities that keep the chain running by producing blocks. The Block Producers are elected through voting."
                />
                <GovernanceBlock
                  onClickVoteButton={() => setElectionVisibility(true)}
                  myVotes={0}
                  voters={12345}
                  rate={15000}
                  onClickTick={() => setNodeVisibility({ prod: false, calc: !nodeVisibility.calc })}
                  visibility={nodeVisibility.calc}
                  table={table}
                  title="Calculator Nodes "
                  description="A Calculator Node is a node on the U°OS blockchain dedicated to calculating the activity of user accounts: social, transactional, stake."
                />
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

export default connect(
  state => ({
    user: selectUser(state),
    governance: state.governance,
    wallet: state.wallet,
    selectedNodes: getSelectedNodes(state),
  }),
  dispatch => bindActionCreators({
    governanceNodesGet,
    governanceHideVotePopup,
    governanceShowVotePopup,
    getOrganization,
    getAccountState,
    voteForBlockProducers,
    setWalletEditStakeVisible,
  }, dispatch),
)(Governance);
