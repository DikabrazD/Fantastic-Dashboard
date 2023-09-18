import Textarea from 'src/Components/Textarea/Textarea'
import Chips from '../../../../../Components/Chips/Chips'
import Button from 'src/Components/Button/Button'
import Modal from 'src/Components/Modal/Modal'
import uuid from 'react-uuid'

import { useState } from 'react'
import { SectionInterface } from './SectionsInterface'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'

import './Sections.scss'

const Sections = ({ detailIndex, course, changeCourse }: SectionInterface) => {
    const [sectionModal, setSectionModal] = useState<boolean>(false)

    //Modal
    const openSectionModal = (x: number) => {
        setSectionModal(true)
    }

    const closeSectionModal = () => {
        setSectionModal(false)
    }

    //Section

    const changeSectionText = (sectionId: string, x: string) => {
        changeCourse({
            ...course,
            info: {
                ...course.info,
                details: course.info.details.map((item, index) => {
                    //Caut detalia dupa  index
                    if (index === detailIndex) {
                        return {
                            ...item,
                            sections: course.info.details[detailIndex].sections.map((sectionItem) => {
                                //Caut sectiunea si controlez daca este de type text,si schimbam
                                if (sectionId === sectionItem.id && sectionItem.type === 'text') {
                                    return {
                                        ...sectionItem,
                                        text: x
                                    }
                                } else return sectionItem
                            })
                        }
                    } else return item
                })
            }
        })
    }

    const addSection = (type: 'text' | 'skills') => {
        changeCourse({
            ...course,
            info: {
                ...course.info,
                details: course.info.details.map((item, index) => {
                    if (detailIndex === index) {
                        if (type === 'text')
                            return {
                                ...item,
                                sections: [
                                    ...item.sections,
                                    {
                                        id: uuid(),
                                        type: type,
                                        text: ''
                                    }
                                ]
                            }
                        else {
                            return {
                                ...item,
                                sections: [
                                    ...item.sections,
                                    {
                                        id: uuid(),
                                        type: type,
                                        skills: []
                                    }
                                ]
                            }
                        }
                    } else return item
                })
            }
        })
    }

    const deleteSection = (sectionId: string) => {
        changeCourse({
            ...course,
            info: {
                ...course.info,
                details: course.info.details.map((item, index) => {
                    if (detailIndex === index) {
                        return {
                            ...item,
                            sections: item.sections.filter((section) => section.id !== sectionId)
                        }
                    } else return item
                })
            }
        })
    }

    //Skill

    const deleteSkill = (sectionId: string, x: number) => {
        changeCourse({
            ...course,
            info: {
                ...course.info,
                details: course.info.details.map((item, index) => {
                    //Caut detalia dupa  index
                    if (index === detailIndex) {
                        return {
                            ...item,
                            sections: course.info.details[detailIndex].sections.map((sectionItem) => {
                                //Caut sectiunea si controlez daca este de type skills si sterg skill de index-ul indicat
                                if (sectionId === sectionItem.id && sectionItem.type === 'skills') {
                                    return {
                                        ...sectionItem,
                                        skills: sectionItem.skills.filter((item, index) => index !== x)
                                    }
                                } else return sectionItem
                            })
                        }
                    } else return item
                })
            }
        })
    }

    const addSkill = (sectionId: string, x: string) => {
        changeCourse({
            ...course,
            info: {
                ...course.info,
                details: course.info.details.map((item, index) => {
                    //Caut detalia dupa  index
                    if (index === detailIndex) {
                        return {
                            ...item,
                            sections: course.info.details[detailIndex].sections.map((sectionItem) => {
                                //Caut sectiunea si controlez daca este de type skills si adaug la urma un item
                                if (sectionId === sectionItem.id && sectionItem.type === 'skills') {
                                    return {
                                        ...sectionItem,
                                        skills: [...sectionItem.skills, x]
                                    }
                                } else return sectionItem
                            })
                        }
                    } else return item
                })
            }
        })
    }
    return (
        <div className='sectionDetail'>
            {course.info.details[detailIndex].sections.map((item) => {
                return (
                    <div className='sectionDetail-wrapper' key={item.id}>
                        {item.type === 'text' ? (
                            <Textarea value={item.text} onChange={(x) => changeSectionText(item.id, x)} title='Text' />
                        ) : (
                            <div className='sectionDetail-wrapper-skills'>
                                <Chips
                                    value={item.skills}
                                    onAdd={(x) => addSkill(item.id, x)}
                                    onDelete={(x) => deleteSkill(item.id, x)}
                                />
                            </div>
                        )}
                        <div className='sectionDetail-wrapper-deleteButton'>
                            <Button
                                type={ButtonTypes.RED}
                                onClick={() => deleteSection(item.id)}
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

export default Sections
