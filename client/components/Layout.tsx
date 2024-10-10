import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
