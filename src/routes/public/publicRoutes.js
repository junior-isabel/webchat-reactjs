import React from 'react'
import {Switch ,Route} from 'react-router-dom'
import LoginPage from '../../pages/public/login/loginPage'
export default () => {

    return (
        <Switch>
        <Route path="/login" component={LoginPage} />
        </Switch>
    )
}