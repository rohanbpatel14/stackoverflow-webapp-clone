import React from 'react'
import './Sidebar.css'
import { Link,useHistory } from "react-router-dom";

function Sidebar() {
  const history = useHistory();
  return (
    <div className='sidebar-container'>
      <div className='sidebar-tabs'>
          <div onClick={()=>history.push('/')}>Home</div>
          <div className='sidebar-tabs_public'>
            PUBLIC
            <br></br>
            <br></br>
              <div onClick={()=>history.push('/tags')}>Tags</div>
              <div onClick={()=>history.push('/users')}>Users</div>
              <div onClick={()=>history.push('/companies')}>Companies</div>
          </div>
          <div>Collectives</div>
          <div>TEAMS</div>
      </div>
    </div>
  )
}

export default Sidebar