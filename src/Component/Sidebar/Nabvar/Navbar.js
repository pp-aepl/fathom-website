import React, { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import SidebarRoutes from "./sidebar_new";


function Navbar() {
  const [state, setState] = useState({});

  const handleClick = (e, item) => {
    e.stopPropagation();
    setState((state) => ({
      ...state,
      [item]: !state[item],
    }));
  };


var element = document.getElementsByClassName("nav li:nth-child(2) span.open");
element.classList.add("open");

element.classList.remove("close");
 

  const handler = (children) => {
    return children.map((child, i) => {
      console.log(child,'child==>21')
      const category = !child.category ? null : (
        <div className="nav-item category">{child.category}</div>
      );
      if (!child.children) {
        return (
          <>
            {category}
            <li onClick={(e) => handleClick(e, child.name)} key={i}>
              <a className="nav-link" href={child.url}>
                <div className="icon">{child.icon ? child.icon : ""}</div>
                <span>{child.name}</span>
              </a>
            </li>
          </>
        );
      }
      return (
        <>
          {category}
          <li onClick={(e) => handleClick(e, child.name)} key={i}>
            <div className="nav-link">
              <div className="icon"></div>
              <span>{child.name}</span>
            </div>
            <ul className={`nav-submenu ${state[child.name] ? "open" : ""}`}>
              {handler(child.children)}
            </ul>
          </li>
        </>
      );
    });
  };

  return (
    <div id="app">
        <div className="sidebar">
        <div className="App">
        <div className="main-wrapper">
          <aside className="sidebar">
            <div className="sidebar-header" />    
            <ul className="nav">{handler(SidebarRoutes)}</ul>
          </aside>
          <main className="content" />
          
        </div>
      </div>
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