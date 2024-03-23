import React from 'react'
import './Payroll.scss'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import PayrollList from '../features/Payroll/PayrollList';

const Payroll = () => {
  
  return (
    <div className='payroll'>
       <div className="header1">
        <h1>Payroll.</h1>
        <div className="generate">
          <span>+ Add</span>
        </div>
      </div>

      <div className="payrollList">
        <PayrollList />
      </div>

      

    </div>
  )
}

export default Payroll