import Textarea from 'src/Components/Textarea'
import Chips from '../../../../Components/Chips'
import MainTeachers from './MainTeachers/MainTeachers'

import { MainComponentInterface } from './MainInterface'

import './Main.scss'

const Main = ({ course, changeCourse }: MainComponentInterface) => {
    const changeMainText = (x: string) => {
        changeCourse({ ...course, info: { ...course.info, main: { ...course.info.main, text: x } } })
    }
    const addSkill = (x: string) => {
        changeCourse({
            ...course,
            info: { ...course.info, main: { ...course.info.main, skills: [...course.info.main.skills, x] } }
        })
    }
    const deleteSkill = (x: number) => {
        changeCourse({
            ...course,
            info: {
                ...course.info,
                main: { ...course.info.main, skills: course.info.main.skills.filter((item, index) => index !== x) }
            }
        })
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
