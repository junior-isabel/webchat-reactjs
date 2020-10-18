export const ADD_NOTIFICATION_MESSAGE = "COUNTER MESSAGE"
export const INCREMENT_NOTIFICATION_MESSAGE = "INCREMENT COUNTER MESSAGE"
export const RESET_COUNTER_MESSAGE = "RESET COUNTER MESSAGE"
export const RESET_NOTIFICATION_MESSAGEM = "RESET NOTIFICATION MESSAGE"
const initialState = {}

export default function alerts(state = initialState, action) {

  const payload = action.payload
  switch (action.type) {

    case ADD_NOTIFICATION_MESSAGE:
      return Object.assign({}, state, {
        [payload.id]: {
          counter: 1
        }
      })
    case INCREMENT_NOTIFICATION_MESSAGE:
      if (state[payload.userId]) {
        return Object.assign({}, state, {
          [payload.id]: {
            counter: state[payload.userId].counter + 1
          }
        })
      }
      return Object.assign({}, state, {
        [payload.id]: {
          counter: 1
        }
      })
    case RESET_COUNTER_MESSAGE:
      return Object.assign({}, state, {
        [payload.id]: {
          counter: 0
        }
      })
    case RESET_NOTIFICATION_MESSAGEM:
      return initialState
    default:
      return state
  }
}