const FETCH_ERROR = 'FETCH_ERROR'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_START = 'FETCH_START'
const ADD_API_KEY = 'ADD_API_KEY'
const ADD_WIFI_PASS ='ADD_WIFI_PASS'
const ADD_BASE_URL = 'ADD_BASE_URL'
const ADD_WIFI_SSID = 'ADD_WIFI_SSID'

import axios from 'axios'
import centralAxios from '../../util/Api'
import {BASE64_BASEURL} from '../../util/Api'
import AsyncStorage from '@react-native-community/async-storage';
import { DebugHTTP } from '../../util/Debug'
import { translate } from "../../../App";

console.log(BASE64_BASEURL)

//*****************************************************************
//-------------- ------ --  USER PART  -------------- ------ --
//*****************************************************************
export const generateMasterNodeKey = (id_masternode) => {
  DebugHTTP('INFO',"HTTP --> GET MASTERNODEKEY")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    centralAxios.get(`/masternode/${id_masternode}/generate_key`
    ).then(({data}) => {
      if (data.success) {
        AsyncStorage.setItem('masternodeKey', data.token.toString());
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_API_KEY, api_key: data.token});

      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});

      }
    }).catch(function (error) {
      DebugHTTP('ERROR',error);
      dispatch({type: FETCH_ERROR, payload: error});

    });
  }
};
//*****************************************************************
//-------------- ------ -- REGISTERING PART  -------------- ------ --
//*****************************************************************



export const setApi_domain = (domain_name) => {
  console.log('INFO',domain_name)
  return new Promise((resolve,reject)=>{
    axios.get('http://192.168.4.1/'+BASE64_BASEURL+"/base-url", {timeout:5000}
    ).then(({data}) => {
      resolve(data)
    }).catch(function (error) {
      DebugHTTP('ERROR',error);
      reject(error)
    });
  })
};

export const setApi_key = (apiKey) => {
  console.log('INFO',apiKey)
  return new Promise((resolve,reject)=>{
    axios.get('http://192.168.4.1/'+apiKey+"/access-token", {timeout:5000}
    ).then(({data}) => {
      resolve(data)
    }).catch(function (error) {
      DebugHTTP('ERROR',error);
      reject(error)
    });
  })
};

export const setWifi_ssid = (wifi_ssid) => {
  console.log('INFO',wifi_ssid)
  return new Promise((resolve,reject)=>{
    axios.get('http://192.168.4.1/'+wifi_ssid+"/wifi_ssid", {timeout:5000}
    ).then(({data}) => {
      resolve(data)
    }).catch(function (error) {
      reject(error)
    });
  })
};

export const setWifi_pass = (wifi_pass) => {
  console.log('INFO',wifi_pass)
  return new Promise((resolve,reject)=>{
    axios.get('http://192.168.4.1/'+wifi_pass+"/wifi_pass", {timeout:5000}
    ).then(({data}) => {
      resolve(data)
    }).catch(function (error) {
      DebugHTTP('ERROR',error);
      reject(error)
    });
  })
};


export const setSyncword = (syncWord) => {
  console.log('INFO',syncWord)
  return new Promise((resolve,reject)=>{
    axios.get('http://192.168.4.1/'+syncWord+"/sync_word", {timeout:5000}
    ).then(({data}) => {
      resolve(data)
    }).catch(function (error) {
      DebugHTTP('ERROR',error);
      reject(error)
    });
  })
};
