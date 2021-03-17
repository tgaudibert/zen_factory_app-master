const FETCH_ERROR = 'FETCH_ERROR'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const USER_REGISTERING_SET = 'USER_REGISTERING_SET'
const USER_TOKEN_SET = 'USER_TOKEN_SET'
const FETCH_START = 'FETCH_START'
const USER_DATA = 'USER_DATA'
const HIDE_MESSAGE = 'HIDE_MESSAGE'
const SHOW_MESSAGE = 'SHOW_MESSAGE'
const HIDE_MODAL = 'HIDE_MODAL'
const SHOW_MODAL = 'SHOW_MODAL'
const SHOW_SUCCESS = 'SHOW_SUCCESS'

const INIT_STATE = {
  error: "",
  loading: false,
  message: '',
  modal:false,
  is_error:false,
  subject:''
};


export const commonReducer =  (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {...state, error: '', message: '', loading: true, is_error:false};
    }
    case FETCH_SUCCESS: {
      return {...state, error: '', message: action.payload, loading: false, is_error:false};
    }
    case SHOW_MESSAGE: {
      return {...state, error: '', message: action.payload, loading: false,  is_error:false};
    }
    case FETCH_ERROR: {
      return {...state, loading: false, error: action.payload, message: '', is_error:true};
    }
    case HIDE_MESSAGE: {
      return {...state, loading: false, error: '', message: '',  is_error:false};
    }
    case HIDE_MODAL: {
      return {...state, loading: false, modal: false, message:'', is_error:false};
    }
    case SHOW_SUCCESS: {
      return {...state, loading: false, modal:true, message: action.message, subject:action.subject,  is_error:false};
    }
    default:
      return state;
  }
}
