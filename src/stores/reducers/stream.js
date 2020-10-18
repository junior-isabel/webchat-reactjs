export const SET_STREAM = "SET_STREAM"


export default (state = null, action) => {

  switch (action.type) {
    case SET_STREAM:
      return action.payload
    default:
      return state
  }
}