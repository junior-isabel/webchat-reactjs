import React from 'react'
import { Switch,Route} from 'react-router-dom'
import HomePage from '../../pages/private/home/home'
import FindFriendPage from '../../pages/private/FindFriend/findFriend'
export default () => {
    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/findfriend" component={FindFriendPage} />
        </Switch>
    )
}