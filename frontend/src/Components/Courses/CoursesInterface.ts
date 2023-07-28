export interface CourseInterface {
    id: number
    name: string
    img: string
}

export interface CategoryInterface {
    id: number
    name: string
    courses: number[]
}
