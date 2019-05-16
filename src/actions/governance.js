import api from '../api';
import graphql from '../api/graphql';
import loader from '../utils/loader';
import { selectUser } from '../store/selectors/user';
import { getSelectedNodes } from '../store/governance';
import { parseResponseError } from '../utils/errors';

export const governanceNodesReset = payload => ({ type: 'GOVERNANCE_NODES_RESET', payload });
export const governanceNodesSetData = payload => ({ type: 'GOVERNANCE_NODES_SET_DATA', payload });
export const governanceSelectedNodesSetData = payload => ({ type: 'GOVERNANCE_SELECTED_NODES_SET_DATA', payload });
export const governanceNodesSetVote = payload => ({ type: 'GOVERNANCE_NODES_SET_VOTE', payload });
export const governanceHideVotePopup = () => ({ type: 'GOVERNANCE_NODES_SET_POPUP_VISIBILE', payload: false });
export const governanceNodesSetLoading = payload => ({ type: 'GOVERNANCE_NODES_SET_LOADING', payload });
export const governanceNodesSetPopupErrors = payload => ({ type: 'GOVERNANCE_NODES_SET_VOTE_POPUP_ERROR', payload });

export const governanceShowVotePopup = () => (dispatch) => {
  dispatch(governanceNodesSetPopupErrors([]));
  dispatch({ type: 'GOVERNANCE_NODES_SET_POPUP_VISIBILE', payload: true });
};

export const governanceNodesAll = () => async (dispatch) => {
  dispatch(governanceNodesSetLoading(true));

  try {
    const data = await graphql.getAllNodes();
    const nodes = Object.keys(data.nodes)
      .reduce((result, nodeType) => ({
        ...result,
        [nodeType]: data.nodes[nodeType].data,
      }), {});

    dispatch(governanceNodesSetData(nodes));
  } catch (e) {
    console.error(e);
  }

  dispatch(governanceNodesSetLoading(false));
};

export const governanceNodesSelected = userId => async (dispatch, getState) => {
  dispatch(governanceNodesSetLoading(true));
  const state = getState();

  try {
    const data = await graphql.getNodesSelected(userId);
    const nodes = Object.keys(state.governance.nodes.data)
      .reduce((result, nodeType) => ({
        ...result,
        [nodeType]: state.governance.nodes.data[nodeType]
          .map(node => ({
            ...node,
            isVoted: data.selectedNodes[nodeType].data
              .some(selectedNode => selectedNode.title === node.title),
          })),
      }), {});

    const selectedNodes = Object.keys(data.selectedNodes)
      .reduce((result, nodeType) => ({
        ...result,
        [nodeType]: data.selectedNodes[nodeType].data,
      }), {});

    dispatch(governanceNodesSetData(nodes));
    dispatch(governanceSelectedNodesSetData(selectedNodes));
  } catch (e) {
    console.error(e);
  }
  dispatch(governanceNodesSetLoading(false));
};

export const voteForNodes = (privateKey, nodeType) => async (dispatch, getState) => {
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
    await api.voteForNodes(user.accountName, selectedNodesAccountNames, privateKey, nodeType);
    dispatch(governanceHideVotePopup());
  } catch (e) {
    const errors = parseResponseError(e);

    dispatch(governanceNodesSetPopupErrors(errors));
    console.error(e);
  }

  loader.done();
  dispatch(governanceNodesSetLoading(false));
};
