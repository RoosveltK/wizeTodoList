import {TaskIcon, UserIcon} from "./utils.tsx";
import Task from "./pages/Task.tsx";
import User from "./pages/User.tsx";

export const routes = [
    {
        path: '/task',
        name: "Tâche",
        icon: <TaskIcon/>,
        element: <Task/>
    },
    {
        path: '/user',
        name: "Personne",
        icon: <UserIcon/>,
        element: <User/>
    }
]