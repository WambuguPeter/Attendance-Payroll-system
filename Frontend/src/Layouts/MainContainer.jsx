import React from 'react'
import './MainContainer.scss'

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';

const MainContainer = () => {
  return (
    <div className='mainContainerPage'>
      <div className="navbar">
      <Navbar />
      </div>
      <div className="main">
        <div className="sidebar"><Sidebar /></div>
        <div className="content"><Content /></div>
      

      </div>
    </div>
  )
}

export default MainContainer