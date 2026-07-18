import { Route, Switch } from 'wouter'

import HomePage from '@/src/pages/HomePage/HomePage'
import ProfilePage from '@/src/pages/ProfilePage/ProfilePage'

export const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
        </Switch>
    )
}
