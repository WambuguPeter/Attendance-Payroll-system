import React, { useState } from 'react';
import { useUpdateEmployeeMutation
 } from './UserApi';

const EditEmployeeModal = ({ employee, onUpdateEmployee, onClose }) => {
  const [updateEmployee,{isLoading}] = useUpdateEmployeeMutation();
  const [updatedEmployee, setUpdatedEmployee] = useState({
    ...employee // Initialize form data with employee details
  });

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
      await updateEmployee(updatedEmployee).unwrap();
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
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Employee</h2>
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
            <input type="Date" name="BirthDate" value={updatedEmployee.BirthDate} onChange={handleChange} />
          </label>
          <label>
            Contact:
            <input type="text" name="Contact" value={updatedEmployee.Contact} onChange={handleChange} />
          </label>
          <label>
            Gender:
            <input type="text" name="Gender" value={updatedEmployee.Gender} onChange={handleChange} />
          </label>
          <label>
            admin:
            <input type="boolean" name="admin" value={updatedEmployee.admin} onChange={handleChange} />
          </label>
          <label>
            PositionID:
            <input type="Int" name="PositionID" value={updatedEmployee.PositionID} onChange={handleChange} />
          </label>
          <label>
            ScheduleID:
            <input type="Int" name="ScheduleID" value={updatedEmployee.ScheduleID} onChange={handleChange} />
          </label>
          <label>
            PhotoURL:
            <input type="PhotoURL" name="PhotoURL" value={updatedEmployee.PhotoURL} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="Email" value={updatedEmployee.Email} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="Password" name="Password" value={updatedEmployee.Password} onChange={handleChange} />
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
            <input type="Number" name="AccountNumber" value={updatedEmployee.AccountNumber} onChange={handleChange} />
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