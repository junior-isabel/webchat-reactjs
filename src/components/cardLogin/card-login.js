import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './card-login.scss'
import logo from '../../assets/logo.png'
import { login } from '../../api/services/accounts'
import getProfile from '../../api/services/profile'
import { setUserToken } from '../../utils/token'
import { useSelector } from 'react-redux'
export default ({status}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const socket = useSelector(state => state.socket)
  const handlerForm = (event) => {
    event.preventDefault()

    login(email, password).then(login => {
      if(!login.token) {

        alert(login.data.message)
        return
      }
      getProfile().then((data) => {
        if (!data) return
          if (socket) {
            setUserToken(data)
            socket.emit('set token', login.token)
            setTimeout(() => history.push('/'), 200)
          }

      })
    }).catch(err => {
    })

  }
  return (
    <div className={['card-form-login',status ? 'active-login' : ''].join(' ')}>
      <form method="POST" onSubmit={handlerForm}>
        <figure>
          <img src={logo} width="80" alt="logo" />
        </figure>
        <label htmlFor="">
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required />
        </label>
        <label htmlFor="">
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" id="" required />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  )
}