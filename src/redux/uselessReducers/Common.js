

export const fetchStart = () => {
  return {
    type: 'FETCH_START'
  }
};

export const fetchSuccess = () => {
  return {
    type: 'FETCH_SUCCESS'
  }
};

export const fetchError = (error) => {
  return {
    type: 'FETCH_ERROR',
    payload: error
  }
};

export const showMessage = (message) => {
  return {
    type: 'SHOW_MESSAGE',
    payload: message
  }
};

export const hideMessage = () => {
  return {
    type: 'HIDE_MESSAGE'
  }
};


export const hideModal = () => {
  return {
    type: 'HIDE_MODAL'
  }
};
