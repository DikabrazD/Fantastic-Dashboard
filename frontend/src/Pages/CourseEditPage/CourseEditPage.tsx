import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CourseEditInterface } from './CourseEditInterface'

import Breadcrumbs from 'src/Components/Breadcrumbs'
import Input from 'src/Components/Input'
import axios from 'axios'
import Chips from './Components/Chips/Chips'

import './CourseEditPage.scss'

const CourseEditPage = () => {
    const location = useLocation()
    const { id } = useParams()

    const [course, setCourse] = useState<CourseEditInterface>()

    const addSkill = (x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.main.skills.push(x)

        setCourse(newCourse)
    }

    const deleteSkill = (x: number) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.main.skills.splice(x, 1)

        setCourse(newCourse)
    }

    useEffect(() => {
        axios
            .get<CourseEditInterface[]>(`http://localhost:3000/coursesDetails?id=${id}`)
            .then((res) => {
                setCourse(res.data[0])
                console.log(res.data)
            })
            .catch((error) => console.log(error))
    }, [id])

    return (
        <div className='edit'>
            <Breadcrumbs text='Course' link={location.pathname} />
            {course && (
                <form className='edit-wrapper'>
                    <div className='edit-wrapper-about'>
                        <h2 className='edit-wrapper-about-title'>About</h2>
                        <Input value={course.name} onChange={(x) => {}} placeholder='Name' />
                        <Input value={course.price} onChange={(x) => {}} placeholder='Price' />
                        <Input value={course.number_lectures} onChange={(x) => {}} placeholder='Number Lectures' />
                        <input type='file' />
                    </div>
                    <div className='edit-wrapper-main'>
                        <h2 className='edit-wrapper-main-title'>Main</h2>
                        <div className='edit-wrapper-main-input'>
                            <Input value={course.info.main.text} onChange={(x) => {}} placeholder='Text' />
                        </div>
                        <Chips
                            value={course.info.main.skills}
                            onAdd={(x) => addSkill(x)}
                            onDelete={(x) => deleteSkill(x)}
                        />
                    </div>
                    <div className='edit-wrapper-details'>
                        <h2 className='edit-wrapper-about-title'>Details</h2>
                    </div>
                </form>
            )}
        </div>
    )
}

export default CourseEditPage
