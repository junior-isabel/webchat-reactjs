export const STATUS_CALL = "CALL_SET_STATUS"



export default (state = {status: ''}, action) => {

  switch (action.type) {
    case STATUS_CALL:
      return {...state, ...action.payload}
    default:
      return state
  }
}