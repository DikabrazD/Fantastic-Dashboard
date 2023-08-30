import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { notificationInterface } from 'src/store/types/notification'
import { deleteNotificationAction } from 'src/store/reducers/notificationReducer'
import { CSSTransition } from 'react-transition-group'

import './NotificationItem.scss'

const NotificationItem = ({ data }: { data: notificationInterface }) => {
    const nodeRef = useRef<HTMLLIElement>(null)
    const [showAnim, setShowAnim] = useState<boolean>(false)

    const dispatch = useDispatch()

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
            <li ref={nodeRef} className='notificationItem'>
                {data.title}
            </li>
        </CSSTransition>
    )
}

export default NotificationItem
