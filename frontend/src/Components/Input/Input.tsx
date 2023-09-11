import { InputInterface } from './InputInterface'

import './Input.scss'

const Input = ({ value, title, onChange, onClick }: InputInterface) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        onChange(e.currentTarget.value)
    }

    return (
        <label className='input' onClick={onClick}>
            <span className='input-title'>{title}</span>
            <input type='text' onChange={(e) => handleChange(e)} value={value} />
        </label>
    )
}

export default Input
