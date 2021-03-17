const FETCH_ERROR = 'FETCH_ERROR'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const USER_REGISTERING_SET = 'USER_REGISTERING_SET'
const USER_TOKEN_SET = 'USER_TOKEN_SET'
const FETCH_START = 'FETCH_START'
const USER_DATA = 'USER_DATA'

import axios from '../../util/Api'
import AsyncStorage from '@react-native-community/async-storage';
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';

axios.defaults.timeout = 4000;

import { DebugHTTP } from '../../util/Debug'
import NavigatorService from '../../util/navigator'
import {DeviceEventEmitter} from 'react-native'
import { translate } from "../../../App";

import {clearEveryFuckingState} from './Auth'

//********************************************************************
//----------------   STEP 1 - CHECK EMAIL   ----------------------------


export const checkEmail = (username) => {
  DebugHTTP('INFO',"HTTP --> CHECK EMAIL")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('register/check-email', {
        username:username
      }
    ).then(async ({data}) => {
      DebugHTTP('INFO',"validateCode: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        NavigatorService.navigate('CodeValidationDigit')

      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors});

      }
    }).catch(function (error,data) {
      DebugHTTP('ERROR',error)
      dispatch({type: FETCH_ERROR, payload: error});
      if(error.request && error.request.status == 401){
        clearEveryFuckingState(dispatch)
      }
    });
  }
};




//********************************************************************
//----------------   STEP 2 - VALIDATE REGISTRATION CODE   ----------------------------


export const validateRegistrationCode = ({username, verification_code}) => {
  DebugHTTP('INFO',"HTTP --> VALIDATE REGISTRATION CODE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('register/validate', {
        username:username,
        verification_code:verification_code
      }
    ).then(async ({data}) => {
      DebugHTTP('INFO',"validateCode: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        dispatch({ type: 'ADD_REGISTRATION_CODE', verification_code: verification_code })
        NavigatorService.navigate('Name')

      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors});

      }
    }).catch(function (error,data) {
      DebugHTTP("Error****: validate Registration");
      dispatch({type: FETCH_ERROR, payload: error});
    });
  }
};



//********************************************************************
//----------------   STEP 3 - UPDATE PROFILE PIC   ----------------------------


const createFormData = (photo, body) => {
  const data = new FormData();
  data.append('name', 'avatar');
  data.append('file', {
   uri : photo.uri,
   type: photo.type,
   name: photo.fileName
  });
  return data;
};


export const uploadRegisterProfilePicture = ({photo, body}, callback) => {
  const formData = createFormData(photo, body);
  DebugHTTP('INFO',"HTTP --> UPLOAD REGISTERING PROFILE PIC")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('register/profile_pic/upload', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
    }).then(async ({data}) => {
      if (data.success) {
        dispatch({type: 'ADD_USER_PIC', profilepic_url: data.profilepic_url});
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        NavigatorService.navigate('Password')

      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors});

      }
    }).catch(function (error,data) {
      DebugHTTP('ERROR',error)
      dispatch({type: FETCH_ERROR, payload: error});
      if(error.request && error.request.status == 401){
        clearEveryFuckingState(dispatch)
      }
    });
  }
};



//********************************************************************
//----------------   STEP 4 - FINALIZE REGISTRATION   ----------------------------


export const userSignUp = ({username, name, password, confirm_password,verification_code, profilepic_url,lang}) => {
  DebugHTTP('INFO', "HTTP --> SIGN UP")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('register/finalize', {
        password: password,
        username:username,
        name:name,
        confirm_password:confirm_password,
        verification_code:verification_code,
        profilepic_url:profilepic_url,
        lang:lang
      }
    ).then(({data}) => {
      if (data.success) {
        RNPusherPushNotifications.clearAllState()
        const token = "Bearer " + data.token
        AsyncStorage.setItem('userToken',   token);
        AsyncStorage.setItem('user',   JSON.stringify(data.user));
        axios.defaults.headers.common['Authorization'] = token;
        dispatch({type: 'LOGIN', token: data.token});
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        dispatch({type: USER_DATA, payload: data.user});
        dispatch({type: USER_REGISTERING_SET, payload: data.success});
        dispatch({type:'server/authenticate', token: token, username:data.user.username});

        RNPusherPushNotifications.setUserId(
          data.user.username,
          data.beamsToken.token,
          (statusCode, response) => { console.error(statusCode, response) },
          () => {  console.log('Success') }
        )

        DeviceEventEmitter.emit('reloadCentralInformations')
        NavigatorService.navigate('Home')

      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});

      }
    }).catch(function (error) {
      DebugHTTP('ERROR', error)
      dispatch({type: FETCH_ERROR, payload: error});
      if(error.request && error.request.status == 401){
        clearEveryFuckingState(dispatch)
      }
    });
  }
};
