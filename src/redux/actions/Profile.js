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
import { translate } from "../../../App";

import {clearEveryFuckingState} from './Auth'



export const getUser = ({token:token}) => {
  DebugHTTP('INFO',"HTTP --> GET PROFILE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('profile/me',
    ).then(({data}) => {
      //DebugHTTP("getUser: ", data);
      if (data.success) {
        AsyncStorage.setItem('user',  JSON.stringify(data.user) );
        dispatch({type: USER_DATA, payload: data.user});

      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});

      }
    }).catch(function (error) {
      DebugHTTP('ERROR',error)
      dispatch({type: FETCH_ERROR, payload: error});
      if(error.request && error.request.status == 401){
        clearEveryFuckingState(dispatch)
      }
    });
  }
};


//*****************************************************************
//--------------------  PROFILE META  --------------------------


export const updateProfile = ({name}) => {
  DebugHTTP('INFO',"HTTP --> UPDATE PROFILE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('profile/me', {
        name:name
      }
    ).then(async ({data}) => {
      DebugHTTP("userUpdatedProfile: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('ACCOUNT_UPDATE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        DeviceEventEmitter.emit('reloadCentralInformations')
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








//*****************************************************************
//--------------------  PROFILE PICTURE  --------------------------


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




export const updateProfilePicture = ({photo, body}, callback) => {
  const formData = createFormData(photo, body);
  DebugHTTP('INFO',"HTTP --> UPDATE PROFILE PIC")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('profile/me/profile_pic/upload', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
    }).then(async ({data}) => {
      console.log(data)
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('ACCOUNT_UPDATE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        DeviceEventEmitter.emit('reloadCentralInformations')
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


export const updateProfilePictureFromURL = (pic_url) => {
  DebugHTTP('INFO',"HTTP --> UPDATE PROFILE PIC FROM URL")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('profile/me/profile_pic/url', {
        pic_url:pic_url
      }
    ).then(async ({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('ACCOUNT_UPDATE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        DeviceEventEmitter.emit('reloadCentralInformations')
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
