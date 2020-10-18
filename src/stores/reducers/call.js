export const STATUS_CALL = "CALL_SET_STATUS"
export const STATUS_REST ="CALL_RESET"
export const STATUS_SET_SOCKETTO ="STATUS_SET_SOCKETTO"


export default (state = {status: '', to: null, from: null}, action) => {

  switch (action.type) {
    case STATUS_CALL:
      return { ...state, status: 'call user', ...action.payload }
    case STATUS_REST:
      return { ...state, status: '', to: null, from: null }
    case STATUS_SET_SOCKETTO: 
      return {...state, socketTo: action.payload}
    default:
      return state
  }
}