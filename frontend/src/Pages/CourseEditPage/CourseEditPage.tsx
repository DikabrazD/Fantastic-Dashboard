import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { RouterNames } from 'src/router'
import { CourseEditInterface } from './CourseEditInterface'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'

import Breadcrumbs from 'src/Components/Breadcrumbs'
import axios from 'axios'
import Details from './Components/Details'
import Button from 'src/Components/Button/Button'
import uuid from 'react-uuid'

import './CourseEditPage.scss'
import Main from './Components/Main/Main'
import About from './Components/About/About'

const CourseEditPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()
    const formData = new FormData()

    const [course, setCourse] = useState<CourseEditInterface>()

    //Details
    const changeDetailName = (detailIndex: number, x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.details[detailIndex].name = x

        setCourse(newCourse)

        //Alternative
        // if (course) {
        //     setCourse({
        //         ...course,
        //         info: {
        //             ...course.info,
        //             details: course.info.details.map((item) => {
        //                 if (item.id === '123') {
        //                     return { ...item, name: x }
        //                 } else return item
        //             })
        //         }
        //     })
        // }
    }

    const changeSectionText = (detailIndex: number, sectionIndex: number, x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        const section = newCourse.info.details[detailIndex].sections[sectionIndex]

        if (section.type === 'text') {
            section.text = x
        }

        newCourse.info.details[detailIndex].sections[sectionIndex] = section
        setCourse(newCourse)
    }

    const addSectionSkill = (detailIndex: number, sectionIndex: number, x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        const section = newCourse.info.details[detailIndex].sections[sectionIndex]

        if (section.type === 'skills') {
            section.skills.push(x)
        }

        newCourse.info.details[detailIndex].sections[sectionIndex] = section
        setCourse(newCourse)
    }

    const deleteSectionSkill = (detailIndex: number, sectionIndex: number, x: number) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        const section = newCourse.info.details[detailIndex].sections[sectionIndex]

        if (section.type === 'skills') {
            section.skills.splice(x, 1)
        }

        newCourse.info.details[detailIndex].sections[sectionIndex] = section
        setCourse(newCourse)
    }

    const addDetail = () => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))

        newCourse.info.details.push({
            id: uuid(),
            name: 'NewDetails',
            sections: []
        })

        setCourse(newCourse)
    }

    const deleteDetail = (x: number) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.details.splice(x, 1)
        setCourse(newCourse)
    }

    const addSection = (detailIndex: number, type: 'text' | 'skills') => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))

        if (type === 'text') {
            newCourse.info.details[detailIndex].sections.push({
                id: uuid(),
                type: type,
                text: ''
            })
        } else {
            newCourse.info.details[detailIndex].sections.push({
                id: uuid(),
                type: type,
                skills: []
            })
        }

        setCourse(newCourse)
    }

    const deleteSection = (detailIndex: number, sectionIndex: number) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.details[detailIndex].sections.splice(sectionIndex, 1)
        setCourse(newCourse)
    }

    const saveCourse = async () => {
        await axios
            .put<CourseEditInterface>(`http://localhost:3000/coursesDetails/${id}`, course)
            .then((res) => setCourse(res.data))
            .catch((error) => console.log(error))
    }

    const changeCourse = (x: CourseEditInterface) => {
        setCourse(x)
    }

    const changeFormData = (x: File) => {
        formData.append('image', x)
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
                        <About course={course} changeCourse={changeCourse} changeFormData={changeFormData} />
                    </div>
                    <div className='edit-wrapper-main'>
                        <Main course={course} changeCourse={changeCourse} />
                    </div>
                    <div className='edit-wrapper-details'>
                        <Details
                            details={course.info.details}
                            changeDetailName={changeDetailName}
                            changeSectionText={changeSectionText}
                            addSkill={addSectionSkill}
                            deleteSkill={deleteSectionSkill}
                            addDetail={addDetail}
                            deleteDetail={deleteDetail}
                            addSection={addSection}
                            deleteSectin={deleteSection}
                        />
                    </div>
                </form>
            )}
        </div>
    )
}

export default CourseEditPage
