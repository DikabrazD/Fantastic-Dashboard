import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { useState } from 'react'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { teacherInterface } from 'src/store/types/teacher'

import Chips from 'src/Components/Chips/Chips'
import Button from 'src/Components/Button/Button'
import WorkersModal from './WorkersModal/WorkersModal'
import uuid from 'react-uuid'

import './WorkersTable.scss'

const WorkersTable = () => {
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false)
    const [activeWorker, setActiveWorker] = useState<teacherInterface>({
        id: uuid(),
        name: '',
        courses: [],
        description: '',
        img: '',
        imgKid: ''
    })

    const workers = useSelector((state: RootState) => state.teachers)

    const editWorker = (x: teacherInterface) => {
        setActiveWorker(x)
        setIsVisibleModal(true)
    }

    const addWorker = () => {
        setActiveWorker({
            id: '',
            name: '',
            courses: [],
            description: '',
            img: '',
            imgKid: ''
        })

        setIsVisibleModal(true)
    }

    const closeModal = () => {
        setIsVisibleModal(false)
    }

    const changeWorker = (x: teacherInterface) => {
        setActiveWorker(x)
    }

    return (
        <div className='workersTable'>
            <div className='workersTable-toolbar'>
                <h2 className='workersTable-toolbar-title'>Workers Table</h2>
                <Button type={ButtonTypes.GREEN} onClick={addWorker} text='Add worker' />
            </div>
            <div className='workersTable-wrapper'>
                <ul className='workersTable-wrapper-table'>
                    <li className='workersTable-wrapper-table-header'>
                        <span className='workersTable-wrapper-table-header-id'>ID</span>
                        <span className='workersTable-wrapper-table-header-name'>Name</span>
                        <span className='workersTable-wrapper-table-header-img'>Image</span>
                        <span className='workersTable-wrapper-table-header-imgKid'>Image Kid</span>
                        <span className='workersTable-wrapper-table-header-description'>Description</span>
                        <span className='workersTable-wrapper-table-header-courses'>Courses</span>
                    </li>
                    {workers.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className='workersTable-wrapper-table-item'
                                onClick={() => editWorker(item)}
                            >
                                <p className='workersTable-wrapper-table-item-id'>{item.id}</p>
                                <p className='workersTable-wrapper-table-item-name'>{item.name}</p>
                                <div className='workersTable-wrapper-table-item-img'>
                                    <img src={item.img} alt='Teacher' />
                                </div>
                                <div className='workersTable-wrapper-table-item-imgKid'>
                                    <img src={item.imgKid} alt='Teacher Kid' />
                                </div>
                                <p className='workersTable-wrapper-table-item-description'>{item.description}</p>
                                <div className='workersTable-wrapper-table-item-courses'>
                                    <Chips value={item.courses} addAndDelete={false} title='' />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {isVisibleModal && (
                <WorkersModal closeModal={closeModal} activeWorker={activeWorker} changeWorker={changeWorker} />
            )}
        </div>
    )
}

export default WorkersTable
