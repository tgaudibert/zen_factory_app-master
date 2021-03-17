const FETCH_ERROR = 'FETCH_ERROR'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const USER_REGISTERING_SET = 'USER_REGISTERING_SET'
const USER_TOKEN_SET = 'USER_TOKEN_SET'
const FETCH_START = 'FETCH_START'
const USER_DATA = 'USER_DATA'

import axios from '../../util/Api'
import AsyncStorage from '@react-native-community/async-storage';
axios.defaults.timeout = 4000;

import { DebugHTTP } from '../../util/Debug'
import NavigatorService from '../../util/navigator'
import {DeviceEventEmitter} from 'react-native'
import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import { translate } from "../../../App";

import {clearEveryFuckingState} from './Auth'

//********************************************************************
//----------------   STEP 1 - SEND EMAIL   ----------------------------



export const resetPassword = (username) => {
  DebugHTTP('INFO',"HTTP --> UPDATE PROFILE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('resetpassword/request', {
        username:username
      }
    ).then(async ({data}) => {
      DebugHTTP('INFO',"resetPassword: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        NavigatorService.navigate('CodeValidationDigit')
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors});

      }
    }).catch(function (error,data) {
      DebugHTTP('ERROR',error)
      dispatch({type: FETCH_ERROR, payload: error});

    });
  }
};


//********************************************************************
//----------------   STEP 2 - VALIDATE CODE   ----------------------------



export const validateResetCode = ({username, verification_code}) => {
  DebugHTTP('INFO',"HTTP --> VALIDATE RESET CODE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('resetpassword/validate', {
        username:username,
        verification_code:verification_code
      }
    ).then(async ({data}) => {
      DebugHTTP('INFO',"validateCode: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        dispatch({ type: 'ADD_RESET_CODE', verification_code: verification_code })
        NavigatorService.navigate('NewPassword')

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
//----------------   STEP 3 - GIVE NEW PASSWORD   ----------------------------


export const newPassword = ({confirm_password, password, username, verification_code}) => {
  DebugHTTP('INFO',"HTTP --> UPDATE PROFILE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('resetpassword/new', {
        confirm_password:confirm_password,
        password:password,
        username:username,
        verification_code:verification_code
      }
    ).then(async ({data}) => {
      //DebugHTTP("userNewPassword: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        RNPusherPushNotifications.clearAllState()
        AsyncStorage.clear();
        DebugHTTP('INFO','loging out')
        axios.defaults.headers.common['Authorization'] = "Bearer ";
        dispatch({ type: 'RESET_USER_REDUCER'})
        dispatch({ type: 'RESET_SETTINGS_REDUCER'})
        dispatch({ type: 'RESET_APPAIRING_REDUCER'})
        dispatch({ type: 'RESET_MASTERNODE_REDUCER'})
        dispatch({ type: 'RESET_SENSORNODE_REDUCER'})
        dispatch({ type: 'RESET_RESETPASSWORD_REDUCER'})
        dispatch({ type: 'RESET_REGISTRATION_REDUCER'})
        dispatch({ type: 'RESET_COMMUNITY_REDUCER'})
        const successObject = {
          subject:translate('AUTH_NEWPASSWORD_SUCCESS'),
          message:translate('AUTH_NEWPASSWORD_SUCCESS_LOGIN')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        NavigatorService.navigate('Success')

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
