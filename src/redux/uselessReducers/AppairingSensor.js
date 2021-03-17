import axios from 'axios'



//*****************************************************************
//-------------- ------ -- REGISTERING PART  -------------- ------ --
//*****************************************************************


export const setApi_key = (apiKey) => {
  console.log(apiKey)
  return new Promise((resolve,reject)=>{
    axios.get('http://192.168.4.1/'+apiKey+"/access-token", {timeout:5000}
    ).then(({data}) => {
      resolve(data)
    }).catch(function (error) {
      reject(error)
    });
  })
};

export const setDevice_id = (device_id) => {
  console.log(device_id)
  return new Promise((resolve,reject)=>{
    axios.get('http://192.168.4.1/'+device_id+"/device_id", {timeout:5000}
    ).then(({data}) => {
      resolve(data)
    }).catch(function (error) {
      reject(error)
    });
  })
};


export const setSyncword = (syncWord) => {
  console.log(syncWord)
  return new Promise((resolve,reject)=>{
    axios.get('http://192.168.4.1/'+syncWord+"/sync_word", {timeout:5000}
    ).then(({data}) => {
      resolve(data)
    }).catch(function (error) {
      reject(error)
    });
  })
};
