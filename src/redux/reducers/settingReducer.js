/* eslint-disable comma-dangle */
const settingState = {
  settings: [
    {
      id: 0,
      title: 'Push Notification',
      name: 'pushNotification',
      switch: false
    },
    {
      id: 1,
      title: 'Subscribe Email',
      name: 'subscribeEmail',
      switch: false
    },
    {
      id: 2,
      title: 'En / FR',
      language: 'en',
      switch: false
    }
  ]
};

export const settingReducer = (state = settingState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_SETTINGS': {
      newState.settings.map(data => {
        if (data.id == action.id) {
          data.switch = !data.switch;
        }
      });
      break;
    }
    case 'CHANGE_LANGUAGE': {
      newState.settings[2].switch = !newState.settings[2].switch;
      if(newState.settings[2].switch){
        newState.settings[2].language = 'fr'
      }else{
        newState.settings[2].language = 'en'
      }
      break;
    }
    case 'RESET_SETTINGS_REDUCER': {
      newState.settings = settingState.settings
      break;
    }
    default:
      return newState;
  }

  return newState;
};
