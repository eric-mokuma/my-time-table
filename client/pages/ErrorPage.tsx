import React from 'react'
import { useLocation, Link } from 'react-router-dom'

interface ErrorPageProps {
  code?: number
  message?: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = 404,
  message = 'Page not found',
}) => {
  const location = useLocation()

  return (
    <div>
      <h1>Error {code}</h1>
      <p>{message}</p>
      <p>
        The requested URL <code>{location.pathname}</code> was not found.
      </p>
      <div>
        <Link to="/">Go to Homepage</Link>
      </div>
    </div>
  )
}

export default ErrorPage
