const communityState = {
  users: [

  ]
};

export const communityReducer = (state = communityState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_COMMUNITY': {
      newState.users = action.payload;
      break;
    }
    case 'RESET_COMMUNITY_REDUCER': {
      newState.users = communityState.payload;
      break;
    }
    default:
      return newState;
  }
  return newState;
};






const communityModelState = {
  users: [
    {
      iduser: 0,
      profilepic_url:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      username: 'Paul Graham',
      profilepic_url:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      name: '6 minutes',

    },
    {
      iduser: 1,
      profilepic_url:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      username: 'Ben Horrowitz',
      profilepic_url:
        'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      name: '6 minutes',

    }
  ]
};
