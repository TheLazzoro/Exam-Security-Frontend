import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import TopBar from './components/TopBar/TopBar'
import './index.css'
import Home from './routes/Home'
import Login from './routes/Login/Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <TopBar />
        <App/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode >,
)