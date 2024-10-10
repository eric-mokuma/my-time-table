import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom'
import Layout from './components/Layout.tsx'
import MainPage from './pages/MainPage.tsx'
import UserDashboard from './pages/UserDashboard.tsx'
import LoginPage from './pages/LoginPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import SettingsPage from './pages/SettingsPage.tsx'
import { useAuth } from './components/AuthenAndAuthori.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const routeElements = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<MainPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="profile" element={<ProfilePage />} />

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
  </Route>,
)

const router = createBrowserRouter(routeElements)

export default router
