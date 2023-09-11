import Button from 'src/Components/Button/Button'
import Combobox from 'src/Components/Combobox/Combobox'
import Modal from 'src/Components/Modal/Modal'

import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { MainTeachersInterface } from './MainTeachersInterface'

import './MainTeachers.scss'

const MainTeachers = ({ course, changeCourse }: MainTeachersInterface) => {
    const teachers = useSelector((state: RootState) => state.teachers)
    const [modal, setModal] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<string>('')

    const toogleModal = () => {
        setModal(!modal)
    }

    const addTeacher = () => {
        if (selectedItem) {
            changeCourse({ ...course, teachers: [...course.teachers, selectedItem] })
        }
        toogleModal()
    }

    const deleteTeacher = (x: string) => {
        changeCourse({ ...course, teachers: course.teachers.filter((item) => item !== x) })
    }

    return (
        <>
            <div className='mainTeachers'>
                <h2 className='mainTeachers-title'>Teachers</h2>
                <div className='mainTeachers-wrapper'>
                    {teachers
                        .filter((item) => course.teachers.includes(item.id))
                        .map((item) => {
                            return (
                                <li key={item.id} className='mainTeachers-wrapper-item'>
                                    <div className='mainTeachers-wrapper-item-overlay'>
                                        <div
                                            className='mainTeachers-wrapper-item-overlay-deleteButton'
                                            onClick={() => deleteTeacher(item.id)}
                                        >
                                            <FaTimes className='image' />
                                        </div>
                                    </div>
                                    <div className='mainTeachers-wrapper-item-image'>
                                        <img src={item.img} alt='teacher' className='image' />
                                    </div>
                                    <span className='mainTeachers-wrapper-item-name'>{item.name}</span>
                                </li>
                            )
                        })}
                </div>
                <Button type={ButtonTypes.GREENOUTLINED} onClick={toogleModal} text='Add teacher' />
            </div>

            {modal && (
                <Modal closeModal={toogleModal}>
                    <Combobox
                        data={teachers.filter((item) => !course.teachers.includes(item.id))}
                        onSelect={(x) => setSelectedItem(x.id)}
                    />
                    <Button type={ButtonTypes.GREENOUTLINED} onClick={addTeacher} text='Add' />
                </Modal>
            )}
        </>
    )
}

export default MainTeachers
