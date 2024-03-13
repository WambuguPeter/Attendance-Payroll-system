import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Payroll = () => {
  const payrollList = [
    {id:1 ,Date: "03/03/2024", name: 'John Doe', position: 'Developer', contact: "0712345678", amount: "50,000.00"},
    {id:2 ,Date: "03/03/2024", name: 'Jane Smith', position: 'Manager', contact: "073275699", amount: "70,000.00"},
    {id:3 ,Date: "04/03/2024", name: 'Michael Johnson', position: 'Designer', contact: "0712555633", amount: "30,000.00"},
    {id:4 ,Date: "04/03/2024", name: "Emily Brown", position: 'Quality Assurance', contact: "075678762", amount: "45,000.00"},
    {id:5 ,Date: "03/03/2024", name: 'Sophia Anderson',position: 'Accountant', contact: "0712355678", amount: "50,000.00"},
  ]
  return (
    <div className='payroll'>
       <div className="header1">
        <h1>Payroll.</h1>
        <div className="generate">
          <span>+ Add</span>
        </div>
      </div>

      <div className="payrollList">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Contact</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>            
          </thead>
          <tbody>
            {payrollList.map(payrollItem =>(
              <tr key={payrollItem.id}>
              <td>{payrollItem.id}</td>
              <td>{payrollItem.Date}</td>
              <td>{payrollItem.name}</td>
              <td>{payrollItem.position}</td>
              <td>{payrollItem.contact}</td>
              <td>{payrollItem.amount}</td>
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

export default Payroll