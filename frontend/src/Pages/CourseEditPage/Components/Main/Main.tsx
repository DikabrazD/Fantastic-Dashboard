import Textarea from 'src/Components/Textarea'
import Chips from '../Chips'
import Modal from 'src/Components/Modal/Modal'
import Combobox from 'src/Components/Combobox/Combobox'
import Button from 'src/Components/Button/Button'

import { MainComponentInterface } from './MainInterface'
import { CourseEditInterface } from '../../CourseEditInterface'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'

import './Main.scss'

const Main = ({ course, changeCourse }: MainComponentInterface) => {
    const teachers = useSelector((state: RootState) => state.teachers)

    const [modal, setModal] = useState<boolean>(false)

    const toogleModal = () => {
        setModal(!modal)
    }

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

            <div className='main-teachers'>
                <h2 className='main-teachers-title'>Teachers</h2>
                <div className='main-teachers-wrapper'>
                    {teachers
                        .filter((item) => course.teachers.includes(item.id))
                        .map((item) => {
                            return (
                                <li key={item.id} className='main-teachers-wrapper-item'>
                                    <div className='main-teachers-wrapper-item-overlay'>
                                        <div
                                            className='main-teachers-wrapper-item-overlay-deleteButton'
                                            onClick={() => {}}
                                        >
                                            <FaTimes className='image' />
                                        </div>
                                    </div>
                                    <div className='main-teachers-wrapper-item-image'>
                                        <img src={item.img} alt='teacher' className='image' />
                                    </div>
                                    <span className='main-teachers-wrapper-item-name'>{item.name}</span>
                                </li>
                            )
                        })}
                </div>
                <Button type={ButtonTypes.GREENOUTLINED} onClick={toogleModal} text='Add teacher' />
            </div>

            {modal && (
                <Modal closeModal={toogleModal}>
                    <Combobox data={teachers.filter((item) => !course.teachers.includes(item.id))} />
                </Modal>
            )}
        </div>
    )
}

export default Main
