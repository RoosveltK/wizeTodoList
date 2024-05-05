import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import {routes} from "./routes.tsx";
import Error from "./pages/Error.tsx";
import './i18n.ts'



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            ...routes
        ],
        errorElement: <Error/>,
    },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
