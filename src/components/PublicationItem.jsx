import React from 'react'

function PublicationItem({ publication, coauthors, compact = false }) {
  const formatAuthors = () => {
    if (!publication.coauthors || publication.coauthors.length === 0) {
      return null
    }

    const authorList = publication.coauthors.map(coauthor => {
      const authorInfo = coauthors.find(a => 
        a.name === coauthor.name || 
        (coauthor.id && a.id === coauthor.id)
      )
      
      if (authorInfo) {
        const displayName = authorInfo.first ? `${authorInfo.first} ${authorInfo.name}` : authorInfo.name
        
        if (authorInfo.link) {
          return (
            <a 
              key={coauthor.name} 
              href={authorInfo.link} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {displayName}
            </a>
          )
        }
        
        return <span key={coauthor.name}>{displayName}</span>
      }
      
      return <span key={coauthor.name}>{coauthor.name}</span>
    })

    return (
      <span className="authors">
        with {authorList.reduce((prev, curr, i) => {
          if (i === 0) return [curr]
          if (i === authorList.length - 1) return [...prev, ' & ', curr]
          return [...prev, ', ', curr]
        }, [])}
      </span>
    )
  }

  const formatCitation = () => {
    const parts = []
    
    if (publication.journal) {
      parts.push(<em key="journal">{publication.journal}</em>)
    }
    
    if (publication.volume) {
      parts.push(<span key="volume">in <em>{publication.volume}</em></span>)
    }
    
    if (publication.editors) {
      parts.push(<span key="editors">eds. {publication.editors}</span>)
    }
    
    if (publication.issue) {
      parts.push(<span key="issue">{publication.issue}</span>)
    }
    
    if (publication.pages) {
      parts.push(<span key="pages">{publication.pages}</span>)
    }
    
    if (publication.publisher) {
      parts.push(<span key="publisher">{publication.publisher}</span>)
    }
    
    if (publication.city) {
      parts.push(<span key="city">{publication.city}</span>)
    }
    
    return parts.reduce((prev, curr, i) => {
      if (i === 0) return [curr]
      return [...prev, ', ', curr]
    }, [])
  }

  return (
    <article className={`publication-item ${compact ? 'compact' : ''}`}>
      <h3 className="publication-title">
        {publication.document ? (
          <a href={publication.document} target="_blank" rel="noopener noreferrer">
            {publication.title}
          </a>
        ) : (
          publication.title
        )}
      </h3>
      
      <div className="publication-meta">
        {formatAuthors()}
        {formatAuthors() && formatCitation().length > 0 && <span className="separator"> • </span>}
        <span className="citation">{formatCitation()}</span>
        {formatCitation().length > 0 && <span className="separator"> • </span>}
        <span className="year">{new Date(publication.date).getFullYear()}</span>
      </div>

      {!compact && publication.abstract && (
        <p className="abstract">{publication.abstract}</p>
      )}

      {!compact && publication.links && publication.links.length > 0 && (
        <div className="publication-links">
          {publication.links.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="publication-link"
            >
              {link.title}
              {link.listing && <span className="listing"> ({link.listing})</span>}
            </a>
          ))}
        </div>
      )}

      {publication.doi && (
        <div className="doi">
          DOI: <a 
            href={`https://doi.org/${publication.doi}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {publication.doi}
          </a>
        </div>
      )}
    </article>
  )
}

export default PublicationItem