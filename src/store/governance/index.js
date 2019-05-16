import { combineReducers } from 'redux';
import nodes from './nodes';

export const getSelectedNodes = (state) => {
  const selectedNodes = {};
  const nodes = state.governance.nodes.data;
  Object.keys(nodes).forEach((nodeType) => {
    selectedNodes[nodeType] = nodes[nodeType].filter(node => node.isVoted);
  });
  return selectedNodes;
};


export default combineReducers({
  nodes,
});
