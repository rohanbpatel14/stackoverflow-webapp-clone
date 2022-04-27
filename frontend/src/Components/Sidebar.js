import React from 'react'
import './Sidebar.css'

function Sidebar() {
  return (
    <div className='sidebar-container'>
      <div className='sidebar-tabs'>
          <div>Home</div>
          <div className='sidebar-tabs_public'>
            PUBLIC
            <br></br>
            <br></br>
              <div>Tags</div>
              <div>Users</div>
              <div>Companies</div>
          </div>
          <div>Collectives</div>
          <div>TEAMS</div>
      </div>
    </div>
  )
}

export default Sidebar