import React, { useState } from 'react';
import { useAddPayrollMutation } from './PayrollApi';
import { useGetEmployeesQuery } from '../users/UserApi';
import { ErrorToast, SuccessToast } from '../../Components/Toster';

const AddPayroll = ({ onClose }) => {
  const [addPayroll, { isLoading }] = useAddPayrollMutation();
  const { data: EmployeesData } = useGetEmployeesQuery();
  const [formData, setFormData] = useState({
    EmployeeID: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPayroll(formData).unwrap();
      SuccessToast(response.message);
      onClose(); // Close the form upon successful submission
    } catch (error) {
      // console.error("Error adding Payroll:", error);
      ErrorToast("Failed to add Payroll");
      onClose(); // Close the form upon successful submission
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleClose = () => {
    onClose(); 
  };

  return (
    <div className="modal">
      <section className="modal-content">
        <button className="close" onClick={handleClose}>X</button>
        <h2>Add a New Payroll</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label" htmlFor="EmployeeID">Employee:</label>
            <select
              id="EmployeeID"
              name="EmployeeID"
              value={formData.EmployeeID}
              onChange={handleChange}
              className="form-input"
            >
              {EmployeesData && EmployeesData.map(employee => (
                <option key={employee.EmployeeID} value={employee.EmployeeID}>{employee.FirstName} {employee.LastName}</option>
              ))}
            </select>
          </div>
          <button type="submit">{isLoading ? "Loading" : "Save"}</button>
        </form>
      </section>
    </div>
  );
};

export default AddPayroll;
