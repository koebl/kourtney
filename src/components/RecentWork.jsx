import React from 'react'
import PublicationItem from './PublicationItem'
import profileData from '@data/profile.yaml'

function RecentWork({ publications }) {
  return (
    <section className="recent-work">
      <h2>Recent Work</h2>
      <div className="publication-list">
        {publications.map(pub => (
          <PublicationItem 
            key={pub.shortname} 
            publication={pub}
            coauthors={profileData.coauthors}
            compact={true}
          />
        ))}
      </div>
    </section>
  )
}

export default RecentWork