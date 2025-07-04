import React from 'react'
import coursesData from '@data/courses.yaml'
import profileData from '@data/profile.yaml'

function Teaching() {
  const { courses, guestLectures } = coursesData
  const { courseTypes } = profileData

  // Group courses by type
  const groupedCourses = courses.reduce((groups, course) => {
    if (!groups[course.type]) {
      groups[course.type] = []
    }
    groups[course.type].push(course)
    return groups
  }, {})

  // Sort courses within each group by date (newest first)
  Object.keys(groupedCourses).forEach(type => {
    groupedCourses[type].sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  return (
    <div className="teaching">
      <div className="hero-section">
        <img 
          src="/img/headpic/teaching.jpg" 
          alt="Teaching" 
          className="hero-image"
        />
      </div>

      <div className="container">
        <h1>Teaching</h1>

        <div className="course-groups">
          {courseTypes.map(typeConfig => {
            const coursesOfType = groupedCourses[typeConfig.type]
            if (!coursesOfType || coursesOfType.length === 0) return null

            // Filter by institution if specified
            let filteredCourses = coursesOfType
            if (typeConfig.include) {
              filteredCourses = coursesOfType.filter(course =>
                typeConfig.include.some(inc => 
                  course.institution.includes(inc.institution)
                )
              )
            }

            if (filteredCourses.length === 0) return null

            return (
              <section key={typeConfig.type} className="course-type">
                <h2>{typeConfig.type}</h2>
                <div className="course-list">
                  {filteredCourses.map((course, index) => (
                    <div key={index} className="course-item">
                      <h3>{course.title}</h3>
                      <div className="course-details">
                        <span className="institution">{course.institution}</span>
                        <span className="year">{course.year}</span>
                      </div>
                      {course.evaluations && (
                        <a 
                          href={course.evaluations} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="evaluations-link"
                        >
                          View Teaching Evaluations
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {guestLectures && guestLectures.length > 0 && (
          <section className="guest-lectures">
            <h2>Guest Lectures</h2>
            <div className="lecture-list">
              {guestLectures.map((lecture, index) => (
                <div key={index} className="lecture-item">
                  <h3>{lecture.title}</h3>
                  <span className="date">
                    {new Date(lecture.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Teaching