import { useState } from 'react'
import { ChipsInterface } from './ChipsInterface'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'

import Button from 'src/Components/Button/Button'
import Modal from 'src/Components/Modal/Modal'

import './Chips.scss'
import Input from 'src/Components/Input/Input'

const Chips = ({ value, onAdd, onDelete }: ChipsInterface) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [addedChip, setAddedChips] = useState<string>('')

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const changeAddedChip = (x: string) => {
        setAddedChips(x)
    }

    const onAddChip = () => {
        if (addedChip) {
            toggleModal()
            onAdd(addedChip)
            setAddedChips('')
        }
    }

    return (
        <div className='chips'>
            <h2 className='chips-title'>Skills</h2>
            <ul className='chips-list'>
                {value.map((item, index) => {
                    return (
                        <li className='chips-list-item' key={index}>
                            <span className='chips-list-item-text'>{item}</span>
                            <div className='chips-list-item-image' onClick={() => onDelete(index)}>
                                <FaTimes className='image' />
                            </div>
                        </li>
                    )
                })}
                <Button type={ButtonTypes.GREEN} onClick={toggleModal} icon={<FaPlus className='image' />} />
            </ul>
            {openModal && (
                <Modal closeModal={toggleModal}>
                    <div className='chips-modal'>
                        <Input value={addedChip} onChange={(x) => changeAddedChip(x)} title='' />
                        <div className='chips-modal-buttons'>
                            <Button type={ButtonTypes.GREEN} text='Add' onClick={onAddChip} />
                            <Button type={ButtonTypes.RED} text='Close' onClick={toggleModal} />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default Chips
