import { CourseEditInterface } from 'src/Pages/CourseEditPage/CourseEditInterface'

export interface MainTeachersInterface {
    course: CourseEditInterface
    changeCourse: (x: CourseEditInterface) => void
}
