import jwt_decode from 'jwt-decode';
import axios from './Api'


export async function isAuthenticated(){
  const token = axios.defaults.headers.common['secret-token']
  console.log(token)
  if(token){
    try{
      var decoded = jwt_decode(token);
      if(new Date().getTime() > decoded.exp*1000){
        console.log("token expired")
        return false
      }else{
        console.log("token ok")
        return true
      }
    }catch(error){
      console.log(error)
      return false
    }
  }else{
    console.log("no token")
    return false
  }
}

//isAuthenticated()
