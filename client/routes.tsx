import { createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import MainPage from './pages/MainPage.tsx'
import UserDashboard from './pages/UserDashboard.tsx'
import LoginPage from './pages/LoginPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import { AuthProvider, useAuth } from './components/AuthenAndAuthori.tsx'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default (
  <AuthProvider>
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />

      {/* Protected routes */}
      <Route
        path="user/profile"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="settings"
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />
    </Route>
  </AuthProvider>
)
