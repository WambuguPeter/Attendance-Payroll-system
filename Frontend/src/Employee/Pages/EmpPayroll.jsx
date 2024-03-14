import React from 'react'
import { FaEye, FaTrash } from 'react-icons/fa';


const EmpPayroll = () => {
  const payrollList = [
    {id:1 ,Date: "05/11/2024", Gross:" 70,000" , deduction: '20,000', netPay: "50,000.00"},
    {id:2 ,Date: "03/12/2024", Gross: '68,000', deduction: '10,000', netPay: "58,000.00"},
    {id:3 ,Date: "04/01/2024", Gross: '50,000', deduction: '5,000', netPay: "45,000"},
    {id:4 ,Date: "04/02/2024", Gross: "60,000", deduction: '5,000', netPay: "55,000.00"},
    {id:5 ,Date: "03/03/2024", Gross: '58,000',deduction: '15,000', netPay: "43,000.00"},
  ]
  return (
    <div className='payroll'>
       <div className="header1">
        <h1>Payroll.</h1>
        {/* <div className="generate">
          <span>+ Add</span>
        </div> */}
      </div>

      <div className="payrollList">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Gross Income</th>
              <th>Deductions</th>
              <th>Net Pay</th>             
              <th>Action</th>
            </tr>            
          </thead>
          <tbody>
            {payrollList.map(payrollItem =>(
              <tr key={payrollItem.id}>
              <td>{payrollItem.id}</td>
              <td>{payrollItem.Date}</td>
              <td>{payrollItem.Gross}</td>
              <td>{payrollItem.deduction}</td>
              <td>{payrollItem.netPay}</td>
              <td>
              <div className="action-icons">
                    <FaEye className="icon1" />
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

export default EmpPayroll