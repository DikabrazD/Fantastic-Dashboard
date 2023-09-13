import CourseEditPage from 'src/Pages/CourseEditPage/CourseEditPage'
import CoursesPage from 'src/Pages/CoursesPage/CoursesPage'
import ErrorPage from 'src/Pages/ErrorPage/ErrorPage'
import WorkersPage from 'src/Pages/WorkersPage/WorkersPage'

export enum RouterNames {
    DEFAULT = '/',
    COURSES = '/courses',
    COURSEEDIT = '/course/:id',
    WORKERS = '/workers',
    ERROR = '/error'
}

export interface InterfaceRoute {
    path: RouterNames
    component: React.ReactNode
}

export const publicRoutes: InterfaceRoute[] = [
    { path: RouterNames.COURSES, component: <CoursesPage /> },
    { path: RouterNames.COURSEEDIT, component: <CourseEditPage /> },
    { path: RouterNames.WORKERS, component: <WorkersPage /> },
    { path: RouterNames.ERROR, component: <ErrorPage /> }
]
