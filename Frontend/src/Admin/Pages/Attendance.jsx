import React from 'react'

const Attendance = () => {
  const attendanceList = [
  { id: 1, name: 'John Doe', timeIn: '9:00 AM', timeOut: '5:00 PM', overtime: 1, totalHours: ' - 5:00 PM' },
  { id: 2, name: 'Jane Smith', timeIn: '8:00 AM', timeOut: '5:00 PM', overtime: 1, totalHours: ' - 4:00 PM' },
  { id: 3, name: 'Michael Johnson', timeIn: '10:00 AM', timeOut: '6:00 PM', overtime: 1, totalHours: '10:00 AM - ' },
  { id: 4, name: 'Emily Brown', timeIn: '9:30 AM ', timeOut: '6:00 PM', overtime: 1, totalHours: '9:30 AM - 5:30 PM' },
  { id: 5, name: 'Daniel Wilson', timeIn: '10:00 AM', timeOut: '8:00 PM', overtime: 1, totalHours: '10:00 AM - 6:00 PM' },
  { id: 6, name: 'Olivia Martinez', timeIn: '9:30 AM ', timeOut: '6:00 PM', overtime: 1, totalHours: '8:30 AM - 4:30 PM' },
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr className="details" key={employee.id} >
                <td >{employee.id}</td>
                <td >{employee.name}</td>
                <td >{employee.email}</td>
                <td >{employee.position}</td>
                <td>{employee.schedule}</td>
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

export default Attendance