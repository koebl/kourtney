import React, { useState } from 'react'
import mediaData from '@data/media.yaml'
import profileData from '@data/profile.yaml'

function Media() {
  const { media } = mediaData
  const { mediaCategories } = profileData
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Filter media
  const filteredMedia = selectedCategory === 'all' 
    ? media 
    : media.filter(item => item.medium === selectedCategory)

  // Group by category
  const groupedMedia = filteredMedia.reduce((groups, item) => {
    if (!groups[item.medium]) {
      groups[item.medium] = []
    }
    groups[item.medium].push(item)
    return groups
  }, {})

  // Sort media within each group by date (newest first)
  Object.keys(groupedMedia).forEach(medium => {
    groupedMedia[medium].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  return (
    <div className="media">
      <div className="hero-section">
        <img 
          src="/img/headpic/media.jpg" 
          alt="Media" 
          className="hero-image"
        />
      </div>

      <div className="container">
        <h1>Media</h1>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category-filter">Filter by Category:</label>
            <select 
              id="category-filter"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {mediaCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="media-groups">
          {mediaCategories.map(category => {
            const items = groupedMedia[category]
            if (!items || items.length === 0) return null

            return (
              <section key={category} className="media-category">
                <h2>{category}</h2>
                <div className="media-list">
                  {items.map((item, index) => (
                    <article key={index} className="media-item">
                      <h3>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {item.title}
                        </a>
                      </h3>
                      <div className="media-meta">
                        {item.authors && (
                          <span className="authors">{item.authors}</span>
                        )}
                        <span className="publication">{item.publication}</span>
                        <span className="date">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Media