import Textarea from 'src/Components/Textarea'
import Chips from '../../../../Components/Chips'
import MainTeachers from './MainTeachers/MainTeachers'

import { MainComponentInterface } from './MainInterface'
import { CourseEditInterface } from '../../CourseEditInterface'

import './Main.scss'

const Main = ({ course, changeCourse }: MainComponentInterface) => {
    const changeMainText = (x: string) => {
        if (course) {
            changeCourse({ ...course, info: { ...course.info, main: { ...course.info.main, text: x } } })
        }

        //Alternative
        // const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        // newCourse.info.main.text = x
        // setCourse(newCourse)
    }
    const addSkill = (x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.main.skills.push(x)

        changeCourse(newCourse)
    }
    const deleteSkill = (x: number) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.main.skills.splice(x, 1)

        changeCourse(newCourse)
    }

    return (
        <div className='main'>
            <h2 className='main-title'>Main</h2>
            <div className='main-input'>
                <Textarea value={course.info.main.text} onChange={(x) => changeMainText(x)} title='Text' />
            </div>
            <Chips value={course.info.main.skills} onAdd={(x) => addSkill(x)} onDelete={(x) => deleteSkill(x)} />
            <MainTeachers course={course} changeCourse={changeCourse} />
        </div>
    )
}

export default Main
