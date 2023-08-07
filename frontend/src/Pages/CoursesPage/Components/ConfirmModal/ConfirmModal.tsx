import Modal from 'src/Components/Modal/Modal'

import { ConfirmModalInterface } from './ConfirmModalInterface'

import './ConfirmModal.scss'
import Button from 'src/Components/Button/Button'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'

const ConfirmModal = ({ text, confirmed, declined, closeModal }: ConfirmModalInterface) => {
    return (
        <Modal closeModal={closeModal}>
            <div className='confirmModal'>
                <h2 className='confirmModal-title'>{text}</h2>
                <div className='confirmModal-buttons'>
                    <Button type={ButtonTypes.RED} onClick={confirmed} text='YES' />
                    <Button type={ButtonTypes.GREEN} onClick={declined} text='NO' />
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal
