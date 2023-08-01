import { ButtonInterface, ButtonTypes } from './ButtonInterface'

import './Button.scss'

const Button = ({ type, icon, onClick }: ButtonInterface) => {
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
            {icon}
        </button>
    )
}

export default Button
