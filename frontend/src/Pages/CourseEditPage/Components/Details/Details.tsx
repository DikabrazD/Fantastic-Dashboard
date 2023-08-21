import Input from 'src/Components/Input/Input'
import Chips from '../Chips/Chips'
import Button from 'src/Components/Button/Button'
import Modal from 'src/Components/Modal/Modal'

import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { useState } from 'react'
import { ComponentDetailsInterface } from './DetailsInterface'

import './Details.scss'

const Details = ({
    details,
    changeDetailName,
    changeSectionText,
    addSkill,
    deleteSkill,
    addDetail,
    deleteDetail,
    addSection,
    deleteSectin
}: ComponentDetailsInterface) => {
    const [detailActive, setDetailActive] = useState<number>()
    const [sectionModal, setSectionModal] = useState<boolean>(false)

    const openSectionModal = (x: number) => {
        setDetailActive(x)
        setSectionModal(true)
    }

    const closeSectionModal = () => {
        setSectionModal(false)
    }

    const addNewSection = (x: 'text' | 'skills') => {
        if (detailActive !== undefined) {
            addSection(detailActive, x)
        }
        closeSectionModal()
    }

    return (
        <div className='details'>
            <h2 className='details-title'>
                <span className='details-title-text'>Details</span>
                <Button type={ButtonTypes.GREENSOLID} onClick={addDetail} text='Add' />
            </h2>
            <div className='details-list'>
                {details.map((item, detailIndex) => {
                    return (
                        <div key={item.id} className='details-list-item'>
                            <div className='details-list-item-deleteButton'>
                                <Button
                                    type={ButtonTypes.RED}
                                    onClick={() => deleteDetail(detailIndex)}
                                    text='Delete'
                                />
                            </div>
                            <Input
                                value={item.name}
                                onChange={(x) => changeDetailName(detailIndex, x)}
                                placeholder='Details name'
                            />
                            {item.sections.map((item, sectionIndex) => {
                                return (
                                    <div key={item.id} className='details-list-item-section'>
                                        {item.type === 'text' ? (
                                            <Input
                                                value={item.text}
                                                onChange={(x) => changeSectionText(detailIndex, sectionIndex, x)}
                                                placeholder='Section text'
                                            />
                                        ) : (
                                            <div className='details-list-item-section-skills'>
                                                <Chips
                                                    value={item.skills}
                                                    onAdd={(x) => addSkill(detailIndex, sectionIndex, x)}
                                                    onDelete={(x) => deleteSkill(detailIndex, sectionIndex, x)}
                                                />
                                            </div>
                                        )}

                                        <div className='details-list-item-section-deleteButton'>
                                            <Button
                                                type={ButtonTypes.RED}
                                                onClick={() => deleteSectin(detailIndex, sectionIndex)}
                                                text='Delete Section'
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                            <div className='details-list-item-addButton'>
                                <Button
                                    type={ButtonTypes.GREEN}
                                    onClick={() => openSectionModal(detailIndex)}
                                    text='Add Section'
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            {sectionModal && (
                <Modal closeModal={closeSectionModal}>
                    <div className='details-sectionModal'>
                        <p className='details-sectionModal-text'>Choose the type of section</p>
                        <div className='details-sectionModal-buttons'>
                            <Button type={ButtonTypes.GREENSOLID} onClick={() => addNewSection('text')} text='Text' />
                            <Button type={ButtonTypes.REDSOLID} onClick={() => addNewSection('skills')} text='Skills' />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default Details
