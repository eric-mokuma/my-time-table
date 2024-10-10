import { useAuth0 } from '@auth0/auth0-react'

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated || !user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="profile-info">
        <img src={user.picture} alt="Profile" className="profile-picture" />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {user.email_verified && <p>Email verified: Yes</p>}
        <p>
          Last updated:{' '}
          {user.updated_at
            ? new Date(user.updated_at).toLocaleDateString()
            : 'N/A'}
        </p>
      </div>
    </div>
  )
}
