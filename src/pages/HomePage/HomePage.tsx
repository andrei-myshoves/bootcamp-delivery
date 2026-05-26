import { observer } from 'mobx-react-lite'
import { appStore } from '@/store/AppStore'

const HomePage = observer(() => {
    return (
        <button onClick={() => appStore.setLoading(!appStore.isLoading)}>
            {appStore.isLoading ? 'Loading...' : 'Click'}
        </button>
    )
})

export default HomePage
