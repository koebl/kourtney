// Utility to load YAML files in development
// In production, these will be converted to JSON during build

import yaml from 'js-yaml'

export async function loadYAML(filePath) {
  try {
    const response = await fetch(filePath)
    const text = await response.text()
    return yaml.load(text)
  } catch (error) {
    console.error(`Error loading YAML file ${filePath}:`, error)
    return null
  }
}

// Pre-load all data files
export async function loadAllData() {
  const [publications, media, courses, profile] = await Promise.all([
    loadYAML('/data/publications.yaml'),
    loadYAML('/data/media.yaml'),
    loadYAML('/data/courses.yaml'),
    loadYAML('/data/profile.yaml')
  ])

  return {
    publications,
    media,
    courses,
    profile
  }
}