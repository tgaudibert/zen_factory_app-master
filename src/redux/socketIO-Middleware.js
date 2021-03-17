import AsyncStorage from '@react-native-community/async-storage';
import { translate } from "../../App";
import {DeviceEventEmitter} from 'react-native'

export default function createSocketIoMiddleware(socket, criteria = [],
  { eventName = 'action', execute = defaultExecute } = {}) {
  const emitBound = socket.emit.bind(socket);
  return ({ dispatch }) => {
    // Wire socket.io to dispatch actions sent by the server.


    socket.on(eventName, dispatch);
    socket.on('AUTH_REQUIRED', async function(){
      console.log('AUTH_REQUIRED')
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await AsyncStorage.getItem('user');
      if(userToken && user){
        socket.emit('action',{type:'server/authenticate', token:userToken, username:JSON.parse(user).username})
      }
    });


    socket.on('DEVICE_NOTIFICATION', function(data){
      //alert(data.type);
      switch(data.type){
        case 'MASTERNODE_CONNECTED':
              alert(translate(data.type));
              DeviceEventEmitter.emit('reloadCentralInformations')
              //state = { ...state, requireAuth:false};
              break;

        case 'LOW_BATTERY':
              alert(translate(data.type) + data.sensornode.sensornode_name);
              DeviceEventEmitter.emit('reloadSensorNodeInformations')
              //state = { ...state, requireAuth:false};
              break;

        case 'LOW_LEVEL':
              alert(translate(data.type) + data.sensornode.sensornode_name);
              DeviceEventEmitter.emit('reloadSensorNodeInformations')
              //state = { ...state, requireAuth:false};
              break;

        case 'NEW_PENDING_SENSOR':
              alert(translate(data.type));
              DeviceEventEmitter.emit('reloadSensorNodeInformations')
              //state = { ...state, requireAuth:false};
              break;

        case 'WEAK_SIGNAL':
              console.log(data.sensornode)
              //alert(translate(data.type) + data.sensornode.sensornode_name);
        default:
              return
      }
              //state =
    });




    return next => (action) => {
      if (evaluate(action, criteria)) {
        return execute(action, emitBound, next, dispatch);
      }
      return next(action);
    };
  };

  function evaluate(action, option) {
    if (!action || !action.type) {
      return false;
    }

    const { type } = action;
    let matched = false;
    if (typeof option === 'function') {
      // Test function
      matched = option(type, action);
    } else if (typeof option === 'string') {
      // String prefix
      matched = type.indexOf(option) === 0;
    } else if (Array.isArray(option)) {
      // Array of types
      matched = option.some(item => type.indexOf(item) === 0);
    }
    return matched;
  }

  function defaultExecute(action, emit, next, dispatch) { // eslint-disable-line no-unused-vars
    emit(eventName, action);
    return next(action);
  }
}
