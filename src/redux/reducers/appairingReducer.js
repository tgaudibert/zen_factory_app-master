const appairingState = {
  wifi_pass: '',
  base_url: '',
  wifi_ssid: '',
  api_key: ''
};

export const appairingReducer = (state = appairingState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_WIFI_PASS': {
      newState.wifi_pass = action.wifi_pass;
      break;
    }
    case 'ADD_WIFI_SSID': {
      newState.wifi_ssid = action.wifi_ssid;
      break;
    }
    case 'ADD_BASE_URL': {
      newState.base_url = action.base_url;
      break;
    }
    case 'ADD_API_KEY': {
      newState.api_key = action.api_key;
      break;
    }
    case 'RESET_APPAIRING_REDUCER': {
      newState.wifi_pass = appairingState.wifi_pass;
      newState.wifi_ssid = appairingState.wifi_ssid;
      newState.base_url = appairingState.base_url;
      newState.api_key = appairingState.api_key;
      break;
    }
    default:
      return newState;
  }
  return newState;
};
