import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import GovernanceTable from './GovernanceTable';
import Button from '../Button';
import { ArrowIcon } from '../Icons/GovernanceIcons';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import OrganizationHead from '../Organization/OrganizationHead';
import { governanceNodesGet, governanceHideVotePopup, governanceShowVotePopup, voteForBlockProducers } from '../../actions/governance';
import { getOrganization } from '../../actions/organizations';
import { walletToggleEditStake, walletGetAccount } from '../../actions/walletSimple';
import { getSelectedNodes } from '../../store/governance';
import { selectUser } from '../../store/selectors/user';
import LayoutBase from '../Layout/LayoutBase';
import { getUosGroupId } from '../../utils/config';
import GovernanceElection from './GovernanceElection';
import GovernanceConfirmation from './GovernanceConfirmation';
import RequestActiveKey from '../Auth/Features/RequestActiveKey';

const Governance = (props) => {
  const organizationId = getUosGroupId();

  useEffect(() => {
    props.walletGetAccount(props.user.accountName);
    props.getOrganization(organizationId);
    props.governanceNodesGet();
  }, [organizationId]);

  const stakedTokens = (props.wallet.tokens && props.wallet.tokens.staked) || 0;
  const table = props.governance.nodes.data;
  const { selectedNodes, user } = props;
  const [electionVisibility, setElectionVisibility] = useState(false);
  const [confirmationVisibility, setConfirmationVisibility] = useState(false);
  const [closeVisibility, setCloseVisibility] = useState(false);
  const setVotes = (activeKey) => {
    setConfirmationVisibility(false);
    setElectionVisibility(false);
    setCloseVisibility(false);
    props.voteForBlockProducers(activeKey);
  };

  const close = () => {
    setConfirmationVisibility(false);
    setElectionVisibility(false);
    setCloseVisibility(false);
    props.walletGetAccount(props.user.accountName);
    props.governanceNodesGet();
    props.getOrganization(organizationId);
  };

  return (
    <LayoutBase>
      {electionVisibility && (
        <Popup onClickClose={() => setElectionVisibility(false)}>
          <ModalContent closeText="Close" mod="governance-election" onClickClose={() => setElectionVisibility(false)}>
            <GovernanceElection {...{
              stakedTokens, table, selectedNodes, setConfirmationVisibility, user,
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
                  <RequestActiveKey onSubmit={setVotes}>
                    {requestActiveKey => (
                      <Button
                        isStretched
                        text="Vote"
                        size="medium"
                        theme="red"
                        onClick={requestActiveKey}
                      />
                    )}
                  </RequestActiveKey>
                </div>
              </div>
            </div>
          </ModalContent>
        </Popup>
      )}

      <div className="governance">
        <div className="content content_base">
          <div className="content__inner">
            <div className="content__title">
              <h1 className="title">Governance</h1>
            </div>

            <div className="governance__section">
              <div className="governance__text">
                Govern the U°OS protocol through voting. You can currently vote for active and standby Block Producers. Vote with your staked UOS.
              </div>

              {props.user.id &&
                <div className="governance__status">
                  <div className="governance__edit-stake">
                    <span className="governance__status-text">Staked</span>
                    <h3 className="title_small">
                      {stakedTokens}
                    </h3>
                    <span className="governance__status-text">UOS</span>
                  </div>
                  <div
                    className="governance__action"
                    role="presentation"
                    onClick={() => props.walletToggleEditStake(true)}
                  >
                    Edit Stake
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content__inner">
          <div className="sheets">
            <div className="sheets__list">
              <div className="sheets__item">
                <OrganizationHead organizationId={organizationId} isOrganization />
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
                <div className="content__section content__section_medium">
                  <div className="governance-all">
                    <div className="governance-all__title">
                      <h2 className="title title_bold">Block Producers </h2>
                      {props.user.id &&
                        <div className="governance__exercise" role="presentation" onClick={() => setElectionVisibility(true)}>
                        Exercise your election rights <div className="governance__arrow-icon"><ArrowIcon /></div>
                        </div>}
                    </div>
                    <div className="governance__text governance__text_description">
                    The Block Producers are decentralized entities that keep the chain running by producing blocks. The Block Producers are elected through voting.
                    </div>
                    <div className="governance-all__table">
                      <GovernanceTable
                        data={table}
                        isPreview
                      />
                    </div>
                  </div>
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
    wallet: state.walletSimple,
    selectedNodes: getSelectedNodes(state),
  }),
  dispatch => bindActionCreators({
    governanceNodesGet,
    governanceHideVotePopup,
    governanceShowVotePopup,
    getOrganization,
    walletGetAccount,
    voteForBlockProducers,
    walletToggleEditStake,
  }, dispatch),
)(Governance);
