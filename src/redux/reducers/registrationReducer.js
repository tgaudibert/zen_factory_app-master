const registrationState = {
  profilepic_url: '',
  name: '',
  username: '',
  password: '',
  verification_code: '',
};

export const registrationReducer = (state = registrationState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_USER_PIC': {
      newState.profilepic_url = action.profilepic_url;
      break;
    }
    case 'ADD_USERNAME': {
      newState.username = action.username;
      break;
    }
    case 'ADD_NAME': {
      newState.name = action.name;
      break;
    }
    case 'ADD_USERPASSWORD': {
      newState.password = action.password;
      break;
    }
    case 'ADD_REGISTRATION_CODE':{
      newState.verification_code = action.verification_code
      break
    }
    case 'RESET_REGISTRATION_REDUCER': {
      newState.verification_code = registrationState.verification_code
      newState.password = registrationState.password;
      newState.name = registrationState.name;
      newState.username = registrationState.username;
      newState.profilepic_url = registrationState.profilepic_url;
      break;
    }
    default:
      return newState;
  }
  return newState;
};
