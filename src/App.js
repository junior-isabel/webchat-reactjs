import React, {useEffect, useRef} from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/routes'
import startSocket from './api/socket'
import {CONNECTION } from './stores/reducers/reducers'
import {useDispatch, useSelector} from 'react-redux'
import getToken from './utils/token';

import TypeActions from './stores/constants'
import CallModal from './components/callModal/call'
import ReceiveCallVideo from './components/ReceiveCallVideo/receive-call-video'

function App() {
  const dispatch = useDispatch()
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
  
    socket.current.on('connect', () => {
      socket.current.emit('set-token', token)
    })
  
    socket.current.on('call-video-in-action-close', () => {
      dispatch({
        type: TypeActions.STATUS_REST
      })
    })
  }, [])

  useEffect(() => {
    socket.current.off('call-video-from')
    socket.current.on('call-video-from', data => {
      if (!call.status) {
        dispatch({
          type: TypeActions.STATUS_CALL,
          payload: {status: 'receive call', from: data},
        })
      }
    })
  }, [call])

  useEffect(() => {
    if (!socket.current) return
    socket.current.off('new-message')
    socket.current.on('new-message', (data) => {
      dispatch({
        type: TypeActions.ADD_MESSAGE,
        payload: {
          userId: data.talkId,
          message: data
        }
      })
      dispatch({
        type: TypeActions.INCREMENT_NOTIFICATION_MESSAGE,
        payload: {
          userId: data.talkId,
          message: data
        }
      })
    })
  }, [socket])

  useEffect(() => {
    socket.current.off('save-message')
    socket.current.on('save-message', data => {
      dispatch({
        type: TypeActions.ADD_MESSAGE,
        payload: {
          userId: data.talkId,
          message: data
        }
      })
    })
  }, [socket])
  

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
