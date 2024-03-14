import React from 'react'
import './AttendList.scss'

const AttendList = () => {
    const attendanceList = [
        { id: 1, Date: "03/02/24", timeIn: '9:00 AM', timeOut: '5:00 PM', overtime: 1, totalHours: 8 },
     { id: 2, Date: "04/02/24",  timeIn: '8:00 AM', timeOut: '5:00 PM', overtime: 1, totalHours: 9 },
     { id: 3, Date: "05/02/24",  timeIn: '10:00 AM', timeOut: '6:00 PM', overtime: 1, totalHours: 6 },
     { id: 4, Date: "06/02/24", timeIn: '9:30 AM ', timeOut: '6:00 PM', overtime: 1, totalHours: 7 },
     { id: 5, Date: "07/02/24",  timeIn: '10:00 AM', timeOut: '8:00 PM', overtime: 1, totalHours: 8 },
     { id: 6, Date: "08/02/24", timeIn: '9:30 AM ', timeOut: '6:00 PM', overtime: 1, totalHours: 9 },
   ];
  return (
    <div className='attendList'>
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Date</th>
              <th>Time In</th>
              <th>TmeOut</th>
              <th>Overtme </th>
              <th>Total Hr</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map(attendanceListItem => (
              <tr className="details" key={attendanceListItem.id} >
                <td >{attendanceListItem.id}</td>
                <td >{attendanceListItem.Date}</td>
                <td >{attendanceListItem.timeIn}</td>
                <td >{attendanceListItem.timeOut}</td>
                <td >{attendanceListItem.overtime}</td>                
                <td>{attendanceListItem.totalHours}</td>
                {/* <td>
                  <div className="action-icons">
                    <FaEye className="icon1" />
                    <FaEdit  className="icon2" /> 
                    <FaTrash className="icon3" />
                  </div>
                </td> */}

              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default AttendList