import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './card-login.scss'
import logo from '../../assets/logo.png'
export default () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [saveLogin, setSaveLogin] = useState(false)
    const history = useHistory()
    const handlerForm = (event) => {
        event.preventDefault()
        localStorage.setItem('autheticate', JSON.stringify({
            email: email
        }))

        setTimeout(()=> history.push('/'), 500)
    }
    return (
        <div className="card-form-login">
        <form method="POST" onSubmit={handlerForm}>
          <figure>
            <img src={logo} width="80" alt="logo" />
          </figure>
          <label htmlFor="">
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required />
          </label>
          <label htmlFor="">
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" id="" required/>
          </label>
          <label htmlFor="user-active" className="user-active">
            <input type="checkbox" name="user-active" id="user-active" checked={saveLogin} onChange={() => setSaveLogin(!saveLogin)}/>
            <span> Permanecer activo</span>
          </label>
          <button type="submit">login</button>
        </form>
      </div>
    )
}