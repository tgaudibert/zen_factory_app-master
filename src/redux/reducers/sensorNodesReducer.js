
var sensorState = {
  sensornodes: [

  ],
  sensornodes_waiting:[

  ],

  sensornodes_waitinSig:[

  ],


  current_sensornode:{
    sensornode_product:'',
    sensornode_name:''
  },

  updating_sensornode:{
    sensornode_product:'',
    sensornode_name:''
  }
};



export const sensorNodesReducer = (state = sensorState, action) => {
  switch (action.type) {

    case 'SENSOR_NODES_WAITINGSIG': {
      state = { ...state,sensornodes_waitinSig: action.payload};
      break;
    }
    case 'SENSOR_NODES_WAITING': {
      state = { ...state,sensornodes_waiting: action.payload};
      break;
    }
    case 'SENSOR_NODES_LIST': {
      state = { ...state, sensornodes: action.payload};
      break;
    }
    case 'CURRENT_SENSOR_NODE': {
      console.log(action.sensornode)
      state = { ...state, current_sensornode: action.sensornode };
      state = { ...state, updating_sensornode: action.sensornode };
      break;
    }

    case 'NEW_SENSORNODE_ID': {
      state = { ...state, current_sensornode: {...state.current_sensornode, device_id: action.device_id }};
      break;
    }
    case 'NEW_SENSORNODE_NAME': {
      state = { ...state, current_sensornode: {...state.current_sensornode, sensornode_name: action.sensornode_name }};
      break;
    }
    case 'NEW_SENSORNODE_PRODUCT': {
      state = { ...state, current_sensornode: {...state.current_sensornode, sensornode_product: action.sensornode_product }};
      break;
    }
    case 'UPDATE_SENSORNODE_NAME': {
      console.log("sensorname reducer: "+action.sensornode_name)
      state = { ...state, updating_sensornode: {...state.updating_sensornode, sensornode_name: action.sensornode_name }};
      break;
    }
    case 'UPDATE_SENSORNODE_PRODUCT': {
      console.log("sensorproduct reducer: "+action.sensornode_product)
      state = { ...state, updating_sensornode: {...state.updating_sensornode, sensornode_product: action.sensornode_product }};
      break;
    }

    case 'RESET_SENSORNODE_REDUCER': {
      state = sensorState
      break;
    }
    default:
      return state;
  }
  return state;
};







var oldsensorState = {
  sensornodes: [
    {
      id_sensorsnode:0,
      sensornode_name:"test",
      id_device:"fesfs,qzpo23qfse4",
      product:"Chlore",
      battery_porcent:25,
      filling_porcent:25,
      data_sensor:{
        sensor1:1,
        sensor2:0
      },
      wakeup_numb:10,
      capacity:1000,
      iswaiting:0,
      isactive:1,
      added_at:'2020-04-03T11:36:28.970Z',
      created_at: '2020-04-03T11:36:28.958Z'
    }
  ],
  sensornodes_waiting:[
    {
      id_sensorsnode:1,
      isactive:0,
      iswaiting: 1
    }
  ]
};
