import { combineReducers } from 'redux';
import { sensorNodesReducer as sensor } from './sensorNodesReducer';
import { registrationReducer as registration } from './registrationReducer';
import { communityReducer as community } from './communityReducer';

import { settingReducer as setting } from './settingReducer';
import { userReducer as user} from './userReducer';
import {commonReducer as common} from './commonReducer';
import {appairingReducer as appairing} from './appairingReducer';
import {masterNodesReducer as masternodes} from './masterNodesReducer';
import {resetPasswordReducer as resetpassword} from './resetPasswordReducer';
import {socketReducer as socket} from './socketReducer';
//import { newSensorReducer as newSensor } from './newSensorReducer';
//import { notificationReducer as notification } from './notificationReducer';

export const rootReducer = combineReducers({
  sensor,
  masternodes,
  common,
  registration,
  setting,
  resetpassword,
  community,
  socket,
  //newSensor,
  appairing,
  user
});
