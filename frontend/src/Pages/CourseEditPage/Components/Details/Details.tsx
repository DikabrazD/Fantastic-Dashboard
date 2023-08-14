import Input from 'src/Components/Input/Input'
import Chips from '../Chips/Chips'

import { ComponentDetailsInterface } from './DetailsInterface'

import './Details.scss'
import Button from 'src/Components/Button/Button'
import { ButtonTypes } from 'src/Components/Button/ButtonInterface'

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
    return (
        <div className='details'>
            <h2 className='details-title'>
                <span className='details-title-text'>Details</span>
                <Button type={ButtonTypes.GREENSOLID} onClick={() => {}} text='Add' />
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
                                <Button type={ButtonTypes.GREEN} onClick={() => {}} text='Add Section' />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Details
