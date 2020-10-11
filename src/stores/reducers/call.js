export const STATUS_CALL = "CALL_SET_STATUS"



export default (state = {status: '', to: null, from: null}, action) => {

  switch (action.type) {
    case STATUS_CALL:
      return { ...state, status: 'call user', ...action.payload }
    default:
      return state
  }
}