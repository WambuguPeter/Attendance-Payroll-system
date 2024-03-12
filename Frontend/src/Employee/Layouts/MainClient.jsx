import './MainClient.scss'
import { Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';
import Attendance from '../Pages/Attendance';
import Payroll from '../Pages/Payroll';
import Profile from '../Pages/Profile'
import Setting from '../Pages/Settings'


const MainClient = () => {
  return (
    <div className='mainClientPage'>
      <div className="navbar">
      <Navbar />
      </div>
      <div className="main">
        <div className="sidebar"><Sidebar /></div>
        <div className="content">
        <Content />
          <Routes>
            <Route path='/E-Dashboard' element={<Content />} />
            <Route path='/E-Attendance' element={<Attendance/>} />
            <Route path='/E-Payroll' element={<Payroll/>} />
            <Route path='/E-profile' element={<Profile />} />
            <Route path='/E-setting' element={<Setting />} />
          </Routes>

        </div>
      

      </div>
    </div>
  )
}

export default MainClient