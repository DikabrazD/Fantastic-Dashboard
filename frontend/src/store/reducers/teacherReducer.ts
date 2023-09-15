import { TeacherActions, TeacherActionsTypes, teacherInterface } from '../types/teacher'

const defaultState: teacherInterface[] = []

export const teacherReducer = (state = defaultState, action: TeacherActions): teacherInterface[] => {
    switch (action.type) {
        case TeacherActionsTypes.FETCHDATA: {
            return [...action.payload]
        }
        case TeacherActionsTypes.PUTDATA: {
            return [...action.payload]
        }
        case TeacherActionsTypes.ADDTEACHER: {
            return [...state, action.payload]
        }
        case TeacherActionsTypes.EDITTEACHERACTION: {
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload
                } else {
                    return item
                }
            })
        }
        case TeacherActionsTypes.DELETETEACHER: {
            return state.filter((item) => item.id !== action.payload.id)
        }
        default:
            return state
    }
}

export const fetchTeachersAction = (payload: teacherInterface[]) => ({
    type: TeacherActionsTypes.FETCHDATA,
    payload: payload
})

export const putTeachersAction = (payload: teacherInterface[]) => ({
    type: TeacherActionsTypes.PUTDATA,
    payload: payload
})

export const addTeacherAction = (payload: teacherInterface) => ({
    type: TeacherActionsTypes.ADDTEACHER,
    payload: payload
})

export const editTeacherAction = (payload: teacherInterface) => ({
    type: TeacherActionsTypes.EDITTEACHERACTION,
    payload: payload
})

export const deleteTeacherAction = (payload: teacherInterface) => ({
    type: TeacherActionsTypes.DELETETEACHER,
    payload: payload
})
