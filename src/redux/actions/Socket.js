

export const dispatchSocketMessage = (message) => {
  return (dispatch) => {
    console.log("dispatching message")
    dispatch({type:'server/hello', data:message})

  }
};


export const authenticateSocket = (token) => {
  return (dispatch) => {
    console.log("authenticate socket")
    dispatch({type:'server/authenticate', token:token})

  }
};


export const logoutSocket = () => {
  return (dispatch) => {
    console.log("logout socket")
    dispatch({type:'server/logout'})
  }
};
