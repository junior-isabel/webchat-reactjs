import React from 'react'
import './loginStyle.scss'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom'
export default (props) => {
  document.title ="login - webchat"
  return (
    <section className="login-page">
      <header>
       <div className="description">
         <h1>Login MyChat</h1>
         <p>meu texto, é algo como fazer login no meu chat empresarial</p>
       </div>
      </header>
      <div className="form">
        <form method="POST">
          <figure>
            <img src={logo} width="80" alt="logo"/>
          </figure>
          <label htmlFor="">
            <input type="text" name="email" placeholder="email"/>
          </label>
          <label htmlFor="">
            <input type="password" name="password" placeholder="password" id=""/>
          </label>
          <label htmlFor="user-active" className="user-active">
            <input type="checkbox" name="user-active" id="user-active"/>
            <span>Permanecer activo</span>
          </label>
          <button type="submit">login</button>
        </form>
        <Link to="/register">cadastra-se</Link>

      </div>
    </section>
  )
}