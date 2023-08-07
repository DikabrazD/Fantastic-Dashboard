import { ModalInterface } from './ModalInterface'

import './Modal.scss'

const Modal = ({ closeModal, children }: ModalInterface) => {
    return (
        <div className='modal'>
            <div className='modal-bg' onClick={closeModal} />
            <div className='modal-inner'>{children}</div>
        </div>
    )
}

export default Modal
