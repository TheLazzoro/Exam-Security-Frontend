import React from 'react'
import { Link } from 'react-router-dom'
import './TopBar.css'
import logo from '/src/assets/react.svg'

const TopBar = () => {
  return (
    <div className='top-bar'>
      <a className='left'>
        <Link to='/'>Home</Link>
      </a>
      <a className='right'>
        <Link to='/Login'>Login</Link>
      </a>
    </div>
  )
}

export default TopBar