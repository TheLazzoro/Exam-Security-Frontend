import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import facade from '../../facades/userFacade'
import './TopBar.css'
import logo from '/src/assets/react.svg'

const TopBar = () => {
  const [usernameDisplay, setUsernameDisplay] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Fires every time a route change happens.

    if (facade.getToken() != null) {
      const username = facade.getName();
      if (!username) {
        setUsernameDisplay("");
      }
      else {
        setUsernameDisplay(username);
      }
    }
  }, [location]);

  const onLogout = () => {
    facade.logout();
    setUsernameDisplay("");
  }

  return (
    <div className='top-bar'>
      <a className='left'>
        <Link to='/'>Home</Link>
      </a>
      <a className='right'>
        {
          usernameDisplay == "" ?
            <Link to='/Login'>Login</Link>
            :
            <Link to='/Profile'>{usernameDisplay}</Link>
        }

      </a>
      {
        usernameDisplay == "" ? null :
          <a className='right' onClick={onLogout}>Logout</a>
      }
    </div>
  )
}

export default TopBar