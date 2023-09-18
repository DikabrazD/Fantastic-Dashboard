import { useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { RouterNames } from 'src/router'
import { CategoryInterface } from './CategoriesInterface'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { useDispatch } from 'react-redux'
import { addNotificationAction } from 'src/store/reducers/notificationReducer'
import { NotificationTypes } from 'src/store/types/notification'

import axios from 'axios'
import Courses from '../Courses/Courses'
import Button from 'src/Components/Button/Button'

import './Categories.scss'

const Categories = () => {
    const [categories, setCategories] = useState<CategoryInterface[]>([])
    const [currentCourse, setCurrentCourse] = useState<string>()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = () => {
            axios
                .get<CategoryInterface[]>('http://localhost:3000/categories')
                .then((res) => {
                    setCategories(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        fetchData()
    }, [])

    const changeCurrentCourse = (x: string) => {
        setCurrentCourse(x)
    }

    //Drag and drop logica categoriei
    const dragOverCategoryHandler = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault()
    }
    const onDropCategoryHandler = (e: React.DragEvent<HTMLLIElement>, categoryID: string) => {
        //Daca facem drop peste o categorie si cuurentCourse nu se include in ea,adaugam currentCourse la urmă
        setCategories(
            categories.map((item) => {
                if (item.id === categoryID && currentCourse !== undefined && !item.courses.includes(currentCourse)) {
                    return {
                        ...item,
                        courses: [...item.courses, currentCourse]
                    }
                } else {
                    return item
                }
            })
        )

        e.preventDefault()
    }

    //CRUD

    const changeCategories = (course: string, categoryID: string) => {
        setCategories(
            categories.map((item) => {
                // Cautam categoria in care a fost facut drop
                if (item.id === categoryID && currentCourse !== undefined) {
                    // Cautam indexurile la cursurilor
                    const courseIndex = item.courses.indexOf(course)
                    const currentIndex = item.courses.indexOf(currentCourse)

                    //Daca in categorie nu este currentCourse  si drop-ul a fost facut peste course
                    //atunci adaugam currentCourse in fata la cela course.Daca drop-ul a fost facut categorie
                    //atunci functia onDropCategoryHandler se indeplineste
                    if (currentIndex === -1) {
                        return {
                            ...item,
                            courses: [
                                ...item.courses.slice(0, courseIndex),
                                currentCourse,
                                ...item.courses.slice(courseIndex)
                            ]
                        }
                    }
                    //Daca in categorie am gasit currentCourse
                    else {
                        //Stergem currentCourse de pe index vechi
                        let newCourses = item.courses.filter((item, index) => index !== currentIndex)

                        //CurrentCourse il punem in fata course-ului
                        return {
                            ...item,
                            courses: [
                                ...newCourses.slice(0, courseIndex),
                                currentCourse,
                                ...newCourses.slice(courseIndex)
                            ]
                        }
                    }
                } else return item
            })
        )
    }

    const deleteAllCourses = (x: string) => {
        setCategories(
            categories.map((item) => {
                if (item.courses.includes(x)) {
                    return {
                        ...item,
                        courses: item.courses.filter((item) => item !== x)
                    }
                } else return item
            })
        )
    }
    const changeCourse = (course: string) => {
        navigate(generatePath(RouterNames.COURSEEDIT, { id: String(course) }))
    }
    const deleteCourse = (course: string, category: string) => {
        setCategories(
            categories.map((item) => {
                if (item.id === category) {
                    return {
                        ...item,
                        courses: item.courses.filter((item) => item !== course)
                    }
                } else return item
            })
        )
    }

    const saveCourses = () => {
        axios
            .put<CategoryInterface[]>('http://localhost:3000/categories', categories)
            .then(() => {
                dispatch(addNotificationAction({ type: NotificationTypes.GREEN, title: 'Categories have been saved' }))
            })
            .catch(() => {
                dispatch(addNotificationAction({ type: NotificationTypes.RED, title: 'Something went wrong' }))
            })
    }

    return (
        <div className='categories'>
            <div className='categories-saveButton'>
                <Button type={ButtonTypes.GREENOUTLINED} text='Save Courses' onClick={saveCourses} />
            </div>
            <ul className='categories-wrapper'>
                {categories.map((item) => {
                    return (
                        <li
                            onDragOver={(e) => dragOverCategoryHandler(e)}
                            onDrop={(e) => onDropCategoryHandler(e, item.id)}
                            key={item.id}
                            className='categories-wrapper-item'
                        >
                            <h2 className='categories-wrapper-item-title'>{item.name}</h2>
                            <Courses
                                category={item}
                                categoriesChange={(x) => changeCategories(x, item.id)}
                                changeCurrentCourse={(x) => changeCurrentCourse(x)}
                                deleteAllCourses={(x) => deleteAllCourses(x)}
                                changeCourse={(x) => changeCourse(x)}
                                deleteCourse={(x) => deleteCourse(x, item.id)}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Categories
