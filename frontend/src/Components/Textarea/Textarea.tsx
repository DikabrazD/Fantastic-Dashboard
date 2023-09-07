import { TextareaInterface } from './TextareaInterface'

import './Textarea.scss'

const Textarea = ({ value, onChange, title }: TextareaInterface) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()

        onChange(e.currentTarget.value)
    }

    return (
        <label className='textarea'>
            <span className='textarea-title'>{title}</span>
            <textarea value={value} onChange={(e) => handleChange(e)} rows={7} />
        </label>
    )
}

export default Textarea
