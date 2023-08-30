import AppRouter from './Components/AppRouter'
import Layout from './Components/Layout/Layout'
import Notifications from './Components/Notifications'

function App() {
    return (
        <>
            <Layout>
                <AppRouter />
            </Layout>
            <Notifications />
        </>
    )
}

export default App
