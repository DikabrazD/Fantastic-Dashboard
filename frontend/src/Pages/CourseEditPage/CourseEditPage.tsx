import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RouterNames } from 'src/router'
import { CourseEditInterface } from './CourseEditInterface'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { useDispatch } from 'react-redux'
import { addNotificationAction } from 'src/store/reducers/notificationReducer'
import { NotificationTypes } from 'src/store/types/notification'

import Breadcrumbs from 'src/Components/Breadcrumbs'
import axios from 'axios'
import Main from './Components/Main/Main'
import About from './Components/About/About'
import Details from './Components/Details'
import Button from 'src/Components/Button/Button'

import './CourseEditPage.scss'

const CourseEditPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()

    const [course, setCourse] = useState<CourseEditInterface>()

    const saveCourse = async () => {
        const formData = new FormData()

        formData.append('course', JSON.stringify(course))

        //Cand este gata server-side schimba course din request put cu formData pentru a citi si file-urile

        await axios
            .put<CourseEditInterface>(`http://localhost:3000/coursesDetails/${id}`, course)
            .then((res) => {
                setCourse(res.data)
                dispatch(addNotificationAction({ title: 'Course has saved', type: NotificationTypes.GREEN }))
            })
            .catch((error) => {
                dispatch(addNotificationAction({ title: 'Something went wrong', type: NotificationTypes.RED }))
                console.log(error)
            })
    }

    const changeCourse = (x: CourseEditInterface) => {
        setCourse(x)
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get<CourseEditInterface[]>(`http://localhost:3000/coursesDetails?id=${id}`)
                .then((res) => {
                    if (res.data[0] !== undefined) {
                        setCourse(res.data[0])
                    } else {
                        navigate(RouterNames.ERROR)
                    }
                })
                .catch((error) => console.log(error))
        }

        fetchData()
    }, [id, navigate])

    return (
        <div className='edit'>
            <Breadcrumbs text='Course' link={location.pathname} />
            <div className='edit-saveButton'>
                <Button type={ButtonTypes.GREEN} text='Save Course' onClick={saveCourse} />
            </div>
            {course && (
                <form className='edit-wrapper'>
                    <div className='edit-wrapper-about'>
                        <About course={course} changeCourse={changeCourse} />
                    </div>
                    <div className='edit-wrapper-main'>
                        <Main course={course} changeCourse={changeCourse} />
                    </div>
                    <div className='edit-wrapper-details'>
                        <Details course={course} changeCourse={changeCourse} />
                    </div>
                </form>
            )}
        </div>
    )
}

export default CourseEditPage
