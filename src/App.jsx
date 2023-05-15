import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import userFacade from './facades/userFacade';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Fires every time a route change happens.
    async function checkLogin() {
      await userFacade.isTokenValid().then(res => {
        if(res.status != 200) {
          userFacade.logout();
        }
      }).catch(ex => {
        userFacade.logout();
      });
      
    }
    checkLogin();
    
  }, [location]);

  return (
    <div>
      {
        /* Empty. We use this component for top-level functional convenience */
      }
    </div>
  )
}

export default App