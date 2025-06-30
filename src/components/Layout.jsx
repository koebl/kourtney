import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import profileData from '@data/profile.yaml'

function Layout({ children }) {
  return (
    <div className="layout">
      <Navigation navigation={profileData.navigation} />
      <main className="main-content">
        {children}
      </main>
      <Footer profile={profileData.profile} />
    </div>
  )
}

export default Layout