export interface notificationInterface {
    id: string
    title: string
    type: NotificationTypes
}

export enum NotificationTypes {
    RED = 'RED',
    GREEN = 'GREEN'
}

export enum NotificationActionsTypes {
    ADD = 'ADD_NOTIFICATION',
    DELETE = 'DELETE_NOTIFICATION'
}

interface AddNotificationAction {
    type: NotificationActionsTypes.ADD
    payload: Omit<notificationInterface, 'id'>
}

interface DeleteNotificationAction {
    type: NotificationActionsTypes.DELETE
    payload: notificationInterface
}

export type NotificationActions = AddNotificationAction | DeleteNotificationAction
