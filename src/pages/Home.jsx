import React from 'react'
import profileData from '@data/profile.yaml'
import publicationsData from '@data/publications.yaml'
import Profile from '../components/Profile'
import RecentWork from '../components/RecentWork'

function Home() {
  const { profile, degrees, social, settings } = profileData
  
  // Filter recent publications based on date
  const recentPublications = publicationsData.publications
    .filter(pub => new Date(pub.date) >= new Date(settings.recent_work_date))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="home">
      <div className="hero-section">
        <img 
          src="/img/headpic/home.jpg" 
          alt="Academic background" 
          className="hero-image"
        />
      </div>
      
      <div className="container">
        <Profile 
          profile={profile} 
          degrees={degrees} 
          social={social} 
        />
        
        <section className="bio-section">
          <h2>About</h2>
          <p>
            I am a Postdoctoral Fellow at the Stone Centre for the Study of Wealth Inequality 
            at INSEAD. My research focuses on public policy, labour economics, and social policy, 
            with particular emphasis on basic income, gender equality, and the impacts of 
            COVID-19 on employment and mental health.
          </p>
        </section>

        {recentPublications.length > 0 && (
          <RecentWork publications={recentPublications} />
        )}
      </div>
    </div>
  )
}

export default Home