import Button from 'src/Components/Button/Button'
import Chips from 'src/Components/Chips/Chips'
import Input from 'src/Components/Input/Input'
import Modal from 'src/Components/Modal/Modal'
import Textarea from 'src/Components/Textarea/Textarea'

import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { WorkersModalInterface } from './WorkersModalInterface'
import { useDispatch } from 'react-redux'
import { addTeacherAction, deleteTeacherAction, editTeacherAction } from 'src/store/reducers/teacherReducer'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

import './WorkersModal.scss'

const WorkersModal = ({ closeModal, changeWorker, activeWorker }: WorkersModalInterface) => {
    const teachers = useSelector((state: RootState) => state.teachers)
    const dispatchWorkers = useDispatch()

    const editName = (x: string) => {
        changeWorker({ ...activeWorker, name: x })
    }
    const editDescription = (x: string) => {
        changeWorker({ ...activeWorker, description: x })
    }
    const addCourses = (x: string) => {
        changeWorker({ ...activeWorker, courses: [...activeWorker.courses, x] })
    }
    const deleteCourses = (x: number) => {
        changeWorker({ ...activeWorker, courses: activeWorker.courses.splice(x, 1) })
    }

    const addEditWorker = () => {
        if (teachers.find((item) => item.id === activeWorker.id)) {
            dispatchWorkers(editTeacherAction(activeWorker))
        } else {
            dispatchWorkers(addTeacherAction(activeWorker))
        }
        closeModal()
    }

    const deleteWorker = () => {
        dispatchWorkers(deleteTeacherAction(activeWorker))
        closeModal()
    }

    return (
        <Modal closeModal={closeModal}>
            <div className='workersModal'>
                <h3 className='workersModal-title'>Add/Edit worker</h3>
                <Input value={activeWorker.name} title='Name' onChange={editName} />
                <Textarea value={activeWorker.description} title='Description' onChange={editDescription} />
                <div className='workersModal-img'>
                    <img src={activeWorker.img} alt='' className='image' />
                </div>
                <input type='file' />
                <div className='workersModal-imgKid'>
                    <img src={activeWorker.imgKid} alt='' className='image' />
                </div>
                <input type='file' />
                <Chips value={activeWorker.courses} onAdd={addCourses} onDelete={deleteCourses} title='Courses' />
                <div className='workersModal-actions'>
                    <Button type={ButtonTypes.GREENOUTLINED} onClick={addEditWorker} text='Add/Edit worker' />
                    <Button type={ButtonTypes.REDOUTLINED} onClick={deleteWorker} text='Delete worker' />
                </div>
            </div>
        </Modal>
    )
}

export default WorkersModal
