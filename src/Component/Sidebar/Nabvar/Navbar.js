import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

function Navbar() {
  return (
    <div id="app">
        <div className="sidebar">
        <Sidebar />
        </div>
        {/* <header className="mainHeader">
          <Header />
        </header> */}
        <div id="main">
        {/* <Header /> */}
          <Outlet />
        </div>
      
      </div>
  
  )
}

export default Navbar