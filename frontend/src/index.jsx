import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import axios from 'axios'

import Header from './components/Header'
import Home from './pages/Home'
import Signup from './pages/Auth/signup'
import Login from './pages/Auth/login'
import Auth from './components/Auth'

axios.defaults.baseURL = 'http://192.168.1.44:3000/api'

const StyledApp = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: Roboto;
    }

    p {
        margin: 0;
    }
`

function App() {
    return (
        <BrowserRouter>
            <StyledApp />
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Auth Component={Home} />}
                />
                <Route
                    path="/signup"
                    element={<Signup />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
