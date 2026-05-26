import { Route, Switch } from 'wouter'
import HomePage from '@/pages/HomePage/HomePage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'

function App() {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
        </Switch>
    )
}
export default App
