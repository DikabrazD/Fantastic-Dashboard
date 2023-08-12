import { useEffect, useState } from 'react'
import { CategoryInterface } from './CategoriesInterface'

import axios from 'axios'
import Courses from '../Courses/Courses'

import './Categories.scss'
import { generatePath, useNavigate } from 'react-router-dom'
import { RouterNames } from 'src/router'

const Categories = () => {
    const [categories, setCategories] = useState<CategoryInterface[]>([])
    const [currentCourse, setCurrentCourse] = useState<number>()
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

    const changeCurrentCourse = (x: number) => {
        setCurrentCourse(x)
    }

    //Drag and drop logica categoriei
    const dragOverCategoryHandler = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault()
    }
    const onDropCategoryHandler = (e: React.DragEvent<HTMLLIElement>, categoryID: number) => {
        let newCategories: CategoryInterface[] = JSON.parse(JSON.stringify(categories))
        //Daca facem drop peste o categorie si cuurentCourse se include in ea,adaugam currentCourse la urmă
        newCategories = newCategories.map((item) => {
            if (item.id === categoryID && currentCourse !== undefined && !item.courses.includes(currentCourse)) {
                item.courses.push(currentCourse)
                return item
            } else return item
        })

        setCategories(newCategories)

        e.preventDefault()
    }

    //CRUD

    const changeCategories = async (course: number, categoryID: number) => {
        // await axios
        //     .put<CategoryInterface[]>('http://localhost:3000/categories', x)
        //     .then((res) => {
        //         console.log(res.data)
        //         setCategories(res.data)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        let newCategories: CategoryInterface[] = JSON.parse(JSON.stringify(categories))
        newCategories = newCategories.map((item) => {
            // Cautam categoria in care a fost facut drop
            if (item.id === categoryID && currentCourse !== undefined) {
                // Cautam indexurile la cursurilor
                const courseIndex = item.courses.indexOf(course)
                const currentIndex = item.courses.indexOf(currentCourse)
                //Daca in categorie nu este currentCourse  si drop-ul a fost facut peste course
                //atunci adaugam currentCourse in fata la cela course
                if (currentIndex === -1) {
                    item.courses.splice(courseIndex, 0, currentCourse)
                }
                //Daca in categorie am gasit currentCourse
                //atunci stergem currentCourse de pe index vechi si currentCourse il punem in fata course-ului
                else {
                    item.courses.splice(currentIndex, 1)
                    item.courses.splice(courseIndex, 0, currentCourse)
                }
                return item
            } else return item
        })

        setCategories(newCategories)
    }
    const deleteAllCourses = (x: number) => {
        let newCategories: CategoryInterface[] = JSON.parse(JSON.stringify(categories))

        newCategories = newCategories.map((item) => {
            if (item.courses.includes(x)) {
                const newItem = { ...item }
                newItem.courses = newItem.courses.filter((item) => item !== x)
                return newItem
            } else return item
        })

        setCategories(newCategories)
    }
    const changeCourse = (course: number) => {
        navigate(generatePath(RouterNames.COURSEEDIT, { id: String(course) }))
    }
    const deleteCourse = (course: number, category: number) => {
        let newCategories: CategoryInterface[] = JSON.parse(JSON.stringify(categories))

        newCategories = newCategories.map((item) => {
            if (item.id === category) {
                const newItem = { ...item }
                newItem.courses = newItem.courses.filter((item) => {
                    return item !== course
                })
                return newItem
            } else return item
        })

        setCategories(newCategories)
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
                            currentCoursesChange={(x) => changeCurrentCourse(x)}
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
