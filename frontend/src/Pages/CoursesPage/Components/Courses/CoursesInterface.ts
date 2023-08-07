import { CategoryInterface } from '../Categories/CategoriesInterface'

export interface CoursesComponentInterface {
    category: CategoryInterface
    categoriesChange: (x: number) => void
    currentCoursesChange: (x: number) => void
    deleteCourse: (x: number) => void
    changeCourse: (x: number) => void
    deleteAllCourses: (x: number) => void
}

export interface CourseInterface {
    id: number
    name: string
    img: string
}
