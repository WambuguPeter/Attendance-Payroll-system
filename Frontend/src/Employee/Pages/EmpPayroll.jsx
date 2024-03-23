import React from 'react'
import './EmpPayroll.scss'
import { FaEye, FaTrash } from 'react-icons/fa';
import PayrollList from '../Components/payrollEmp';


const EmpPayroll = () => {
  
  return (
    <div className='payroll'>
       <div className="header1">
        <h1>Payroll.</h1>
        {/* <div className="generate">
          <span>+ Add</span>
        </div> */}
      </div>

      <div className="payrollList">
       < PayrollList />
      </div>

      

    </div>
  )
}

export default EmpPayroll