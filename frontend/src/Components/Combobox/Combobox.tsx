import Input from '../Input/Input'

import { useState, useEffect, useRef } from 'react'
import { ComboboxInterface, ComboboxItem } from './ComboboxInterface'

import './Combobox.scss'

const Combobox = ({ data, name, onSelect }: ComboboxInterface) => {
    const [selected, setSelected] = useState<string>('')
    const [isVisibleList, setIsVisibleList] = useState<boolean>(false)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const toggleShowList = () => {
        setIsVisibleList(!isVisibleList)
    }

    const hideList = () => {
        setIsVisibleList(false)
    }

    const onSelectItem = (x: ComboboxItem) => {
        setSelected(x.name)
        onSelect(x)
        hideList()
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                hideList()
            }
        }
        //Add event listener to outside click
        window.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='combobox' ref={wrapperRef}>
            <Input value={selected} title={name} onChange={() => {}} onClick={toggleShowList} />
            {data.length && isVisibleList && (
                <ul className='combobox-list'>
                    {data.map((item) => {
                        return (
                            <li key={item.id} className='combobox-list-item' onClick={() => onSelectItem(item)}>
                                {item.name}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default Combobox
