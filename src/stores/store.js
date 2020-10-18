import { createStore, combineReducers } from 'redux'

import {socket} from './reducers/reducers'
import chat from './reducers/chat'
import messages from './reducers/messages'
import alerts from './reducers/notifications'
import talk from './reducers/talk'
import call from './reducers/call'
import stream from './reducers/stream'
import peer from './reducers/peer'
import me from './reducers/me'
const reducers = combineReducers({
    socket,
    chat,
    messages,
    alerts,
    talk,
    call,
    stream,
    peer,
    me
})

const store = createStore(reducers)
window.store = store
export default store
