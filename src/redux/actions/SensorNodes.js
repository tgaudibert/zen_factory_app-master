const FETCH_ERROR = 'FETCH_ERROR'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_START = 'FETCH_START'
const SENSOR_NODES_LIST = 'SENSOR_NODES_LIST'
const SENSOR_NODES_WAITING = 'SENSOR_NODES_WAITING'

import axios from '../../util/Api'
import AsyncStorage from '@react-native-community/async-storage';
import NavigatorService from '../../util/navigator'
import { DebugHTTP } from '../../util/Debug'
import {DeviceEventEmitter} from 'react-native'
import { translate } from "../../../App";

import {clearEveryFuckingState} from './Auth'


//*****************************************************************
//-------------- ------ --  SENSORS PART  -------------- ------ --
//*****************************************************************
export const getSensorNodes = ({id_masternode:id_masternode}) => {
  DebugHTTP('INFO',"HTTP --> GET ACTIVE SENSORS")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get( id_masternode+'/sensors',
    ).then(({data}) => {
      if (data.success) {
        AsyncStorage.setItem('sensornodes',   JSON.stringify(data.sensornodes));
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SENSOR_NODES_LIST, payload: data.sensornodes});

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



export const getWaitingSensorNodes = ({id_masternode:id_masternode}) => {
  DebugHTTP('INFO',"HTTP --> GET WAITING SENSORS")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(id_masternode + '/sensors/waiting',
    ).then(({data}) => {
      if (data.success) {
        AsyncStorage.setItem('sensornodes_waiting',  JSON.stringify(data.sensornodes_waiting));
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SENSOR_NODES_WAITING, payload: data.sensornodes_waiting});

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



export const updateSensorNode = ({isactive, sensornode_product, sensornode_name, id_sensornode, id_device}) => {
  DebugHTTP('INFO',"HTTP --> updateSensorNode")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('sensors/me/update', {
        id_sensornode:id_sensornode,
        isactive:isactive,
        sensornode_product:sensornode_product,
        id_device:id_device,
        sensornode_name: sensornode_name
      }
    ).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});
        const successObject = {
          subject:translate('SENSORNODE_UPDATE_SUCCESS'),
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




export const deleteSensorNode = (id_sensornode) => {
  DebugHTTP('INFO',"HTTP --> GET PROFILE")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('sensors/'+id_sensornode+ "/delete",
    ).then(({data}) => {
      DebugHTTP("deleteSensorNode: ", data);
      if (data.success) {
        const successObject = {
          subject:translate('SENSORNODE_DELETE_SUCCESS'),
          message:translate('GO_BACK_MENU')
        }
        dispatch({ type: 'SHOW_SUCCESS', message:successObject.message, subject:successObject.subject })
        dispatch({type: FETCH_SUCCESS});
        DeviceEventEmitter.emit('reloadCentralInformations')
        NavigatorService.navigate('Success')

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






//OLD REQUEST


export const createSensorNode = ({isactive, sensornode_product, sensornode_name, id_masternode, id_device}) => {
  DebugHTTP('INFO',"HTTP --> createSensorNode")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('sensors/me/create', {
        id_masternode:id_masternode,
        isactive:isactive,
        sensornode_product:sensornode_product,
        id_device:id_device,
        sensornode_name: sensornode_name
      }
    ).then(({data}) => {
      if (data.success) {
        dispatch({type: FETCH_SUCCESS, payload: data.success});

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
