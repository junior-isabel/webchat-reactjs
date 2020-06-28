import React, { useEffect, useState } from 'react'

import './card-signup.scss'
import { getCities } from '../../api/services/cities'

export default ({submit, statusForm}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [sexo, setSexo] = useState('')
  const [birthday, setBirthday] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [cityId, setCity] = useState(-1)
  const [cities, setCities] = useState([])
  const handlerSubmit = (e) => {
    e.preventDefault()
    if (cityId === -1) return
    if (firstName === '') return
    submit({
      firstName,
      lastName,
      sexo,
      birthday,
      cityId,
      email,
      phone,
      password,
      repassword
    })
  }
  useEffect(() => {
    if (statusForm === 200) {
      setFirstName('')
      setLastName('')
      setSexo('')
      setBirthday('')
      setEmail('')
      setPhone('')
      setPassword('')
      setRepassword('')
      setCity(-1)
      setCities([])
    }
  }, [statusForm])

  useEffect(() => {
    getCities().then(_cities => {
      let $cities = _cities.error ? [] : _cities
      setCities($cities)
    })
  }, [])
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
              required={true}
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
          <label htmlFor="register-sexo">Cidade natal
            <select name="cityId" id="cities"
              value={cityId}
              onChange={e => setCity(e.target.value)}
            >
              <option value="">seleciona</option>
              {cities.map(city => {

                return (<option key={city.id} value={city.id} >{city.name}</option>)

              })}
            </select>
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
          required={true}
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email" placeholder="Seu Emal" /></label>
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