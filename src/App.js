import React, {useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/routes'
import startSocket from './api/socket'
import {CONNECTION} from './stores/reducers/reducers'
import {useDispatch, useSelector} from 'react-redux'
import getToken from './utils/token';

import TypeActions from './stores/constants'


function App() {
  const dispatch = useDispatch()
  const talk = useSelector(state => state.talk)
  const token = getToken()

  useEffect(() => {
    const socket = startSocket()
    dispatch({
      type: CONNECTION,
      payload: socket
    })
    if (!token) {
      window.localStorage.clear()
    }
    socket.on('connect', (connect) => {
      socket.emit('set token', token)
      socket.on('send message', (data) => {
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
  }, [dispatch, token, talk.userId])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
