import { ReactNode } from 'react'

export interface ButtonInterface {
    type: ButtonTypes
    icon: ReactNode
    onClick: () => void
}

export enum ButtonTypes {
    RED = 'RED',
    GREEN = 'GREEN'
}
