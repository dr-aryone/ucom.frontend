import { combineReducers } from 'redux';
import nodes from './nodes';

export const getSelectedNodes = (state) => {
  const obj = {};
  const myObj = state.governance.nodes.data;
  Object.keys(myObj).forEach((key) => {
    obj[key] = myObj[key].data.filter(item => item.myselfData && item.myselfData.bpVote);
  });
  return obj;
};


export default combineReducers({
  nodes,
});
