import { CourseEditInterface } from '../../CourseEditInterface'

export interface ComponentDetailsInterface {
    course: CourseEditInterface
    changeCourse: (x: CourseEditInterface) => void
}
