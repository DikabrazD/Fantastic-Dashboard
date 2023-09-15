import { fetchTeachersAction, putTeachersAction } from '../reducers/teacherReducer'
import { Dispatch } from 'redux'
import { teacherInterface } from '../types/teacher'

import axios from 'axios'
import { addNotificationAction } from '../reducers/notificationReducer'
import { NotificationTypes } from '../types/notification'

export const fetchTeachers = () => async (dispatch: Dispatch) => {
    await axios
        .get<teacherInterface[]>('http://localhost:3000/teachers')
        .then((res) => {
            dispatch(fetchTeachersAction(res.data))
        })
        .catch((error) => {
            console.log(error)
        })
}

export const putTeachers = (teachers: teacherInterface[]) => async (dispatch: Dispatch) => {
    const formData = new FormData()
    formData.append('teachers', JSON.stringify(teachers))

    await axios
        .put<teacherInterface[]>('http://localhost:3000/teachers', formData)
        .then((res) => {
            dispatch(putTeachersAction(res.data))
            dispatch(addNotificationAction({ type: NotificationTypes.GREEN, title: 'Teachers successfully saved' }))
        })
        .catch((error) => {
            dispatch(addNotificationAction({ type: NotificationTypes.RED, title: 'Somethings went wrong' }))
        })
}
