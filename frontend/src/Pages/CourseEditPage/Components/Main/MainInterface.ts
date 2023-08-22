import { CourseEditInterface } from '../../CourseEditInterface'

export interface MainComponentInterface {
    course: CourseEditInterface
    changeCourse: (x: CourseEditInterface) => void
}
