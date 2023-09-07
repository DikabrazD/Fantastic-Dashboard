import { NotificationActionsTypes, notificationInterface } from '../types/notification'

const defaultState: notificationInterface[] = []

export const notificationReducer = (
    state = defaultState,
    action: { type: NotificationActionsTypes; payload: notificationInterface }
): notificationInterface[] => {
    switch (action.type) {
        case NotificationActionsTypes.ADD: {
            return [...state, action.payload]
        }
        case NotificationActionsTypes.DELETE: {
            return state.filter((item) => item.id !== action.payload.id)
        }
        default:
            return defaultState
    }
}

export const addNotificationAction = (payload: notificationInterface) => ({
    type: NotificationActionsTypes.ADD,
    payload: payload
})

export const deleteNotificationAction = (payload: notificationInterface) => ({
    type: NotificationActionsTypes.DELETE,
    payload: payload
})
