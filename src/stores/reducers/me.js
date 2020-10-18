export const SET_ME_SOCKET = "SET_PEER"


export default (state = {socket: null}, action) => {

  switch (action.type) {
    case SET_ME_SOCKET:
      return { ...state, socket: action.payload }
    default:
      return state
  }
}