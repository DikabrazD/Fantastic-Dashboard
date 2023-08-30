import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { NotificationTypes, notificationInterface } from 'src/store/types/notification'
import { deleteNotificationAction } from 'src/store/reducers/notificationReducer'
import { CSSTransition } from 'react-transition-group'

import './NotificationItem.scss'
import { FaTimes } from 'react-icons/fa'

const NotificationItem = ({ data }: { data: notificationInterface }) => {
    const nodeRef = useRef<HTMLLIElement>(null)
    const [showAnim, setShowAnim] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getNotificationClass = useCallback(() => {
        switch (data.type) {
            case NotificationTypes.GREEN:
                return 'notificationItem-green'
            case NotificationTypes.RED:
                return 'notificationItem-red'
            default:
                return 'notificationItem-green'
        }
    }, [data])

    const deleteNotification = () => {
        setShowAnim(false)
        dispatch(deleteNotificationAction(data))
    }

    useEffect(() => {
        setShowAnim(true)
        setTimeout(() => setShowAnim(false), 3500)
        setTimeout(() => dispatch(deleteNotificationAction(data)), 4000)
    }, [dispatch, data])

    return (
        <CSSTransition
            in={showAnim}
            timeout={0}
            classNames={{
                enterActive: 'notificationItem-addAnim',
                enterDone: 'notificationItem-addAnim',
                exitActive: '',
                exitDone: ''
            }}
            nodeRef={nodeRef}
        >
            <li ref={nodeRef} className={`notificationItem ${getNotificationClass()}`}>
                <div className='notificationItem-deleteButton' onClick={deleteNotification}>
                    <FaTimes className='image' />
                </div>
                <span className='notificationItem-title'>{data.title}</span>
            </li>
        </CSSTransition>
    )
}

export default NotificationItem
