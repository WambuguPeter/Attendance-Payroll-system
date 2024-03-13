import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Schedule = () => {
  const schedules = [
    {id:1, name: "Day Shift", starting:'9:00 AM', ending: '5:00 PM' },
    {id:2, name: "Night Shift", starting:'8:00 PM', ending: '4:00 AM' },
  ]
  return (
    <div>
       <div className="header1">
        <h1>Schedule.</h1>
        <div className="generate">
          <span>+ Add</span>
        </div>
      </div>
      <div className="schedulesList">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.id}</td>
                <td>{schedule.name}</td>
                <td>{schedule.starting}</td>
                <td>{schedule.ending}</td>
                <td>
                <div className="action-icons">
                    <FaEye className="icon1" />
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

export default Schedule