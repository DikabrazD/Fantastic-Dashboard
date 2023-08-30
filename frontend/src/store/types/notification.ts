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
