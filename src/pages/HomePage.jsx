import React from 'react'
import HeroSection from '../components/HomePage/HeroSection'
import AboutUs from '../components/HomePage/AboutUs'
import StatSection from '../components/HomePage/StatSection'
import TopScholarships from '../components/HomePage/TopScholarships'

function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <TopScholarships />
      <StatSection />
    </div>
  )
}

export default HomePage