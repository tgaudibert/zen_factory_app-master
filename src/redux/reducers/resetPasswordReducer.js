const resetPasswordState = {
  verification_code: '',
  new_password:'',
  username:''
};

export const resetPasswordReducer = (state = resetPasswordState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_RESET_CODE': {
      newState.verification_code = action.verification_code;
      break;
    }
    case 'ADD_NEW_PASSWORD': {
      newState.new_password = action.new_password;
      break;
    }
    case 'ADD_RESET_USERNAME': {
      newState.username = action.username;
      break;
    }
    case 'RESET_RESETPASSWORD_REDUCER': {
      newState.verification_code = ''
      newState.new_password = '';
      newState.username = '';
      break;
    }
    default:
      return newState;
  }
  return newState;
};
