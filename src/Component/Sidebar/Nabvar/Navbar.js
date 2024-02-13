import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function Navbar() {
  return (
    <div id="app">
        {/* <div className="mainHeaders">
        <Sidebar />
        </div> */}
        <header className="mainHeader">
          <Header />
        </header>
        <div id="main">
          <Outlet />
        </div>
        <div id="main">
          {/* <Footer /> */}
        </div>
      </div>
  
  )
}

export default Navbar