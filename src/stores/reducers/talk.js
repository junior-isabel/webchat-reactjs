export const SET_MESSAGE_ACTIVE_USER = "SET MESSAGE ACTIVE USER"
export const RESET_MESSAGE_ACTIVE_USER = "RESET MESSAGE ACTIVE USER"
const initialState = {}
export default function talk (state = initialState, {type, payload}) {

  switch (type) {
    case SET_MESSAGE_ACTIVE_USER:
      return {...state, userId: payload.userId}
      case RESET_MESSAGE_ACTIVE_USER:
        return initialState
    default:
      return state
  }
}