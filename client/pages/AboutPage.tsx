import React from 'react'

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Our Company</h1>
      <section>
        <h2>Our Mission</h2>
        <p>At Em-multidia, we are dedicated to ... Our goal is to ...</p>
      </section>

      <section>
        <h2>Our Story</h2>
        <p>
          Founded in [year], [Company Name] began with a simple idea: [founding
          principle or story]. Since then, we have grown to [brief description
          of current company status or achievements].
        </p>
      </section>

      <section>
        <h2>Our Team</h2>
        <p>
          We are proud of our diverse and talented team of professionals who
          bring their unique skills and perspectives to our work every day.
        </p>
        {/* You can add more detailed team information or even individual team member components here */}
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>We would love to hear from you! Reach out to us at:</p>
        <ul>
          <li>Email: mokumaeric@gmail.com</li>
          <li>Phone: (28) 85 144 2208</li>
          <li>
            Address: 107 Bedford street, Cannons Creek, Porirua, Wellington
          </li>
        </ul>
      </section>
    </div>
  )
}

export default AboutPage
