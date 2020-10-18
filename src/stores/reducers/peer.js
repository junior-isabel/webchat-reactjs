export const SET_PEER = "SET_PEER"


export default (state = null, action) => {

  switch (action.type) {
    case SET_PEER:
      return action.payload
    default:
      return state
  }
}