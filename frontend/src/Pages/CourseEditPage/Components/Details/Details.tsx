import Input from 'src/Components/Input'
import Button from 'src/Components/Button'
import Sections from './Sections'
import uuid from 'react-uuid'

import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { ComponentDetailsInterface } from './DetailsInterface'

import './Details.scss'

const Details = ({ course, changeCourse }: ComponentDetailsInterface) => {
    //Detail
    const changeDetailName = (detailId: string, x: string) => {
        if (course) {
            changeCourse({
                ...course,
                info: {
                    ...course.info,
                    details: course.info.details.map((item) => {
                        if (item.id === detailId) {
                            return { ...item, name: x }
                        } else return item
                    })
                }
            })
        }
    }

    const addDetail = () => {
        changeCourse({
            ...course,
            info: {
                ...course.info,
                details: [
                    ...course.info.details,
                    {
                        id: uuid(),
                        name: 'NewDetails',
                        sections: []
                    }
                ]
            }
        })
    }

    const deleteDetail = (x: string) => {
        changeCourse({
            ...course,
            info: {
                ...course.info,
                details: course.info.details.filter((item) => item.id !== x)
            }
        })
    }

    return (
        <div className='details'>
            <h2 className='details-title'>
                <span className='details-title-text'>Details</span>
                <Button type={ButtonTypes.GREENOUTLINED} onClick={addDetail} text='Add' />
            </h2>
            <div className='details-list'>
                {course.info.details.map((item, detailIndex) => {
                    return (
                        <div key={item.id} className='details-list-item'>
                            <div className='details-list-item-deleteButton'>
                                <Button type={ButtonTypes.RED} onClick={() => deleteDetail(item.id)} text='Delete' />
                            </div>
                            <Input
                                value={item.name}
                                onChange={(x) => changeDetailName(item.id, x)}
                                title='Details name'
                            />
                            <Sections
                                key={item.id}
                                course={course}
                                detailIndex={detailIndex}
                                changeCourse={changeCourse}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Details
