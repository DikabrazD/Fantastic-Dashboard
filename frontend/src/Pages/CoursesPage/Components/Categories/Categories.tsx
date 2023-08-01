import { useEffect, useState } from 'react'
import { CategoryInterface } from './CategoriesInterface'

import axios from 'axios'
import Courses from '../Courses/Courses'

import './Categories.scss'

const Categories = () => {
    const [categories, setCategories] = useState<CategoryInterface[]>([])
    const [currentCourse, setCurrentCourse] = useState<number>()

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

    const changeCurrentCourse = (x: number) => {
        setCurrentCourse(x)
    }

    //CRUD

    const changeCategories = async (x: CategoryInterface[]) => {
        // await axios
        //     .put<CategoryInterface[]>('http://localhost:3000/categories', x)
        //     .then((res) => {
        //         console.log(res.data)
        //         setCategories(res.data)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        setCategories(x)
    }

    const deleteAllCourses = (course: number) => {
        let newCategories: CategoryInterface[] = JSON.parse(JSON.stringify(categories))

        newCategories = newCategories.map((item) => {
            if (item.courses.includes(course)) {
                const newItem = { ...item }
                newItem.courses = newItem.courses.filter((item) => item !== course)
                return newItem
            } else return item
        })

        setCategories(newCategories)
    }
    const changeCourse = (course: number, category: number) => {
        console.log('1')
    }
    const deleteCourse = (course: number, category: number) => {
        let newCategories: CategoryInterface[] = JSON.parse(JSON.stringify(categories))

        newCategories = newCategories.map((item) => {
            if (item.id === category) {
                const newItem = { ...item }
                newItem.courses = newItem.courses.filter((item) => item !== course)
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
                            currentCourse={currentCourse}
                            category={item}
                            categories={categories}
                            categoriesChange={(x) => changeCategories(x)}
                            currentCoursesChange={(x) => changeCurrentCourse(x)}
                            deleteAllCourses={(x) => deleteAllCourses(x)}
                            changeCourse={(x) => changeCourse(x, item.id)}
                            deleteCourse={(x) => deleteCourse(x, item.id)}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export default Categories
