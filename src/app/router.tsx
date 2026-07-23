import { Route, Switch } from 'wouter'

import { Layout } from '@/components/layout/Layout'

import HomePage from '@/pages/HomePage/HomePage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'

export const AppRouter = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" component={HomePage} />
                <Route path="/profile" component={ProfilePage} />
            </Switch>
        </Layout>
    )
}
