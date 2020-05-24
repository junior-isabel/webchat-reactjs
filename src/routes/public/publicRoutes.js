import React from 'react'
import {Switch ,Route} from 'react-router-dom'
import RegisterPage from '../../pages/public/register/register'
export default () => {

    return (
        <Switch>
        <Route path="/register" component={RegisterPage} />
        </Switch>
    )
}