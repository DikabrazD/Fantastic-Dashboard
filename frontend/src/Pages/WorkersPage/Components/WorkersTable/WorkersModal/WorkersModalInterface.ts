import { teacherInterface } from 'src/store/types/teacher'

export interface WorkersModalInterface {
    activeWorker: teacherInterface
    changeWorker: (x: teacherInterface) => void
    closeModal: () => void
}
