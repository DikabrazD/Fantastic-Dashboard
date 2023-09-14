export interface teacherInterface {
    id: string
    name: string
    courses: string[]
    description: string
    img: string
    imgKid: string
}

export enum TeacherActionsTypes {
    FETCHDATA = 'FETCHDATA',
    ADDTEACHER = 'ADDTEACHER',
    DELETETEACHER = 'DELETETEACHER',
    EDITTEACHERACTION = 'EDITTEACHERACTION'
}

interface FetchDataAction {
    type: TeacherActionsTypes.FETCHDATA
    payload: teacherInterface[]
}

interface AddTeacherAction {
    type: TeacherActionsTypes.ADDTEACHER
    payload: teacherInterface
}

interface EditTeacherAction {
    type: TeacherActionsTypes.EDITTEACHERACTION
    payload: teacherInterface
}

interface DeleteTeacherAction {
    type: TeacherActionsTypes.DELETETEACHER
    payload: teacherInterface
}

export type TeacherActions = FetchDataAction | AddTeacherAction | EditTeacherAction | DeleteTeacherAction
