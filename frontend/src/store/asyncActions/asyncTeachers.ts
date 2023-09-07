import { fetchTeachersAction } from '../reducers/teacherReducer'
import { Dispatch } from 'redux'
import { teacherInterface } from '../types/teacher'

import axios from 'axios'

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
