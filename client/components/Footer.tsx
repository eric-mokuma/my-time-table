import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer>
        <div>
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
