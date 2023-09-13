import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

import './WorkersTable.scss'
import Chips from 'src/Components/Chips/Chips'
import Button from 'src/Components/Button/Button'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'

const WorkersTable = () => {
    const workers = useSelector((state: RootState) => state.teachers)

    return (
        <div className='workersTable'>
            <div className='workersTable-toolbar'>
                <h2 className='workersTable-toolbar-title'>Workers Table</h2>
                <Button type={ButtonTypes.GREEN} onClick={() => {}} text='Add worker' />
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
                            <li key={item.id} className='workersTable-wrapper-table-item'>
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
        </div>
    )
}

export default WorkersTable
