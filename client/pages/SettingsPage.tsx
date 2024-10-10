import React, { useState } from 'react'

export default function SettingsPage() {
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [theme, setTheme] = useState('light')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Settings updated:', { email, password, notifications, theme })
  }

  return (
    <div className="settings-page">
      <h1>User Settings</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <h2>Account Settings</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
        </section>

        <section>
          <h2>Preferences</h2>
          <div>
            <label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              Receive email notifications
            </label>
          </div>
          <div>
            <label htmlFor="theme">Theme:</label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </section>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}
