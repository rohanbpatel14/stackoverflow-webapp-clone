import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Sidebar></Sidebar>
      </div>
    </div>
  )
}

export default Home