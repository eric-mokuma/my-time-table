import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

export default function NavLogin() {
  const { user, logout, loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/user/profile">
            <div>
              <img src={user?.picture} alt="User Profile" />
              <p>Welcome {user?.given_name}!</p>
            </div>
          </Link>
          <button onClick={() => logout()}>Log out</button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </>
  )
}
