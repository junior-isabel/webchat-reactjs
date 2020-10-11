import React, {useEffect, useRef} from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/routes'
import startSocket from './api/socket'
import {CONNECTION} from './stores/reducers/reducers'
import {useDispatch, useSelector} from 'react-redux'
import getToken from './utils/token';

import TypeActions from './stores/constants'
import CallModal from './components/callModal/call'
import ReceiveCallVideo from './components/ReceiveCallVideo/receive-call-video'

function App() {
  const dispatch = useDispatch()
  const talk = useSelector(state => state.talk)
  const call = useSelector(state => state.call)
  const token = getToken()
  const socket = useRef()

  useEffect(() => {
    socket.current = startSocket()
    dispatch({
      type: CONNECTION,
      payload: socket.current
    })
    if (!token) {
      window.localStorage.clear()
    }
    socket.current.on('connect', (connect) => {
      socket.current.emit('set token', token)
      socket.current.on('send message', (data) => {
        dispatch({
          type: TypeActions.ADD_MESSAGE,
          payload: {
            userId: talk.userId,
            message: data
          }
        })

        if (talk.userId !== data.User.id) {
          dispatch({
            type: TypeActions.INCREMENT_NOTIFICATION_MESSAGE,
            payload: {
              userId: data.User.id,
              message: data
            }
          })
        }
      })
    })
    socket.current.on('call-video-in-action', () => {
      console.log('call in action')
    })
    socket.current.on('call-video-from', data => {
      if (call.status === 'call accept') return
      dispatch({
        type: TypeActions.STATUS_CALL,
        payload: {status: 'receive call', from: data},
      })
    })
  }, [dispatch, token, talk.userId, call])


  let Modal
  switch (call.status) {
    case 'call user':
    case 'call accept':
      Modal = (<CallModal />)
      break;
    case 'receive call':
      Modal = (<ReceiveCallVideo />)
      break
    default:
      Modal = (<></>)
      break;
  }
  return (
    <div className="App">
      <BrowserRouter>
        {Modal}
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
