import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Publications from './pages/Publications'
import Teaching from './pages/Teaching'
import Media from './pages/Media'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </Layout>
  )
}

export default App