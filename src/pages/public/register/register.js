import React, { useState } from 'react'
import './register.scss'
import CardLogin from '../../../components/cardLogin/card-login'
import CardSignup from '../../../components/cardSignup/card-signup'
import { create } from '../../../api/services/accounts'



export default (props) => {
  document.title = "login - mubenq"
  const [status, setStatus] = useState(0)

  const handlerSubmit = (data) => {
    
    create(data).then(response => {
      alert('sua conta foi criada,  inicia a sua sessão em login')
      setStatus(response.status)
      
    })
  }
  return (
    <section className="login-page">
      <header>
        <div className="description">
          <h1>cadastra-se em MyChat</h1>
          <p>meu texto, é algo como fazer login no meu chat empresarial</p>
          <CardSignup submit={handlerSubmit} statusForm={status}/>
        </div>
      </header>
      <div className="form-absolute">
        <CardLogin status={status} />
      </div>
    </section>
  )
}