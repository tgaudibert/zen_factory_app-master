const FETCH_ERROR = 'FETCH_ERROR'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_START = 'FETCH_START'
const MASTER_NODE_LIST = 'MASTER_NODE_LIST'

import axios from '../../util/Api'
import AsyncStorage from '@react-native-community/async-storage';
import NavigatorService from '../../util/navigator'
import {DeviceEventEmitter} from 'react-native'
import { DebugHTTP } from '../../util/Debug'
import { translate } from "../../../App";

import {clearEveryFuckingState} from './Auth'

//*****************************************************************
//-------------- ------ -- CRUD FOR sensorsmaster  -------------- ------ --
//*****************************************************************


export const getMasterNodes = ({token:token}) => {
  DebugHTTP('INFO',"HTTP --> GET MASTER NODE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('masternodes',
    ).then(({data}) => {
      //DebugHTTP("getMasterNodes: ", data);
      if (data.success) {
        dispatch({type: MASTER_NODE_LIST, payload: data.masternodes});
        //dispatch({type: FETCH_SUCCESS, payload: data.success});
        AsyncStorage.setItem('masternodes',   JSON.stringify(data.masternodes));
        DeviceEventEmitter.emit('reloadSensorNodeInformations')
        DeviceEventEmitter.emit('reloadCommunityInformations')
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});

      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error});
      DebugHTTP('ERROR',error)
      if(error.request && error.request.status == 401){
        clearEveryFuckingState(dispatch)
      }

    });
  }
};



export const createMasterNode = ( masternode_name) => {
  DebugHTTP('INFO',"HTTP --> CREATE MASTER NODE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('masternode/create', {
        masternode_name: masternode_name
      }
    ).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('MASTERNODE_CREATE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        DeviceEventEmitter.emit('reloadCentralInformations')
        NavigatorService.navigate('Success')

      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});

      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error});
      DebugHTTP('ERROR',error)
      if(error.request && error.request.status == 401){
        clearEveryFuckingState(dispatch)
      }
    });
  }
};




export const updateMasterNode = ({isactive, masternode_name}) => {
  DebugHTTP('INFO',"HTTP --> updateMASTER NODE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('masternode/update', {
        isactive:isactive,
        masternode_name: masternode_name
      }
    ).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:"Masternode succesfully updated",
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        DeviceEventEmitter.emit('reloadCentralInformations')
        NavigatorService.navigate('Success')

      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});

      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error});
      DebugHTTP('ERROR',error)
      if(error.request && error.request.status == 401){
        clearEveryFuckingState(dispatch)
      }
    });
  }
};
