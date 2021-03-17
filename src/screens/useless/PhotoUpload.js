const FETCH_ERROR = 'FETCH_ERROR'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_START = 'FETCH_START'


import axios from '../../util/Api'
axios.defaults.timeout = 8000;

import NavigatorService from '../../util/navigator'
import {DeviceEventEmitter} from 'react-native'


const createFormData = (photo, body) => {
  const data = new FormData();
  data.append('name', 'avatar');
  data.append('fileData', {
   uri : photo.uri,
   type: photo.type,
   name: photo.fileName
  });
  return data;
};




export const updateProfilePicture = ({photo, body}, callback) => {
  const formData = createFormData(photo, body);
  console.log('INFO',"HTTP --> UPDATE PROFILE PIC")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/me/profile_pic/upload', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
    }).then(async ({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          mainMessage:"Account successfully updated",
          secMessage:"Go to main menu"
        }
        NavigatorService.navigate('Success',{successObject})

      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors});

      }
    }).catch(function (error,data) {
      console.log('ERROR',error)
      dispatch({type: FETCH_ERROR, payload: error});
    });
  }
};


export const updateProfilePictureFromURL = (pic_url) => {
  console.log('INFO',"HTTP --> UPDATE PROFILE PIC FROM URL")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/me/profile_pic/url', {
        pic_url:pic_url
      }
    ).then(async ({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          mainMessage:"Account successfully updated",
          secMessage:"Go to main menu"
        }
        NavigatorService.navigate('Success',{successObject})

      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors});

      }
    }).catch(function (error,data) {
      console.log('ERROR',error)
      dispatch({type: FETCH_ERROR, payload: error});
    });
  }
};



export const uploadRegisterProfilePicture = ({photo, body}, callback) => {
  const formData = createFormData(photo, body);
  console.log('INFO',"HTTP --> UPLOAD REGISTERING PROFILE PIC")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/profile_pic/upload', formData, {
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
      console.log('ERROR',error)
      dispatch({type: FETCH_ERROR, payload: error});
    });
  }
};
