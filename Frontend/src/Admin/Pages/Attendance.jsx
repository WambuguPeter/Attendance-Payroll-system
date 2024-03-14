import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './Attendance.scss'

const Attendance = () => {
  const attendanceList = [
  { id: 1, name: 'John Doe', timeIn: '9:00 AM', timeOut: '5:00 PM', overtime: 1, totalHours: 8 },
  { id: 2, name: 'Jane Smith', timeIn: '8:00 AM', timeOut: '5:00 PM', overtime: 1, totalHours: 9 },
  { id: 3, name: 'Michael Johnson', timeIn: '10:00 AM', timeOut: '6:00 PM', overtime: 1, totalHours: 6 },
  { id: 4, name: 'Emily Brown', timeIn: '9:30 AM ', timeOut: '6:00 PM', overtime: 1, totalHours: 7 },
  { id: 5, name: 'Daniel Wilson', timeIn: '10:00 AM', timeOut: '8:00 PM', overtime: 1, totalHours: 8 },
  { id: 6, name: 'Olivia Martinez', timeIn: '9:30 AM ', timeOut: '6:00 PM', overtime: 1, totalHours: 9 },
];

  return (
    <div>
       <div className="header1">
        <h1>Attendance.</h1>
        {/* <div className="generate">
          <span>Generate</span>
        </div> */}
      </div>
      <div className="attendanceList">
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Name</th>
              <th>Time in</th>
              <th>Time in</th>
              <th>Total Hours</th>
              <th>Overtime</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map(attendanceListItem => (
              <tr className="details" key={attendanceListItem.id} >
                <td >{attendanceListItem.id}</td>
                <td >{attendanceListItem.name}</td>
                <td >{attendanceListItem.timeIn}</td>
                <td >{attendanceListItem.timeOut}</td>
                <td >{attendanceListItem.overtime}</td>                
                <td>{attendanceListItem.totalHours}</td>
                <td>
                  <div className="action-icons">
                    {/* <FaEye className="icon1" /> */}
                    <FaEdit  className="icon2" />
                    <FaTrash className="icon3" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  )
}

export default Attendance