import { InputInterface } from './InputInterface'

import './Input.scss'

const Input = ({ value, onChange, placeholder }: InputInterface) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        onChange(e.currentTarget.value)
    }

    return (
        <label className='input'>
            <span className='input-info'>{placeholder}</span>
            <input type='text' onChange={(e) => handleChange(e)} value={value} />
        </label>
    )
}

export default Input
