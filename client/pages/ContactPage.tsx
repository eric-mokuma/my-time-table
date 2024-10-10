import React, { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>
        We would love to hear from you. Please fill out the form below to get in
        touch.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <h2>Other Ways to Reach Us</h2>
        <p>Email: mokumaeric@gmail.com</p>
        <p>Phone: (28) 85 144 2208</p>
        <p>Address: 107 Bedford street, Cannons Creek, Porirua, Wellington</p>
      </div>
    </div>
  )
}
