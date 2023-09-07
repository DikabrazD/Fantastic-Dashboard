import { combineReducers, createStore, applyMiddleware } from 'redux'
import { notificationReducer } from './reducers/notificationReducer'
import { teacherReducer } from './reducers/teacherReducer'
import { notificationInterface } from './types/notification'
import { teacherInterface } from './types/teacher'
import { composeWithDevTools } from '@redux-devtools/extension'

import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    notification: notificationReducer,
    teachers: teacherReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export interface RootState {
    notification: notificationInterface[]
    teachers: teacherInterface[]
}
