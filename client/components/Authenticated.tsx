import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'

const useIsAuthenticated = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const [authState, setAuthState] = useState<boolean | null>(null)

  useEffect(() => {
    if (!isLoading) {
      setAuthState(isAuthenticated)
    }
  }, [isAuthenticated, isLoading])

  return authState
}

interface Props {
  children: React.ReactNode
}

export function IfAuthenticated({ children }: Props) {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated === null) return null
  return isAuthenticated ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }: Props) {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated === null) return null
  return !isAuthenticated ? <>{children}</> : null
}
