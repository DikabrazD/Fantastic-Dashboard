import CoursesPage from 'src/Pages/CoursesPage/CoursesPage'

export enum RouterNames {
    DEFAULT = '/',
    ALLCOURSES = '/courses'
}

export interface InterfaceRoute {
    path: RouterNames
    component: React.ReactNode
}

export const publicRoutes: InterfaceRoute[] = [
    { path: RouterNames.ALLCOURSES, component: <CoursesPage /> },
    { path: RouterNames.ALLCOURSES, component: <CoursesPage /> }
]
