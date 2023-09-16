import { useEffect, useState } from 'react'
import { CategoryInterface } from './CategoriesInterface'

import axios from 'axios'
import Courses from '../Courses/Courses'

import './Categories.scss'
import { generatePath, useNavigate } from 'react-router-dom'
import { RouterNames } from 'src/router'

const Categories = () => {
    const [categories, setCategories] = useState<CategoryInterface[]>([])
    const [currentCourse, setCurrentCourse] = useState<string>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            await axios
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

    const changeCategories = async (course: string, categoryID: string) => {
        // await axios
        //     .put<CategoryInterface[]>('http://localhost:3000/categories', x)
        //     .then((res) => {
        //         console.log(res.data)
        //         setCategories(res.data)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

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

    return (
        <ul className='categories'>
            {categories.map((item) => {
                return (
                    <li
                        onDragOver={(e) => dragOverCategoryHandler(e)}
                        onDrop={(e) => onDropCategoryHandler(e, item.id)}
                        key={item.id}
                        className='categories-item'
                    >
                        <h2 className='categories-item-title'>{item.name}</h2>
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
    )
}

export default Categories
