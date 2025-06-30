import React, { useState } from 'react'

function PublicationItem({ publication, coauthors, compact = false }) {
  const [showAbstract, setShowAbstract] = useState(false)
  const formatAuthorsAPA = () => {
    if (!publication.coauthors || publication.coauthors.length === 0) {
      return null
    }

    const authorList = publication.coauthors.map((coauthor, index) => {
      // Handle both string and object coauthors
      const coauthorName = typeof coauthor === 'string' ? coauthor : coauthor.name
      const coauthorId = typeof coauthor === 'object' ? coauthor.id : null
      
      const authorInfo = coauthors.find(a => 
        a.name === coauthorName || 
        (coauthorId && a.id === coauthorId)
      )
      
      let displayName
      if (authorInfo) {
        // Format as "Last, F." for APA
        displayName = authorInfo.first ? `${authorInfo.name}, ${authorInfo.first}` : authorInfo.name
      } else {
        displayName = coauthorName
      }
      
      // Check if this author has a link
      const hasLink = authorInfo && authorInfo.link
      
      if (hasLink) {
        return (
          <a 
            key={coauthorName} 
            href={authorInfo.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {displayName}
          </a>
        )
      }
      
      return <span key={coauthorName}>{displayName}</span>
    })

    return (
      <span className="authors">
        {authorList.reduce((prev, curr, i) => {
          if (i === 0) return [curr]
          if (i === authorList.length - 1 && authorList.length > 1) {
            return [...prev, ', & ', curr]
          }
          return [...prev, ', ', curr]
        }, [])}
      </span>
    )
  }

  const formatCitationAPA = () => {
    const year = new Date(publication.date).getFullYear()
    
    // Format based on publication type
    if (publication.type === 'Journal Article') {
      // Journal: Title. Journal Name, volume(issue), pages.
      return (
        <>
          ({year}). {publication.title.trim()}. <em>{publication.journal}</em>
          {publication.issue && `, ${publication.issue}`}
          {publication.pages && `, ${publication.pages}`}.
        </>
      )
    } else if (publication.type === 'Book Chapter') {
      // Book Chapter: Title. In Editor (Ed.), Book title (pp. pages). Publisher.
      return (
        <>
          ({year}). {publication.title.trim()}
          {publication.volume && (
            <>
              . In {publication.editors && <>{publication.editors} (Eds.), </>}
              <em>{publication.volume}</em>
            </>
          )}
          {publication.pages && <> (pp. {publication.pages})</>}
          {publication.publisher && <>. {publication.publisher}</>}
          {publication.city && <>, {publication.city}</>}.
        </>
      )
    } else if (publication.type === 'Working Paper') {
      // Working Paper: Title. Journal/Series Name.
      return (
        <>
          ({year}). {publication.title.trim()}
          {publication.journal && <>. <em>{publication.journal}</em></>}
          {publication.issue && <>, {publication.issue}</>}.
        </>
      )
    } else {
      // Other Publication: Title. Journal Name, issue.
      return (
        <>
          ({year}). {publication.title.trim()}
          {publication.journal && <>. <em>{publication.journal}</em></>}
          {publication.issue && <>, {publication.issue}</>}
          {publication.pages && <>, {publication.pages}</>}.
        </>
      )
    }
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
        <span className="apa-citation">
          {formatAuthorsAPA()} {formatCitationAPA()}
        </span>
      </div>

      {!compact && publication.abstract && (
        <>
          <button 
            className="abstract-toggle"
            onClick={() => setShowAbstract(!showAbstract)}
            aria-expanded={showAbstract}
          >
            {showAbstract ? '− Hide Abstract' : '+ Show Abstract'}
          </button>
          {showAbstract && (
            <p className="abstract">{publication.abstract}</p>
          )}
        </>
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