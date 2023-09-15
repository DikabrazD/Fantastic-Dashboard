import { CourseInterface, CoursesComponentInterface } from './CoursesInterface'
import { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaTimes } from 'react-icons/fa'

import axios from 'axios'

import './Courses.scss'
import Button from 'src/Components/Button/Button'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

const Courses = ({
    category,
    categoriesChange,
    changeCurrentCourse,
    deleteCourse,
    changeCourse,
    deleteAllCourses
}: CoursesComponentInterface) => {
    const [courses, setCourses] = useState<CourseInterface[]>([])
    const [isOver, setIsOver] = useState<string>()
    const [isOpenDeleteAll, setIsOpenDeleteAll] = useState<boolean>(false)
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
    const [deletedCourse, setDeletedCourse] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get<CourseInterface[]>('http://localhost:3000/courses')
                .then((res) => {
                    setCourses(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        fetchData()
    }, [])
    //Modal logica

    const openDeleteAll = (x: string) => {
        setDeletedCourse(x)
        setIsOpenDeleteAll(true)
    }
    const openDelete = (x: string) => {
        setDeletedCourse(x)
        setIsOpenDelete(true)
    }
    const closeDeleteAll = () => {
        setIsOpenDeleteAll(false)
    }
    const closeDelete = () => {
        setIsOpenDelete(false)
    }

    const confirmDeleteAll = (x: string) => {
        closeDeleteAll()
        deleteAllCourses(x)
    }

    const confirmDelete = (x: string) => {
        closeDelete()
        deleteCourse(x)
    }

    //Drag and Drop logica cursurilor

    const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, course: CourseInterface) => {
        changeCurrentCourse(course.id)
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLLIElement>, courseID: string) => {
        setIsOver(courseID)
    }
    const dragEndHandler = (e: React.DragEvent<HTMLLIElement>) => {
        setIsOver(undefined)
    }
    const dragOverHandler = (e: React.DragEvent<HTMLLIElement>, courseID: string) => {
        setIsOver(courseID)
        e.stopPropagation()
        e.preventDefault()
    }
    const dragDropHandler = (e: React.DragEvent<HTMLLIElement>, courseID: string) => {
        setIsOver(undefined)
        categoriesChange(courseID)

        e.stopPropagation()
        e.preventDefault()
    }

    return (
        <>
            <ul className='courses'>
                {/* Afiseaza numai cursurile care se afa in array-ul categories.courses si sorteaza dupa oridnea acestuia */}
                {courses
                    .filter((itemCourse) => category.courses.includes(itemCourse.id))
                    .sort((a, b) => category.courses.indexOf(a.id) - category.courses.indexOf(b.id))
                    .map((item) => {
                        return (
                            <li
                                onDragStart={(e) => dragStartHandler(e, item)}
                                onDragLeave={(e) => dragLeaveHandler(e, item.id)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e, item.id)}
                                onDrop={(e) => dragDropHandler(e, item.id)}
                                draggable={true}
                                key={item.id}
                                className={`courses-item ${isOver === item.id ? 'dragOver' : ''}`}
                            >
                                <div className='courses-item-actions'>
                                    <Button
                                        type={ButtonTypes.RED}
                                        icon={<FaTrash className='image' />}
                                        onClick={() => openDeleteAll(item.id)}
                                    />
                                    <Button
                                        type={ButtonTypes.GREEN}
                                        icon={<FaEdit className='image' />}
                                        onClick={() => changeCourse(item.id)}
                                    />
                                    <Button
                                        type={ButtonTypes.RED}
                                        icon={<FaTimes className='image' />}
                                        onClick={() => openDelete(item.id)}
                                    />
                                </div>
                                <h2 className='courses-item-title'>{item.name}</h2>
                                <div className='courses-item-image'>
                                    <img className='image' src={item.img} alt='course' />
                                </div>
                            </li>
                        )
                    })}
            </ul>

            {isOpenDeleteAll && (
                <ConfirmModal
                    text='Cursul va fi șters din toate categoriile,nu se va mai putea restabili.Doriți să efectuați operațiunea?'
                    confirmed={() => confirmDeleteAll(deletedCourse)}
                    declined={() => closeDeleteAll()}
                    closeModal={() => closeDeleteAll()}
                />
            )}
            {isOpenDelete && (
                <ConfirmModal
                    text='Cursul va fi șters din această.Doriți să efectuați operațiunea?'
                    confirmed={() => confirmDelete(deletedCourse)}
                    declined={() => closeDelete()}
                    closeModal={() => closeDelete()}
                />
            )}
        </>
    )
}

export default Courses
