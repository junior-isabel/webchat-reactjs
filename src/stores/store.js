import { createStore, combineReducers } from 'redux'

import {socket} from './reducers/reducers'
import chat from './reducers/chat'
import messages from './reducers/messages'
import alerts from './reducers/notifications'
import talk from './reducers/talk'
import call from './reducers/call'
const reducers = combineReducers({
    socket,
    chat,
    messages,
    alerts,
    talk,
    call
})

const store = createStore(reducers)

export default store
