import { CourseInterface, CoursesComponentInterface } from './CoursesInterface'
import { CategoryInterface } from '../Categories/CategoriesInterface'
import { useEffect, useState } from 'react'

import axios from 'axios'

import './Courses.scss'

const Courses = ({
    currentCourse,
    category,
    categories,
    categoriesChange,
    currentCoursesChange
}: CoursesComponentInterface) => {
    const [courses, setCourses] = useState<CourseInterface[]>([])
    const [isOver, setIsOver] = useState<number>()

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

    //Drag and Drop logica cursurilor

    const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, course: CourseInterface) => {
        currentCoursesChange(course.id)
    }
    const dragLeaveHandler = (e: React.DragEvent<HTMLLIElement>, courseID: number) => {
        setIsOver(courseID)
    }
    const dragEndHandler = (e: React.DragEvent<HTMLLIElement>) => {
        setIsOver(undefined)
    }
    const dragOverHandler = (e: React.DragEvent<HTMLLIElement>, courseID: number) => {
        setIsOver(courseID)
        e.stopPropagation()
        e.preventDefault()
    }
    const dragDropHandler = (e: React.DragEvent<HTMLLIElement>, courseID: number) => {
        let newCategories: CategoryInterface[] = JSON.parse(JSON.stringify(categories))
        newCategories = newCategories.map((item) => {
            // Cautam categoria in care a fost facut drop
            if (item.id === category.id && currentCourse !== undefined) {
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

        setIsOver(undefined)
        categoriesChange(newCategories)

        e.stopPropagation()
        e.preventDefault()
    }

    return (
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
                            <h2 className='courses-item-title'>{item.name}</h2>
                            <div className='courses-item-image'>
                                <img className='image' src={item.img} alt='course' />
                            </div>
                        </li>
                    )
                })}
        </ul>
    )
}

export default Courses
