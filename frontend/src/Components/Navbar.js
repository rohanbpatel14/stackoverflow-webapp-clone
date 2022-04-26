import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div>
      <nav className='navbar'>
        {/* Logo */}
        <Link className='navbar-link' to="/">
          <img className="navbar-logo" src={'./logostackoverflow.png'} alt="stackoverflow" />
        </Link>
        {/* Searchbar */}
        {/* UserSection */}
      </nav>
    </div>
  )
}

export default Navbar