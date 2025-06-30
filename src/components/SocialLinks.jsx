import React from 'react'

function SocialLinks({ social }) {
  const getIconClass = (name) => {
    const iconMap = {
      'cv': 'fas fa-file-alt',
      'linkedin': 'fab fa-linkedin',
      'ideas-repec': 'fas fa-chart-line',
      'google-scholar': 'fas fa-graduation-cap',
      'academia': 'fas fa-university',
      'orcid': 'fab fa-orcid',
      'researchgate': 'fab fa-researchgate'
    }
    return iconMap[name] || 'fas fa-link'
  }

  return (
    <div className="social-links">
      {social.map((link, index) => (
        <a
          key={index}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-link ${link.square ? 'square' : ''}`}
          title={link.name}
        >
          <i className={getIconClass(link.name)}></i>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks