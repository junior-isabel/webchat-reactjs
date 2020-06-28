export const LIST_CHAT = "LIST CHAT"
export const SET_FRIEND_CHAT = "SET FRIEND CHAT"
export const RESET_CHAT = "RESET CHAT"
const stateInitial = {
  friends: []
}

export default function chat(store = stateInitial, action) {

  switch (action.type) {

    case SET_FRIEND_CHAT:
      return Object.assign({}, store, {
        friends: action.payload
      })
    case RESET_CHAT:
      return stateInitial

    default:
      return store
  }
}