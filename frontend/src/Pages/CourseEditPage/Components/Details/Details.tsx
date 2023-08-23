import Input from 'src/Components/Input/Input'
import Button from 'src/Components/Button/Button'
import Sections from './Components/Sections/Sections'
import uuid from 'react-uuid'

import { ButtonTypes } from 'src/Components/Button/ButtonInterface'
import { ComponentDetailsInterface } from './DetailsInterface'
import { CourseEditInterface } from '../../CourseEditInterface'

import './Details.scss'

const Details = ({ course, changeCourse }: ComponentDetailsInterface) => {
    //Detail
    const changeDetailName = (detailIndex: number, x: string) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.details[detailIndex].name = x

        changeCourse(newCourse)

        //Alternative
        // if (course) {
        //     setCourse({
        //         ...course,
        //         info: {
        //             ...course.info,
        //             details: course.info.details.map((item) => {
        //                 if (item.id === '123') {
        //                     return { ...item, name: x }
        //                 } else return item
        //             })
        //         }
        //     })
        // }
    }

    const addDetail = () => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))

        newCourse.info.details.push({
            id: uuid(),
            name: 'NewDetails',
            sections: []
        })

        changeCourse(newCourse)
    }

    const deleteDetail = (x: number) => {
        const newCourse: CourseEditInterface = JSON.parse(JSON.stringify(course))
        newCourse.info.details.splice(x, 1)
        changeCourse(newCourse)
    }

    return (
        <div className='details'>
            <h2 className='details-title'>
                <span className='details-title-text'>Details</span>
                <Button type={ButtonTypes.GREENSOLID} onClick={addDetail} text='Add' />
            </h2>
            <div className='details-list'>
                {course.info.details.map((item, detailIndex) => {
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
