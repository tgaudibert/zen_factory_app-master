const FETCH_ERROR = 'FETCH_ERROR'
const FETCH_START = 'FETCH_START'
const FETCH_SUCCESS = 'FETCH_SUCCESS'


import axios from '../../util/Api'
import AsyncStorage from '@react-native-community/async-storage';
axios.defaults.timeout = 4000;

import NavigatorService from '../../util/navigator'
import {DeviceEventEmitter} from 'react-native'
import { DebugHTTP } from '../../util/Debug'
import { translate } from "../../../App";

import {clearEveryFuckingState} from './Auth'




//*****************************************************************
//-------------- ------ --  USER PART  -------------- ------ --
//*****************************************************************
export const getCommunity = (id_masternode) => {
  DebugHTTP('INFO',"HTTP --> GET COMMUNITY")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`community/${id_masternode}/me`,
    ).then(({data}) => {
      //DebugHTTP("getCommunity: ", data);
      if (data.success) {
        AsyncStorage.setItem('community',   JSON.stringify(data.users));
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: 'UPDATE_COMMUNITY', payload: data.users});

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


export const leaveCommunity = (id_masternode) => {
  DebugHTTP('INFO',"HTTP --> LEAVE COMMUNITY")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`community/${id_masternode}/leave`,
    ).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('COMMUNITY_LEAVE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        dispatch({ type: 'RESET_COMMUNITY_REDUCER'})
        AsyncStorage.setItem('community',   JSON.stringify([]));
        NavigatorService.navigate('Success')
        DeviceEventEmitter.emit('reloadCentralInformations')
        //DeviceEventEmitter.emit('reloadCommunityInformations')
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

export const deleteCommunity = (id_masternode) => {
  DebugHTTP('INFO',"HTTP --> DELETE COMMUNITY")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`community/${id_masternode}/delete`,
    ).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('COMMUNITY_DELETE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        NavigatorService.navigate('Success')
        DeviceEventEmitter.emit('reloadCentralInformations')
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


export const acceptInvitationCommunity = ({username, verification_code}) => {
  DebugHTTP('INFO',"HTTP --> ACCEPT INVITATION")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/community/accept`, {
        username:username,
        verification_code:verification_code
      }
    ).then(async ({data}) => {
      DebugHTTP('INFO',"InvitationSent: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('COMMUNITY_JOIN_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        NavigatorService.navigate('Success')
        DeviceEventEmitter.emit('reloadCentralInformations')

      } else {
        DebugHTTP('ERRRRRRR ' + data)
        dispatch({type: FETCH_ERROR, payload: data.error});

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


export const sendInvitationCommunity = ({id_masternode,email,action_type}) => {
  DebugHTTP('INFO',"HTTP --> SEND INVITATION")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`community/me/invite`, {
        email:email,
        id_masternode:id_masternode
      }
    ).then(async ({data}) => {
      DebugHTTP("InvitationSent: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('COMMUNITY_INVITE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        NavigatorService.navigate('Success')
        DeviceEventEmitter.emit('reloadCentralInformations')

      } else {
        DebugHTTP('ERRRRRRR ' + data)
        dispatch({type: FETCH_ERROR, payload: data.errors});

      }
    }).catch(function (error,data) {
      DebugHTTP('ERROR',error)
      dispatch({type: FETCH_ERROR, payload: error});
    });
  }
};



export const excludeUser = ({id_masternode,username}) => {
  DebugHTTP('INFO',"HTTP --> USER EXCLUSION")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`community/exclude`, {
        username:username,
        id_masternode:id_masternode
      }
    ).then(async ({data}) => {
      DebugHTTP("user excluded: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('COMMUNITY_EXCLUDE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        NavigatorService.navigate('Success')
        DeviceEventEmitter.emit('reloadCommunityInformations')

      } else {
        DebugHTTP('ERRRRRRR ' + data)
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
