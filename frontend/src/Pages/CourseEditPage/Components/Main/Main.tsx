import Input from 'src/Components/Input'
import Chips from '../Chips'

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
                <Input value={course.info.main.text} onChange={(x) => changeMainText(x)} placeholder='Text' />
            </div>
            <Chips value={course.info.main.skills} onAdd={(x) => addSkill(x)} onDelete={(x) => deleteSkill(x)} />
        </div>
    )
}

export default Main
