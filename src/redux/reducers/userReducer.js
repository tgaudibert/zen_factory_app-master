
var userState = {
  profilepic_url:
    'http://res.cloudinary.com/dbtu3yn20/image/upload/v1587386054/cbq1sxfqzznf64mvxmjt.jpg',
  name: '',
  username: '',
  token:'',
  is_authentified:false
};



export const userReducer = (state = userState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_USER': {
      newState.username = action.payload.username;
      newState.name = action.payload.name;
      newState.profilepic_url = action.payload.profilepic_url
      break;
    }
    case 'USER_DATA': {
      newState.username = action.payload.username;
      newState.name = action.payload.name;
      newState.profilepic_url = action.payload.profilepic_url
      break;
    }
    case 'RESET_USER_REDUCER': {
      newState.username = '';
      newState.name = '';
      newState.profilepic_url = '';
      newState.is_authentified = false;
      break;
    }
    case 'LOGIN': {
      newState.token = action.token;
      newState.is_authentified = true;
      break;
    }
    default:
      return newState;
  }
  return newState;
};
