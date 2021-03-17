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



//*****************************************************************
//-------------- ------ -- LOGIN / LOGOUT PART  -------------- ------ --
//*****************************************************************


export const userSignIn = ({username, password}) => {
  DebugHTTP('INFO',"HTTP --> SIGN IN")
  DebugHTTP('INFO',username,password)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/login', {
        username: username,
        password: password
      }
    ).then(async ({data}) => {
      //DebugHTTP("userSignIn: ", data);
      if (data.success) {
        RNPusherPushNotifications.clearAllState()
        const token = "Bearer " + data.token
        AsyncStorage.setItem('userToken',   token);
        AsyncStorage.setItem('user',   JSON.stringify(data.user));
        axios.defaults.headers.common['Authorization'] = token;
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        dispatch({type: USER_DATA, payload: data.user});
        dispatch({type: 'LOGIN', token: data.token});
        dispatch({ type: 'RESET_RESETPASSWORD_REDUCER'})
        dispatch({ type: 'RESET_REGISTRATION_REDUCER'})
        dispatch({type:'server/authenticate', token: token, username:data.user.username});
        //setPusher()

        RNPusherPushNotifications.setUserId(
          data.user.username,
          data.beamsToken.token,
          (statusCode, response) => { console.error(statusCode, response) },
          () => { console.log('Success') }
        )

        DeviceEventEmitter.emit('reloadCentralInformations')
        NavigatorService.navigate('Home')

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



export const userSignOut = () => {
  return (dispatch) => {
    axios.get('auth/logout'
    ).then(async ({data}) => {

      if (data.success) {
        clearEveryFuckingState(dispatch)
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



export const clearEveryFuckingState = (dispatch) => {
  RNPusherPushNotifications.clearAllState()
  AsyncStorage.clear();
  DebugHTTP('INFO','loging out')
  dispatch({type: FETCH_START});
  axios.defaults.headers.common['Authorization'] = "Bearer ";
  dispatch({ type: 'RESET_USER_REDUCER'})
  dispatch({ type: 'RESET_SETTINGS_REDUCER'})
  dispatch({ type: 'RESET_APPAIRING_REDUCER'})
  dispatch({ type: 'RESET_MASTERNODE_REDUCER'})
  dispatch({ type: 'RESET_SENSORNODE_REDUCER'})
  dispatch({ type: 'RESET_RESETPASSWORD_REDUCER'})
  dispatch({ type: 'RESET_REGISTRATION_REDUCER'})
  dispatch({ type: 'RESET_COMMUNITY_REDUCER'})
  dispatch({type:'server/logout'})
  dispatch({type: FETCH_SUCCESS});
}
