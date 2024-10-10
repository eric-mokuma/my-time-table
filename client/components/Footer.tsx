import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer className="heading-4 min-h-[10svh] bg-gradient-to-b from-brightTeal to-lightTeal px-20 py-5 pl-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img
              src="/images/iconLogo.png"
              className="mr-5 h-12 w-12"
              alt="Donate Mate logo"
            />
          </div>
          <div>
            <div>
              <p>About</p>
            </div>
            <div>
              <p>GitHub</p>
            </div>
            <div>
              <Link to="/org/signup">
                <p>Sign Up</p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
