import { NotificationActions, NotificationActionsTypes, notificationInterface } from '../types/notification'

import uuid from 'react-uuid'

const defaultState: notificationInterface[] = []

export const notificationReducer = (state = defaultState, action: NotificationActions): notificationInterface[] => {
    switch (action.type) {
        case NotificationActionsTypes.ADD: {
            return [...state, { ...action.payload, id: uuid() }]
        }
        case NotificationActionsTypes.DELETE: {
            return state.filter((item) => item.id !== action.payload.id)
        }
        default:
            return defaultState
    }
}

export const addNotificationAction = (payload: Omit<notificationInterface, 'id'>) => ({
    type: NotificationActionsTypes.ADD,
    payload: payload
})

export const deleteNotificationAction = (payload: notificationInterface) => ({
    type: NotificationActionsTypes.DELETE,
    payload: payload
})
