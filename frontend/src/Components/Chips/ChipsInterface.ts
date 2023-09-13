export interface ChipsInterface {
    value: string[]
    onAdd?: (x: string) => void
    onDelete?: (x: number) => void
    addAndDelete?: boolean
    title?: string
}
