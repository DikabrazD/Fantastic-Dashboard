import { CategoryInterface } from '../Categories/CategoriesInterface'

export interface CoursesComponentInterface {
    currentCourse: number | undefined
    category: CategoryInterface
    categories: CategoryInterface[]
    categoriesChange: (x: CategoryInterface[]) => void
    currentCoursesChange: (x: number) => void
}

export interface CourseInterface {
    id: number
    name: string
    img: string
}
