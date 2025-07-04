import React, { useState } from 'react'
import publicationsData from '@data/publications.yaml'
import profileData from '@data/profile.yaml'
import PublicationItem from '../components/PublicationItem'

function Publications() {
  const { publications } = publicationsData
  const { publicationTypes } = profileData
  const [selectedType, setSelectedType] = useState('all')
  const [selectedField, setSelectedField] = useState('all')

  // Get unique fields
  const fields = [...new Set(publications.map(pub => pub.field))].sort()

  // Filter publications
  const filteredPublications = publications.filter(pub => {
    const typeMatch = selectedType === 'all' || pub.type === selectedType
    const fieldMatch = selectedField === 'all' || pub.field === selectedField
    return typeMatch && fieldMatch
  })

  // Group by type
  const groupedPublications = filteredPublications.reduce((groups, pub) => {
    if (!groups[pub.type]) {
      groups[pub.type] = []
    }
    groups[pub.type].push(pub)
    return groups
  }, {})

  // Sort publications within each group by date (newest first)
  Object.keys(groupedPublications).forEach(type => {
    groupedPublications[type].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  return (
    <div className="publications">
      <div className="hero-section">
        <img 
          src="/img/headpic/research.jpg" 
          alt="Research" 
          className="hero-image"
        />
      </div>

      <div className="container">
        <h1>Research</h1>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="type-filter">Filter by Type:</label>
            <select 
              id="type-filter"
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              {publicationTypes.map(type => (
                <option key={type.type} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="field-filter">Filter by Field:</label>
            <select 
              id="field-filter"
              value={selectedField} 
              onChange={(e) => setSelectedField(e.target.value)}
            >
              <option value="all">All Fields</option>
              {fields.map(field => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="publication-groups">
          {publicationTypes.map(typeConfig => {
            const pubs = groupedPublications[typeConfig.type]
            if (!pubs || pubs.length === 0) return null

            return (
              <section key={typeConfig.type} className="publication-type">
                <h2>{typeConfig.heading || typeConfig.type}</h2>
                <div className="publication-list">
                  {pubs.map(pub => (
                    <PublicationItem 
                      key={pub.id} 
                      publication={pub}
                      coauthors={profileData.coauthors}
                    />
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

export default Publications