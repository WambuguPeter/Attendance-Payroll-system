import React from 'react'
import './MainContainer.scss'
import { Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AdminDashboard from '../Pages/AdminDashboard';
import Employee from '../Pages/Employee';
import Schedule from '../Pages/Schedule'
import Attendance from '../Pages/Attendance'
import Overtime from '../Pages/Overtime'
import Payroll from '../Pages/Payroll'
import Setting from '../Pages/Setting'
import Profile from '../Pages/Profile'

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
          <AdminDashboard />
          <Routes>
            <Route path='/Dashboard' element={<AdminDashboard />} />
            <Route path='/Employees' element={<Employee/>} />
            <Route path='/Schedule' element={<Schedule/>} />
            <Route path='/Attendance' element={<Attendance/>} />
            <Route path='/Overtime' element={<Overtime/>} />
            <Route path='/Payroll' element={<Payroll/>} />
            <Route path='/Setting' element={<Setting/>} />
            <Route path='/profile' element={<Profile/>} />
          </Routes>

        </div>

      </div>
    </div>
  )
}

export default MainContainer