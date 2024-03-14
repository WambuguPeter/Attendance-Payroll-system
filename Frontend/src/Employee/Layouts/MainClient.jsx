import './MainClient.scss'
import { Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Sidebar from './EmpSidebar';
import EmpDashboard from './EmpDashboard';
import  EmpAttendance from '../Pages/EmpAttendance';
import EmpPayroll from '../Pages/EmpPayroll';
import Profile from '../Pages/EmpProfile'
import Setting from '../Pages/EmpSettings'


const MainClient = () => {
  return (
    <div className='mainClientPage'>
      <div className="navbar">
      <Navbar />
      </div>
      <div className="main">
        <div className="sidebar"><Sidebar /></div>
        <div className="content">
        {/* <EmpDashboard /> */}
          <Routes>
            <Route path='/MainClient/E-Dashboard' element={<EmpDashboard />} />
            <Route path='/MainClient/E-Attendance' element={<EmpAttendance/>} />
            <Route path='/MainClient/E-Payroll' element={<EmpPayroll/>} />
            <Route path='/MainClient/E-profile' element={<Profile />} />
            <Route path='/MainClient/E-setting' element={<Setting />} />
          </Routes>

        </div>
      

      </div>
    </div>
  )
}

export default MainClient