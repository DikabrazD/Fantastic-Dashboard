import Input from '../Input/Input'

import { useState, useEffect } from 'react'
import { ComboboxInterface } from './ComboboxInterface'

import './Combobox.scss'

const Combobox = ({ data }: ComboboxInterface) => {
    const [selected, setSelected] = useState<string>('')

    const onSelectItem = (x: string) => {
        setSelected(x)
    }

    useEffect(() => {
        if (data.length) {
            setSelected(data[0].name)
        }
    }, [data])

    return (
        <div className='combobox'>
            {data.length && (
                <>
                    <Input value={selected} onChange={() => {}} title='Combobox' />
                    <ul className='combobox-list'>
                        {data.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    className='combobox-list-item'
                                    onClick={() => onSelectItem(item.name)}
                                >
                                    {item.name}
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}
        </div>
    )
}

export default Combobox
