import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTeachers } from './store/asyncActions/asyncTeachers'

import AppRouter from './Components/AppRouter'
import Layout from './Components/Layout/Layout'
import Notifications from './Components/Notifications'

function App() {
    const dispatch: any = useDispatch()

    useEffect(() => {
        dispatch(fetchTeachers())
    }, [dispatch])

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
