export interface InputInterface {
    value: string | number
    title: string
    onChange: (x: string) => void
    onClick?: () => void
}
