import { CourseEditInterface, Section } from 'src/Pages/CourseEditPage/CourseEditInterface'

export interface SectionInterface {
    course: CourseEditInterface
    detailIndex: number
    changeCourse: (x: CourseEditInterface) => void
}
