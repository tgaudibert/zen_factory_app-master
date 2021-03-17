import axios from 'axios';
import base64 from 'react-native-base64'

import {API_URL} from  '../../env.json'

//const API_URL = 'http://192.168.0.23:8070/'

export const BASE64_BASEURL = base64.encode(API_URL);

var axiosConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  default:{
    timeout: 2000
  }
}



export default axios.create(axiosConfig);
