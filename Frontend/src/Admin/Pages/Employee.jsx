import "./Employee.scss"
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Employee = () => {
  // Sample array of employees (replace with your actual data)
  const employees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer', schedule: '9:00 AM - 5:00 PM' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Manager', schedule: '8:00 AM - 4:00 PM' },
    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', position: 'Designer', schedule: '10:00 AM - 6:00 PM' },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', position: 'HR', schedule: '9:30 AM - 5:30 PM' },
    { id: 5, name: 'Daniel Wilson', email: 'daniel@example.com', position: 'Sales Executive', schedule: '10:00 AM - 6:00 PM' },
    { id: 6, name: 'Olivia Martinez', email: 'olivia@example.com', position: 'Marketing Manager', schedule: '8:30 AM - 4:30 PM' },
    { id: 7, name: 'William Taylor', email: 'william@example.com', position: 'Accountant', schedule: '9:00 AM - 5:00 PM' },
    { id: 8, name: 'Sophia Anderson', email: 'sophia@example.com', position: 'Customer Support', schedule: '10:00 AM - 6:00 PM' },
    { id: 9, name: 'Alexander Thomas', email: 'alex@example.com', position: 'Project Manager', schedule: '9:00 AM - 5:00 PM' },
    { id: 10, name: 'Mia Jackson', email: 'mia@example.com', position: 'Quality Assurance', schedule: '9:30 AM - 5:30 PM' }
  ];


  return (
    <div className='employeePage'>
      <div className="header1">
        <h1>Employees</h1>
        <div className="generate">
          <span>+ Add</span>
        </div>
      </div>
      <div className="employeeList">
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr className="details" key={employee.id} >
                <td className="row-A">{employee.id}</td>
                <td className="row-B">{employee.name}</td>
                <td className="row-A">{employee.email}</td>
                <td className="row-B">{employee.position}</td>
                <td className="row-A">{employee.schedule}</td>
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
  );
};

export default Employee;










// import React from 'react'
// // import EmployeesList from '../features/users/UserList'
// const Employee = () => {

//   return (
//     <div className='employeePage'>
//       <div className="header1">
//         <h1>Employees.</h1>
//         <div className="generate">
//           <span>+ Add</span>
//         </div>
//       </div>
//       {/* <EmployeesList/> */}


//     </div>
//   )
// }

// export default Employee;