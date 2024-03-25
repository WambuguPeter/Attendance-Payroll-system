import React from 'react'
import { FaTrash } from 'react-icons/fa';
import AttendList from '../Components/AttendList';
import AttendanceList from '../Components/AttendList';
import "./EmpAttendance.scss"

const EmpAttendance = () => {


  return (
    <div className='empAttendance'>
       <div className="header1">
        <h1>Attendance.</h1>
       
      </div>
      <div className="attendanceList">
        <AttendanceList />
    
      </div>

      
    </div>
  )
}

export default EmpAttendance