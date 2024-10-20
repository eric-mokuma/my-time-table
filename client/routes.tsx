import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TaskListPage from './pages/TaskListPage'
import EditTaskPage from './pages/EditTaskPage'
import AddTaskPage from './pages/AddTaskPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: 'tasks', element: <TaskListPage /> }, 
      { path: 'tasks/edit/:id', element: <EditTaskPage /> }, 
      { path: 'tasks/add', element: <AddTaskPage /> }, 
    ],
  },
])

export default router
