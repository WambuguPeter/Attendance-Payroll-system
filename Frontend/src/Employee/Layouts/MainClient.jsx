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
            <Route path='/*' element={<EmpDashboard />} />
            <Route path='/EmpAttendance' element={<EmpAttendance/>} />
            <Route path='/EmpPayroll' element={<EmpPayroll/>} />
            <Route path='/E-profile' element={<Profile />} />
            <Route path='/E-setting' element={<Setting />} />
          </Routes>

        </div>
      

      </div>
    </div>
  )
}

export default MainClient