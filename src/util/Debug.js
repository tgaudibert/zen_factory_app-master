const HTTP_AUTH_ERROR= 'HTTP_AUTH_ERROR'
const HTTP_COMMUNITY_ERROR= 'HTTP_COMMUNITY_ERROR'
const HTTP_MASTERNODE_ERROR= 'AUTH_ERROR'
const HTTP_SENSORNODE_ERROR= 'AUTH_ERROR'



export function DebugHTTP(type, data){
  if(type == 'ERROR'){
    if(data.config){
      console.log(data.config.url)
      console.log(data.config.method)
      switch(data.request.status){
        case 0:
          console.log('NO CONNECTION')
          break
        case 400:
          console.log('BAD REQUEST')
          break
        case 401:
          console.log('AUTHENTIFICATION REQUIRED')
          break
        case 403:
          console.log('NOT AUTHORIZED')
        case 500:
          console.log('INTERNAL_ERROR')
          break
        case 502:
          console.log('SERVER_DOWN')
          break

        default:
          console.log('no event')
      }
    }else{
      console.log('Type Error')
      console.log(data)
    }

  }
}


export function HandleCommunityHttp(type, data){
  switch(type){
    case 'ERROR':
      console.log(HTTP_COMMUNITY_ERROR)
      break
    case 'INFO':
      console.log(data)
      break
    default:
      console.log('no event')
  }
}
