import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation({ navigation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Kourtney Koebel
        </Link>
        
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navigation.map((item, index) => {
            const isExternal = item.link.startsWith('http')
            const path = item.link.replace(/\/$/, '')
            const isActive = location.pathname === path

            if (isExternal) {
              return (
                <a 
                  key={index}
                  href={item.link}
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              )
            }

            return (
              <Link
                key={index}
                to={path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation