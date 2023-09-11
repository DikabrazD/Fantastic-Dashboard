export type ComboboxItem = {
    id: string
    name: string
}

export interface ComboboxInterface {
    data: ComboboxItem[]
    onSelect: (x: ComboboxItem) => void
}
