import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const App = () => {
    const location = useLocation();

    useEffect(() => {
        // Fires every time a route change happens.
        
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