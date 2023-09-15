import Button from 'src/Components/Button/Button'
import Chips from 'src/Components/Chips/Chips'
import Input from 'src/Components/Input/Input'
import Modal from 'src/Components/Modal/Modal'
import Textarea from 'src/Components/Textarea/Textarea'

import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { WorkersModalInterface } from './WorkersModalInterface'
import { useDispatch } from 'react-redux'
import { addTeacherAction, deleteTeacherAction, editTeacherAction } from 'src/store/reducers/teacherReducer'
import { addNotificationAction } from 'src/store/reducers/notificationReducer'
import { NotificationTypes } from 'src/store/types/notification'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

import './WorkersModal.scss'
import InputImage from 'src/Components/InputImage/InputImage'

const WorkersModal = ({ closeModal, changeWorker, activeWorker }: WorkersModalInterface) => {
    const teachers = useSelector((state: RootState) => state.teachers)
    const dispatch = useDispatch()

    const editName = (x: string) => {
        changeWorker({ ...activeWorker, name: x })
    }
    const editDescription = (x: string) => {
        changeWorker({ ...activeWorker, description: x })
    }
    const editImage = (x: string) => {
        changeWorker({ ...activeWorker, img: x })
    }
    const editImageKid = (x: string) => {
        changeWorker({ ...activeWorker, imgKid: x })
    }
    const addNewImage = (x: File) => {
        changeWorker({ ...activeWorker, newImg: x })
    }
    const addNewImageKid = (x: File) => {
        changeWorker({ ...activeWorker, newImgKid: x })
    }
    const addCourses = (x: string) => {
        changeWorker({ ...activeWorker, courses: [...activeWorker.courses, x] })
    }
    const deleteCourses = (x: number) => {
        changeWorker({ ...activeWorker, courses: activeWorker.courses.filter((item, index) => index !== x) })
    }

    const addEditWorker = () => {
        if (teachers.find((item) => item.id === activeWorker.id)) {
            dispatch(editTeacherAction(activeWorker))
            dispatch(
                addNotificationAction({
                    title: 'Workers successfully edited',
                    type: NotificationTypes.GREEN
                })
            )
        } else {
            dispatch(addTeacherAction(activeWorker))
            dispatch(
                addNotificationAction({
                    title: 'Workers successfully added',
                    type: NotificationTypes.GREEN
                })
            )
        }
        closeModal()
    }

    const deleteWorker = () => {
        dispatch(deleteTeacherAction(activeWorker))
        dispatch(
            addNotificationAction({
                title: 'Workers successfully deleted',
                type: NotificationTypes.GREEN
            })
        )
        closeModal()
    }

    return (
        <Modal closeModal={closeModal}>
            <div className='workersModal'>
                <h3 className='workersModal-title'>Add/Edit worker</h3>
                <Input value={activeWorker.name} title='Name' onChange={editName} />
                <Textarea value={activeWorker.description} title='Description' onChange={editDescription} />
                <div className='workersModal-files'>
                    <div className='workersModal-files-item'>
                        <div className='workersModal-files-item-img'>
                            <img src={activeWorker.img} alt='' className='image' />
                        </div>
                        <InputImage getImage={addNewImage} getSrcImage={editImage} />
                    </div>
                    <div className='workersModal-files-item'>
                        <div className='workersModal-files-item-img'>
                            <img src={activeWorker.imgKid} alt='' className='image' />
                        </div>
                        <InputImage getImage={addNewImageKid} getSrcImage={editImageKid} />
                    </div>
                </div>
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
