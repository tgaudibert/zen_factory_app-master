var sensorState = {
  masternodes: [
  ]
};



export const masterNodesReducer = (state = sensorState, action) => {
  switch (action.type) {
    case 'NEW_MASTER_NODE': {
      state = { ...state, masternodes: state.masternodes.push([])};
      break;
    }
    case 'MASTER_NODE_LIST': {
      state = { ...state, masternodes: action.payload};
      break;
    }
    case 'RESET_MASTERNODE_REDUCER': {
      state = sensorState
      break;
    }

    default:
      return state;
  }
  return state;
};
