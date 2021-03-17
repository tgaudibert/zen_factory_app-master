import { rootReducer } from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {API_URL} from  '../../env.json'
import createSocketIoMiddleware from './socketIO-Middleware';
import io from 'socket.io-client';
let socket = io(API_URL+'server');

function optimisticExecute(action, emit, next, dispatch) {
  emit('action', action);
  next(action);
}

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/", { execute: optimisticExecute });



const store = createStore(rootReducer, applyMiddleware(thunk,socketIoMiddleware));

export default store;
