import { CourseInterface } from '../CoursesPage/Components/Courses/CoursesInterface'

interface TextInterface {
    id: string
    type: 'text'
    text: string
}

interface SkillsInterface {
    id: string
    type: 'skills'
    skills: string[]
}

type Section = SkillsInterface | TextInterface

export interface CourseDetailsInterface {
    id: string
    name: string
    sections: Section[]
}

export interface CourseEditInterface extends CourseInterface {
    price: number
    number_lectures: number
    info: {
        main: {
            text: string
            skills: string[]
        }
        details: CourseDetailsInterface[]
    }
}
