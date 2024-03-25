import React from 'react'
import './MainContainer.scss'
import { Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AdminDashboard from '../Pages/AdminDashboard';
import Employee from '../Pages/Employee';
import Schedule from '../Pages/Schedule'
// import Position from '../Pages/Position'
import Attendance from '../Pages/Attendance'
import Advancecash from '../Pages/AdvanceCash';
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
          {/* <AdminDashboard /> */}
          <Routes>
            <Route path='/MainContainer' element={<AdminDashboard />} />
            <Route path='/MainContainer/Employees' element={<Employee/>} />
            <Route path='/MainContainer/Schedule' element={<Schedule/>} />
            {/* <Route path='/MainContainer/Position' element={<Position/>} /> */}
            <Route path='/MainContainer/Attendance' element={<Attendance/>} />
            <Route path='/MainContainer/Advancecash' element={<Advancecash/>} />
            <Route path='/MainContainer/Overtime' element={<Overtime/>} />
            <Route path='/MainContainer/Payroll' element={<Payroll/>} />
            <Route path='/MainContainer/Setting' element={<Setting/>} />
            <Route path='/MainContainer/profile' element={<Profile/>} />
          </Routes>

        </div>

      </div>
    </div>
  )
}

export default MainContainer