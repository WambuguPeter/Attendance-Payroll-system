import React, { useState } from 'react';
import { useAddAdvanceCashMutation } from './AdvanceCashApi';
import { useGetEmployeesQuery } from '../users/UserApi';
import { ErrorToast, SuccessToast } from '../../Components/Toster';

const AddAdvanceCash = ({ onClose }) => {
  const [addAdvanceCash, { isLoading }] = useAddAdvanceCashMutation();
  const { data: EmployeesData } = useGetEmployeesQuery();
  const [formData, setFormData] = useState({
    EmployeeID: "",
    Description: "",
    AdvanceAmount: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAdvanceCash(formData).unwrap();
      SuccessToast("Added Successfully");
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error("Error adding AdvanceCash:", error);
      ErrorToast("Failed to add AdvanceCash");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    onClose(); // Close the form when close button is clicked
  };

  return (
    <div className="modal">
      <section className="modal-content">
        <button className="close" onClick={handleClose}>X</button>
        <form onSubmit={handleSubmit} className="form">
          <h2>Add a New AdvanceCash</h2>
          
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
          {Object.keys(formData).map((key) => (
             key !== "EmployeeID" &&(
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="form-input"
              />
            </div>
             )
          ))}
          <button type="submit">{isLoading ? "Loading" : "Save"}</button>
        </form>
      </section>
    </div>
  );
};

export default AddAdvanceCash;
