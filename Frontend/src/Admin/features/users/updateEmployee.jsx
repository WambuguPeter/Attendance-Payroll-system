import React, { useState } from 'react';
import './updateEmployee.scss'
import { useUpdateEmployeeMutation
 } from './UserApi';
 import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';

const EditEmployeeModal = ({ employee, onUpdateEmployee, onClose }) => {
  const [updateEmployee,{isLoading}] = useUpdateEmployeeMutation();
  const [updatedEmployee, setUpdatedEmployee] = useState({
    ...employee // Initialize form data with employee details
  });
  const employeeID = employee.EmployeeID;
  console.log('employee', employeeID)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee({EmployeeID: parseInt(employeeID), employee}).unwrap();
      SuccessToast(response.message);
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error("Error in Updating the employee:", error);
      ErrorToast("Failed to Update employee");
    }
    onUpdateEmployee(updatedEmployee);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>X</span>
        <h2>Update Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="FirstName" value={updatedEmployee.FirstName} onChange={handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="LastName" value={updatedEmployee.LastName} onChange={handleChange} />
          </label>
          <label>
          Location:
            <input type="text" name="Location" value={updatedEmployee.Location} onChange={handleChange} />
          </label>
          <label>
            BirthDate:
            <input type="vachar" name="BirthDate" value={updatedEmployee.BirthDate} onChange={handleChange} />
          </label>
          <label>
            Contact(Phone no):
            <input type="tel" name="Contact" value={updatedEmployee.Contact} onChange={handleChange} />
          </label>
          <label>
            Gender:
            <input type="text" name="Gender" value={updatedEmployee.Gender} onChange={handleChange} />
          </label>
          <label>
            Admin:
            <input type="radio" name="admin" value="true" checked={updatedEmployee.admin === true} onChange={handleChange} />
            Yes
          </label>
          <label>
            <input type="radio" name="admin" value="false" checked={updatedEmployee.admin === false} onChange={handleChange} />
            No
          </label>
          <label>
            PositionID:
            <input type="number" name="PositionID" value={updatedEmployee.PositionID} onChange={handleChange} />
          </label>
          <label>
            ScheduleID:
            <input type="number" name="ScheduleID" value={updatedEmployee.ScheduleID} onChange={handleChange} />
          </label>
          <label>
            PhotoURL:
            <input type=" " name="PhotoURL" value={updatedEmployee.PhotoURL} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="Email" value={updatedEmployee.Email} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="Password" value={updatedEmployee.Password} onChange={handleChange} />
          </label>
          <label>
          BankName:
            <input type="text" name="text" value={updatedEmployee.text} onChange={handleChange} />
          </label>
          <label>
            BankBranch:
            <input type="text" name="BankBranch" value={updatedEmployee.BankBranch} onChange={handleChange} />
          </label>
          <label>
            AccountNumber:
            <input type="number" name="AccountNumber" value={updatedEmployee.AccountNumber} onChange={handleChange} />
          </label>
          <label>
            Bio:
            <input type="text" name="Bio" value={updatedEmployee.Bio} onChange={handleChange} />
          </label>
         
          <div className="buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
