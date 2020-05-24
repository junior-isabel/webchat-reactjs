import React from 'react'
import './register.scss'
import CardLogin from '../../../components/cardLogin/card-login'
import CardSignup from '../../../components/cardSignup/card-signup'
export default (props) => {
  document.title = "login - webchat"
  return (
    <section className="login-page">
      <header>
        <div className="description">
          <h1>cadastra-se em MyChat</h1>
          <p>meu texto, é algo como fazer login no meu chat empresarial</p>
          <CardSignup />
        </div>
      </header>
      <div className="form-absolute">
        <CardLogin />
      </div>
    </section>
  )
}