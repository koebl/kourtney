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
            I am an Assistant Professor at the Centre for Industrial Relations and Human Resources at the University of Toronto.
I am a labour economist and industrial relations scholar with research interests in poverty, gender equality, human capital development and the intersection of tax, social and labour market policies. The bulk of my research uses causal identification strategies to understand how public policies and adverse economic shocks impact the labour market decisions of low-wage workers and mothers, as well as the health and educational outcomes of children. My research has also explored the concept of a guaranteed basic income (GBI) and its potential to reduce poverty and improve economic security in Canada. As an industrial relations scholar, I am particularly interested in low-wage workers, who often lack union representation and therefore have the least bargaining power in the labour market. I am also interested in gender equality in employment outcomes, especially among mothers given the unique challenges they face in balancing child care responsibilities with formal employment.
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
