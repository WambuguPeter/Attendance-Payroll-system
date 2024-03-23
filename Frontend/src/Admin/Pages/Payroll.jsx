import React, { useState } from 'react'
import './Payroll.scss'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import PayrollList from '../features/Payroll/PayrollList';
import AddPayroll from '../features/Payroll/CreatePayroll';

const Payroll = () => {

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm)}
    // setShowForm((prevState) => !prevState);}
  
  return (
    <div className='payroll'>
       <div className="header1">
        <h1>Payroll.</h1>
        <div className="generate">
        <span onClick={toggleForm}>+ Add</span>
        </div>
      </div>

      <div className="list">
      {showForm && <AddPayroll onClose={toggleForm} />}
        <PayrollList />
      </div>

      

    </div>
  )
}

export default Payroll