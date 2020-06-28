export const CONNECTION = "CONNECTION"
export const DISCONNECT = "DISCONNECT"
export const RESET_CONNECTION = "RESET CONNECTION"
export function socket(state = null, action) {

  switch (action.type) {
    case CONNECTION:
      return action.payload
    case DISCONNECT:
      return null
    case RESET_CONNECTION:
      return null
    default:
      return state
  }
}