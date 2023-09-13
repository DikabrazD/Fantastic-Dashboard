export type ComboboxItem = {
    id: string
    name: string
}

export interface ComboboxInterface {
    data: ComboboxItem[]
    name: string
    onSelect: (x: ComboboxItem) => void
}
