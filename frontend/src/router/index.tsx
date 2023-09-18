import CourseEditPage from 'src/Pages/CourseEditPage/CourseEditPage'
import CoursesPage from 'src/Pages/CoursesPage/CoursesPage'
import ErrorPage from 'src/Pages/ErrorPage/ErrorPage'
import Home from 'src/Pages/Home/Home'
import WorkersPage from 'src/Pages/WorkersPage/WorkersPage'

export enum RouterNames {
    HOME = '/',
    COURSES = '/courses',
    COURSEEDIT = '/course/:id',
    WORKERS = '/workers',
    ERROR = '*'
}

export interface InterfaceRoute {
    path: RouterNames
    component: React.ReactNode
}

export const publicRoutes: InterfaceRoute[] = [
    { path: RouterNames.HOME, component: <Home /> },
    { path: RouterNames.COURSES, component: <CoursesPage /> },
    { path: RouterNames.COURSEEDIT, component: <CourseEditPage /> },
    { path: RouterNames.WORKERS, component: <WorkersPage /> },
    { path: RouterNames.ERROR, component: <ErrorPage /> }
]
