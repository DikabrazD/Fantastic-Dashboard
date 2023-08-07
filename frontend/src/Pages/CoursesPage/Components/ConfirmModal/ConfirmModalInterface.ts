export interface ConfirmModalInterface {
    confirmed: () => void
    declined: () => void
    closeModal: () => void
    text: string
}
