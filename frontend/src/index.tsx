import { BrowserRouter } from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './assets/styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
)