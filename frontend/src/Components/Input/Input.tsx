import { InputInterface } from './InputInterface'

import './Input.scss'

const Input = ({ value, onChange, title }: InputInterface) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        onChange(e.currentTarget.value)
    }

    return (
        <label className='input'>
            <span className='input-title'>{title}</span>
            <input type='text' onChange={(e) => handleChange(e)} value={value} />
        </label>
    )
}

export default Input
