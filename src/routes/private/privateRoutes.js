import React from 'react'
import { Switch,Route} from 'react-router-dom'
import HomePage from '../../pages/private/home/home'
export default () => {
    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
        </Switch>
    )
}