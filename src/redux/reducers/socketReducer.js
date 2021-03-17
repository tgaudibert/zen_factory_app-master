
const socketState = {
  message:"",
  display:false,
  requireAuth:false
};



export const socketReducer = (state = socketState, action) => {
  switch(action.type){


    case 'SOCKET_MESSAGE':
          alert(action.type);
          state = { ...state,message: action.data, display:true};
          break;
    case 'HIDE_SOCKET_MESSAGE':
          state = { ...state, display:false};
          break;
    default:
      return state;
  }
  return state;
};


//store.dispatch({type:'server/hello', data:'Hello!'});
