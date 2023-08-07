import { ButtonInterface, ButtonTypes } from './ButtonInterface'

import './Button.scss'

const Button = ({ type, icon, text, onClick }: ButtonInterface) => {
    const buttonClass = (() => {
        switch (type) {
            case ButtonTypes.RED:
                return 'button-red'
            case ButtonTypes.GREEN:
                return 'button-green'
        }
    })()

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        onClick()
    }

    return (
        <button type='button' className={`button ${buttonClass}`} onClick={onClickHandler}>
            {icon ? <div className='button-icon'>{icon}</div> : ''}
            {text ? <span className='button-text'>{text}</span> : ''}
        </button>
    )
}

export default Button
