import React from 'react'
import {Done} from '@material-ui/icons'
import './validate-account.scss'
export default () => {

  return (
    <div className="valide-account-page">
      <h1>Valide a sua conta</h1>
      <p>abre o seu email e digita o código de validação de 6 digitos...</p>
      <div className="group-digit-input-form">
        <form action="" className="validate-account-form">
          <input type="text" maxLength="1" autoComplete={false}/>
          <input type="text" maxLength="1" validate-account-form/>
          <input type="text" maxLength="1" validate-account-form/>
          <input type="text" maxLength="1" validate-account-form/>
          <input type="text" maxLength="1" validate-account-form/>
          <input type="text" maxLength="1" validate-account-form/>
          <button type="submit">enviar</button>
          <Done fontSize="large" />
        </form>
      </div>
    </div>
  )
}