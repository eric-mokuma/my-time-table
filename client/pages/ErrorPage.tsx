import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export interface ErrorPageProps {
  code?: number
  message?: string
}

export default function ErrorPage({
  code = 404,
  message = 'Page not found',
}: {
  code?: number
  message?: string
}): React.ReactElement {
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
