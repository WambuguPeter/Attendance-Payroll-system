import React from 'react'
import './MainContainer.scss'
import { Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';
import Employee from '../Pages/Employee';
import Schedule from '../Pages/Schedule'
import Attendance from '../Pages/Attendance'
import Overtime from '../Pages/Overtime'
import Payroll from '../Pages/Payroll'

const MainContainer = () => {
  return (
    <div className='mainContainerPage'>
      <div className="navbar">
      <Navbar />
      </div>
      <div className="main">
        <div className="sidebar">
          <Sidebar />
          </div>
        <div className="content">
          <Routes>
            <Route path='/Dashboard' element={<Content />} />
            <Route path='/Employees' element={<Employee/>} />
            <Route path='/Schedule' element={<Schedule/>} />
            <Route path='/Attendance' element={<Attendance/>} />
            <Route path='/Overtime' element={<Overtime/>} />
            <Route path='/Payroll' element={<Payroll/>} />
          </Routes>

        </div>

      </div>
    </div>
  )
}

export default MainContainer