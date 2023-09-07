import Textarea from 'src/Components/Textarea/Textarea'
import Chips from '../../../Chips/Chips'
import Button from 'src/Components/Button/Button'
import Modal from 'src/Components/Modal/Modal'
import uuid from 'react-uuid'

import { useState } from 'react'
import { SectionInterface } from './SectionsInterface'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { CourseEditInterface } from 'src/Pages/CourseEditPage/CourseEditInterface'

import './Sections.scss'

const Section = ({ detailIndex, course, changeCourse }: SectionInterface) => {
    const [sectionModal, setSectionModal] = useState<boolean>(false)

    //Modal
    const openSectionModal = (x: number) => {
        setSectionModal(true)
    }

    const closeSectionModal = () => {
        setSectionModal(false)
    }

    //Section

    const changeSectionText = (sectionIndex: number, x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        const section = newCourse.info.details[detailIndex].sections[sectionIndex]

        if (section.type === 'text') {
            section.text = x
        }

        newCourse.info.details[detailIndex].sections[sectionIndex] = section
        changeCourse(newCourse)
    }

    const addSection = (type: 'text' | 'skills') => {
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

        changeCourse(newCourse)
    }

    const deleteSection = (sectionIndex: number) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.details[detailIndex].sections.splice(sectionIndex, 1)

        changeCourse(newCourse)
    }

    //Skill

    const deleteSkill = (sectionIndex: number, x: number) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        const section = newCourse.info.details[detailIndex].sections[sectionIndex]

        if (section.type === 'skills') {
            section.skills.splice(x, 1)
        }

        newCourse.info.details[detailIndex].sections[sectionIndex] = section
        changeCourse(newCourse)
    }

    const addSkill = (sectionIndex: number, x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        const section = newCourse.info.details[detailIndex].sections[sectionIndex]

        if (section.type === 'skills') {
            section.skills.push(x)
        }

        newCourse.info.details[detailIndex].sections[sectionIndex] = section
        changeCourse(newCourse)
    }
    return (
        <div className='sectionDetail'>
            {course.info.details[detailIndex].sections.map((item, sectionIndex) => {
                return (
                    <div className='sectionDetail-wrapper' key={sectionIndex}>
                        {item.type === 'text' ? (
                            <Textarea
                                value={item.text}
                                onChange={(x) => changeSectionText(sectionIndex, x)}
                                title='Text'
                            />
                        ) : (
                            <div className='sectionDetail-wrapper-skills'>
                                <Chips
                                    value={item.skills}
                                    onAdd={(x) => addSkill(sectionIndex, x)}
                                    onDelete={(x) => deleteSkill(sectionIndex, x)}
                                />
                            </div>
                        )}
                        <div className='sectionDetail-wrapper-deleteButton'>
                            <Button
                                type={ButtonTypes.RED}
                                onClick={() => deleteSection(sectionIndex)}
                                text='Delete Section'
                            />
                        </div>

                        {sectionModal && (
                            <Modal closeModal={closeSectionModal}>
                                <div className='sectionDetail-modal'>
                                    <p className='sectionDetail-modal-text'>Choose the type of section</p>
                                    <div className='sectionDetail-modal-buttons'>
                                        <Button
                                            type={ButtonTypes.GREENOUTLINED}
                                            onClick={() => addSection('text')}
                                            text='Text'
                                        />
                                        <Button
                                            type={ButtonTypes.REDOUTLINED}
                                            onClick={() => addSection('skills')}
                                            text='Skills'
                                        />
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </div>
                )
            })}

            <div className='sectionDetail-addButton'>
                <Button type={ButtonTypes.GREEN} onClick={() => openSectionModal(detailIndex)} text='Add Section' />
            </div>
        </div>
    )
}

export default Section
