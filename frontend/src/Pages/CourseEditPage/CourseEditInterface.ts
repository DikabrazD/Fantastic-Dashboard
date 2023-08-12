import { CourseInterface } from '../CoursesPage/Components/Courses/CoursesInterface'

interface TextInterface {
    id: number
    type: 'text'
    text: '_Pentru început, ținem să menționăm_ că vei învăța lucrurile pe care toți și le asociază cu nivelul Începător:'
}

interface SkillsInterface {
    id: number
    type: 'skills'
    skills: ['alfabetul', 'numerele', 'țările', 'formulele de salut', 'cuvintele simple, etc']
}

export interface CourseEditInterface extends CourseInterface {
    price: number
    number_lectures: number
    info: {
        main: {
            text: string
            skills: string[]
        }
        details: [
            {
                id: number
                name: string
                sections: [TextInterface | SkillsInterface]
            }
        ]
    }
}
