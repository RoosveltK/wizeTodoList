import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n.ts'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Task from "./pages/Task.tsx";
import User from "./pages/User.tsx";




ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App/>}>
                    <Route path="task" element={<Task/>}/>
                    <Route path="user" element={<User />}/>
                </Route>
                <Route path="/" element={<Navigate to={'/task'} replace/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
