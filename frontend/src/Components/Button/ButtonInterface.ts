import { ReactNode } from 'react'

export interface ButtonInterface {
    type: ButtonTypes
    icon?: ReactNode
    text?: string
    onClick: () => void
}

export enum ButtonTypes {
    RED = 'RED',
    GREEN = 'GREEN'
}
