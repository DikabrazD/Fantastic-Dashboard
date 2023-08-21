import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CourseEditInterface } from './CourseEditInterface'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'

import Breadcrumbs from 'src/Components/Breadcrumbs'
import Input from 'src/Components/Input'
import axios from 'axios'
import Chips from './Components/Chips'
import Details from './Components/Details'
import Button from 'src/Components/Button/Button'
import uuid from 'react-uuid'

import './CourseEditPage.scss'

const CourseEditPage = () => {
    const location = useLocation()
    const { id } = useParams()
    const formData = new FormData()

    const [course, setCourse] = useState<CourseEditInterface>()

    ///Course change logic

    //About
    const changeName = (x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))

        newCourse.name = x
        setCourse(newCourse)
    }

    const changePrice = (x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))

        newCourse.price = Number(x.replace(/\D/g, ''))
        setCourse(newCourse)
    }

    const changeImage = (x: React.ChangeEvent<HTMLInputElement>) => {
        if (x.target.files) {
            formData.append('image', x.target.files[0])
        }
    }

    const changeNumberLectures = (x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))

        newCourse.number_lectures = Number(x.replace(/\D/g, ''))
        setCourse(newCourse)
    }
    //Main
    const changeMainText = (x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))

        newCourse.info.main.text = x
        setCourse(newCourse)
    }
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

    //Details
    const changeDetailName = (detailIndex: number, x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.details[detailIndex].name = x

        setCourse(newCourse)
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

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get<CourseEditInterface[]>(`http://localhost:3000/coursesDetails?id=${id}`)
                .then((res) => {
                    setCourse(res.data[0])
                })
                .catch((error) => console.log(error))
        }

        fetchData()
    }, [id])

    return (
        <div className='edit'>
            <Breadcrumbs text='Course' link={location.pathname} />
            <div className='edit-saveButton'>
                <Button type={ButtonTypes.GREEN} text='Save Course' onClick={saveCourse} />
            </div>
            {course && (
                <form className='edit-wrapper'>
                    <div className='edit-wrapper-about'>
                        <h2 className='edit-wrapper-about-title'>About</h2>
                        <div className='edit-wrapper-about-image'>
                            <h3 className='edit-wrapper-about-image-title'>Image</h3>
                            <img src={course.img} className='image' alt='course' />
                        </div>
                        <input type='file' accept='image/png, image/gif, image/jpeg' onChange={changeImage} />
                        <Input value={course.name} onChange={(x) => changeName(x)} placeholder='Name' />
                        <Input value={course.price} onChange={(x) => changePrice(x)} placeholder='Price' />
                        <Input
                            value={course.number_lectures}
                            onChange={(x) => changeNumberLectures(x)}
                            placeholder='Number Lectures'
                        />
                    </div>
                    <div className='edit-wrapper-main'>
                        <h2 className='edit-wrapper-main-title'>Main</h2>
                        <div className='edit-wrapper-main-input'>
                            <Input
                                value={course.info.main.text}
                                onChange={(x) => changeMainText(x)}
                                placeholder='Text'
                            />
                        </div>
                        <Chips
                            value={course.info.main.skills}
                            onAdd={(x) => addSkill(x)}
                            onDelete={(x) => deleteSkill(x)}
                        />
                    </div>
                    <div className='edit-wrapper-details'>
                        <Details
                            details={course.info.details}
                            changeDetailName={(detailIndex, x) => changeDetailName(detailIndex, x)}
                            changeSectionText={(detailIndex, sectionIndex, x) =>
                                changeSectionText(detailIndex, sectionIndex, x)
                            }
                            addSkill={(detailIndex, sectionIndex, x) => addSectionSkill(detailIndex, sectionIndex, x)}
                            deleteSkill={(detailIndex, sectionIndex, x) =>
                                deleteSectionSkill(detailIndex, sectionIndex, x)
                            }
                            addDetail={addDetail}
                            deleteDetail={(x) => deleteDetail(x)}
                            addSection={(detailIndex, type) => addSection(detailIndex, type)}
                            deleteSectin={(detailIndex, sectionIndex) => deleteSection(detailIndex, sectionIndex)}
                        />
                    </div>
                </form>
            )}
        </div>
    )
}

export default CourseEditPage
