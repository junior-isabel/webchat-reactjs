export const SET_MESSAGE = 'SET MESSAGE'
export const ADD_MESSAGE = "ADD MESSAGE"
export const ADD_MESSAGE_ALERT = "ADD MESSAGE ALERT"
export const RESET_MESSAGE_ALERT ="RESET MESSAGE ALERT"
const initialState = { }

export default function messages (state = initialState, action) {
  
  const payload = action.payload
  switch (action.type) {
    case SET_MESSAGE:
    return Object.assign({}, state, {
      [payload.userId]: {
        messages: payload.messages
      }
    })
    case ADD_MESSAGE:
      if (state[payload.userId]) {
        return Object.assign({}, state, {
          [payload.userId]: Object.assign({}, state[payload.userId], {
            messages: state[payload.userId].messages.concat(payload.message)
          })
        })
      }
      return state
    case RESET_MESSAGE_ALERT:
      return initialState

    default:
    return state
  }
}



