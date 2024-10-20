
import { Link } from 'react-router-dom'
import '../../styles/main.css'

export default function NavBar ()  {
  return (
    <nav className="navbar">
      <h1>Task Manager</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/tasks">Task List</Link>
        </li>
        <li>
          <Link to="/tasks/add">Add Task</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  )
}


