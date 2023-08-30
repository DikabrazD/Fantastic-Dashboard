import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

import NotificationItem from './Components/NotificationItem/NotificationItem'

import './Notifications.scss'

const Notifications = () => {
    const notifications = useSelector((state: RootState) => state.notification)

    return (
        <ul className='notifications'>
            {notifications.map((item) => {
                return <NotificationItem key={item.id} data={item} />
            })}
        </ul>
    )
}

export default Notifications
