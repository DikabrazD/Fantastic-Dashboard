import { TeacherActions, TeacherActionsTypes, teacherInterface } from '../types/teacher'

const defaultState: teacherInterface[] = []

export const teacherReducer = (state = defaultState, action: TeacherActions): teacherInterface[] => {
    switch (action.type) {
        case TeacherActionsTypes.FETCHDATA: {
            return [...action.payload]
        }
        case TeacherActionsTypes.ADDTEACHER: {
            return [...state, action.payload]
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

export const addTeacherAction = (payload: teacherInterface) => ({
    type: TeacherActionsTypes.ADDTEACHER,
    payloa: payload
})

export const deleteTeacherAction = (payload: teacherInterface) => ({
    type: TeacherActionsTypes.DELETETEACHER,
    payloa: payload
})
