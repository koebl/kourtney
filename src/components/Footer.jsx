import React from 'react'

function Footer({ profile }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer