import { CourseDetailsInterface } from '../../CourseEditInterface'

export interface ComponentDetailsInterface {
    details: CourseDetailsInterface[]
    changeDetailName: (detailIndex: number, text: string) => void
    changeSectionText: (detailIndex: number, sectionIndex: number, text: string) => void
    addSkill: (detailIndex: number, sectionIndex: number, skill: string) => void
    deleteSkill: (detailIndex: number, sectionIndex: number, skillIndex: number) => void
    addDetail: () => void
    deleteDetail: (x: number) => void
    addSection: (detailIndex: number, type: 'text' | 'skills') => void
    deleteSectin: (detailIndex: number, sectionIndex: number) => void
}
