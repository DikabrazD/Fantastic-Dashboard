import axios from 'axios'

import { useEffect, useState } from 'react'
import { CategoryInterface, CourseInterface } from './CoursesInterface'

import './Courses.scss'

const Courses = () => {
    const [courses, setCourses] = useState<CourseInterface[]>([])
    const [categories, setCategories] = useState<CategoryInterface[]>([])

    const [currentCourse, setCurrentCourse] = useState<number>()

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

    //Drag and Drop logica cursurilor

    const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, course: CourseInterface) => {
        setCurrentCourse(course.id)
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLLIElement>) => {}
    const dragEndHandler = (e: React.DragEvent<HTMLLIElement>) => {}
    const dragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
        e.stopPropagation()
        e.preventDefault()
    }
    const dragDropHandler = (e: React.DragEvent<HTMLLIElement>, courseID: number, categoryID: number) => {
        let newCategories: CategoryInterface[] = JSON.parse(JSON.stringify(categories))
        newCategories = newCategories.map((item) => {
            // Cautam categoria in care a fost facut drop
            if (item.id === categoryID && currentCourse !== undefined) {
                // Cautam indexurile la cursurilor
                const courseIndex = item.courses.indexOf(courseID)
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

        e.stopPropagation()
        e.preventDefault()
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

    return (
        <ul className='categories'>
            {categories.map((itemCat) => {
                return (
                    <li
                        onDragOver={(e) => dragOverCategoryHandler(e)}
                        onDrop={(e) => onDropCategoryHandler(e, itemCat.id)}
                        key={itemCat.id}
                        className='categories-item'
                    >
                        <h2 className='categories-item-title'>{itemCat.name}</h2>
                        <ul className='courses'>
                            {/* Afiseaza numai cursurile care se afa in array-ul categories.courses si sorteaza dupa oridnea acestuia */}
                            {courses
                                .filter((itemCourse) => itemCat.courses.includes(itemCourse.id))
                                .sort((a, b) => itemCat.courses.indexOf(a.id) - itemCat.courses.indexOf(b.id))
                                .map((item) => {
                                    return (
                                        <li
                                            onDragStart={(e) => dragStartHandler(e, item)}
                                            onDragLeave={(e) => dragLeaveHandler(e)}
                                            onDragEnd={(e) => dragEndHandler(e)}
                                            onDragOver={(e) => dragOverHandler(e)}
                                            onDrop={(e) => dragDropHandler(e, item.id, itemCat.id)}
                                            draggable={true}
                                            key={item.id}
                                            className='courses-item'
                                        >
                                            <h2 className='courses-item-title'>{item.name}</h2>
                                            <div className='courses-item-image'>
                                                <img className='image' src={item.img} alt='course' />
                                            </div>
                                        </li>
                                    )
                                })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

export default Courses
