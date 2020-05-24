import React from 'react'
import './card-signup.scss'
export default () => {

  return (
    <form action="" method="POST" className="card-signup-form">
      <ul>
        <li>
          <label htmlFor="firstName"><input type="text" name="firstName" placeholder="Primeiro Nome" /></label>
        </li>
        <li>
          <label htmlFor="lastName"><input type="text" name="lastName" placeholder="último Nome" /></label>
        </li>
        <li>
          <label htmlFor="register-sexo">Sexo
                <select name="sexo" id="register-sexo">
              <option value="m">Masculino</option>
              <option value="f">Femenino</option>
            </select>
          </label>
        </li>
        <li>
          <label htmlFor="birthday">
            <input type="date" name="birthday" id="register-birthday" />
          </label>
        </li>
        <li>
          <label htmlFor="phone"><input type="phone" name="phone" placeholder="Número de Telefone" /></label>
        </li>
        <li>
          <label htmlFor="email"><input type="email" name="email" placeholder="Seu Emal" required /></label>
        </li>
        <li>
          <label htmlFor="register-password">
            <input type="password" name="passwrod" id="register-password" placeholder="palavra passe" />
          </label>
        </li>
        <li>
          <label htmlFor="register-repassword">
            <input type="password" name="passwrod" id="register-repassword" placeholder="re-introduzir palavra passe" />
          </label>
        </li>
        <li>
          <button type="submit">cadastrar-se</button>
        </li>
      </ul>
    </form>
  )
}