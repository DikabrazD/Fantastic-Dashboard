import { CategoryInterface } from '../Categories/CategoriesInterface'

export interface CoursesComponentInterface {
    category: CategoryInterface
    categoriesChange: (x: string) => void
    changeCurrentCourse: (x: string) => void
    deleteCourse: (x: string) => void
    changeCourse: (x: string) => void
    deleteAllCourses: (x: string) => void
}

export interface CourseInterface {
    id: string
    name: string
    img: string
}
