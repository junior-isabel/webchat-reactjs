import { createStore, combineReducers } from 'redux'

import {socket} from './reducers/reducers'
import chat from './reducers/chat'
import messages from './reducers/messages'
import alerts from './reducers/notifications'
import talk from './reducers/talk'
const reducers = combineReducers({
    socket,
    chat,
    messages,
    alerts,
    talk
})

const store = createStore(reducers)

export default store
