import React from 'react'
import SocialLinks from './SocialLinks'

function Profile({ profile, degrees, social }) {
  return (
    <div className="profile-section">
      <div className="profile-content">
        <div className="profile-image">
          <img src="/img/profile.jpg" alt={profile.name} />
        </div>
        
        <div className="profile-info">
          <h1>{profile.name}</h1>
          <h2>{profile.position}</h2>
          <p className="affiliation">
            {profile.department}<br />
            {profile.university}
          </p>
          
          <div className="contact-info">
            <p className="address">
              {profile.street}<br />
              {profile.address}
            </p>
            
            <div className="emails">
              <a href={`mailto:${profile.email}@${profile.email_domain}`}>
                {profile.email}@{profile.email_domain}
              </a>
              {profile.email_alt && (
                <>
                  <br />
                  <a href={`mailto:${profile.email_alt}@${profile.email_altdomain}`}>
                    {profile.email_alt}@{profile.email_altdomain}
                  </a>
                </>
              )}
            </div>
          </div>

          {degrees && degrees.length > 0 && (
            <div className="degrees">
              <h3>Education</h3>
              <ul>
                {degrees.map((degree, index) => (
                  <li key={index}>
                    <strong>{degree.postnomial}</strong> {degree.subject}, {degree.university} ({degree.date})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <SocialLinks social={social} />
        </div>
      </div>
    </div>
  )
}

export default Profile