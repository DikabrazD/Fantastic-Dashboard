import CourseEditPage from 'src/Pages/CourseEditPage/CourseEditPage'
import CoursesPage from 'src/Pages/CoursesPage/CoursesPage'

export enum RouterNames {
    DEFAULT = '/',
    ALLCOURSES = '/courses',
    COURSEEDIT = '/course/:id',
    COURSEADD = '/course'
}

export interface InterfaceRoute {
    path: RouterNames
    component: React.ReactNode
}

export const publicRoutes: InterfaceRoute[] = [
    { path: RouterNames.ALLCOURSES, component: <CoursesPage /> },
    { path: RouterNames.COURSEEDIT, component: <CourseEditPage /> },
    { path: RouterNames.COURSEADD, component: <CourseEditPage /> }
]
