import React from 'react'
import './card-signup.scss'
import { useState } from 'react'
export default () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [sexo, setSexo] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const handlerSubmit = (e) => {
    e.preventDefault()
    console.log({
      firstName,
      lastName,
      sexo,
      birthday,
      email,
      phone,
      password,
      repassword
    })
  }
  return (
    <form action="" method="POST" className="card-signup-form" onSubmit={handlerSubmit}>
      <ul>
        <li>
          <label htmlFor="firstName">
            <input type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} placeholder="Primeiro Nome" /></label>
        </li>
        <li>
          <label htmlFor="lastName">
            <input type="text" name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="último Nome" /></label>
        </li>
        <li>
          <label htmlFor="register-sexo">Sexo
            <select name="sexo" id="register-sexo"
              value={sexo}
              onChange={e => setSexo(e.target.value)}
            >
              <option value="">nenhum</option>
              <option value="m">Masculino</option>
              <option value="f">Femenino</option>
            </select>
          </label>
        </li>
        <li>
          <label htmlFor="birthday">
            <input type="date" name="birthday"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              id="register-birthday" />
          </label>
        </li>
        <li>
          <label htmlFor="phone"><input type="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            name="phone"
            placeholder="Número de Telefone" /></label>
        </li>
        <li>
          <label htmlFor="email"><input type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email" placeholder="Seu Emal" required /></label>
        </li>
        <li>
          <label htmlFor="register-password">
            <input type="password" name="passwrod"
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="register-password" placeholder="palavra passe" />
          </label>
        </li>
        <li>
          <label htmlFor="register-repassword">
            <input type="password" name="repasswrod"
              value={repassword}
              onChange={e => setRepassword(e.target.value)}
              id="register-repassword" placeholder="re-introduzir palavra passe" />
          </label>
        </li>
        <li>
          <button type="submit">cadastrar-se</button>
        </li>
      </ul>
    </form>
  )
}