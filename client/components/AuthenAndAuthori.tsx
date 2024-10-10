import React, { createContext, useState, useContext, useEffect } from 'react'

interface User {
  id: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isAuthorized: (requiredRole: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // This is a mock login function. Replace with actual API call.
    try {
      console.log(
        `Attempting login with email: ${email} and password: ${password}`,
      )
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user object
      const loggedInUser: User = {
        id: '1',
        email: email,
        role: 'user', // You might get this from your API
      }

      setUser(loggedInUser)
      localStorage.setItem('user', JSON.stringify(loggedInUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const isAuthenticated = !!user

  const isAuthorized = (requiredRole: string) => {
    return user?.role === requiredRole
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAuthorized }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
