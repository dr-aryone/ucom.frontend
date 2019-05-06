import api from '../api';
import graphql from '../api/graphql';
import loader from '../utils/loader';
import { selectUser } from '../store/selectors/user';
import { getSelectedNodes } from '../store/governance';
import { parseWalletErros } from '../utils/errors';

export const governanceNodesReset = payload => ({ type: 'GOVERNANCE_NODES_RESET', payload });
export const governanceNodesSetData = payload => ({ type: 'GOVERNANCE_NODES_SET_DATA', payload });
export const governanceNodesSetVote = payload => ({ type: 'GOVERNANCE_NODES_SET_VOTE', payload });
export const governanceHideVotePopup = () => ({ type: 'GOVERNANCE_NODES_SET_POPUP_VISIBILE', payload: false });
export const governanceNodesSetLoading = payload => ({ type: 'GOVERNANCE_NODES_SET_LOADING', payload });
export const governanceNodesSetPopupErrors = payload => ({ type: 'GOVERNANCE_NODES_SET_VOTE_POPUP_ERROR', payload });

export const governanceShowVotePopup = () => (dispatch) => {
  dispatch(governanceNodesSetPopupErrors([]));
  dispatch({ type: 'GOVERNANCE_NODES_SET_POPUP_VISIBILE', payload: true });
};

export const governanceNodesGet = () => async (dispatch, getState) => {
  loader.start();
  dispatch(governanceNodesSetLoading(true));

  try {
    const state = getState();
    const data = await graphql.getAllNodes(state.user.data.id);
    const nodes = {};
    Object.keys(data.nodes).forEach((nodeType) => {
      nodes[nodeType] = data.nodes[nodeType].data
        .map(node => (
          { ...node, isVoted: data.selectedNodes[nodeType].data.some(selectedNode => selectedNode.title === node.title) }
        ));
    });
    dispatch(governanceNodesSetData(nodes));
  } catch (e) {
    console.error(e);
  }

  loader.done();
  dispatch(governanceNodesSetLoading(false));
};

export const voteForNodes = nodeType => async (dispatch, getState) => {
  const state = getState();
  const user = selectUser(state);

  if (!user.accountName) {
    return;
  }

  const selectedNodes = getSelectedNodes(state)[nodeType];
  const selectedNodesAccountNames = selectedNodes.map(i => i.title);

  loader.start();
  dispatch(governanceNodesSetLoading(true));

  try {
    await api.voteForNodes(user.accountName, selectedNodesAccountNames, nodeType);
    dispatch(governanceHideVotePopup());
  } catch (e) {
    const errors = parseWalletErros(e);

    dispatch(governanceNodesSetPopupErrors(errors));
    console.error(e);
  }

  loader.done();
  dispatch(governanceNodesSetLoading(false));
};
