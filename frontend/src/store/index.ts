import { combineReducers, createStore } from 'redux'
import { notificationReducer } from './reducers/notificationReducer'
import { notificationInterface } from './types/notification'
import { composeWithDevTools } from '@redux-devtools/extension'

const rootReducer = combineReducers({
    notification: notificationReducer
})

export const store = createStore(rootReducer, composeWithDevTools())

export interface RootState {
    notification: notificationInterface[]
}
