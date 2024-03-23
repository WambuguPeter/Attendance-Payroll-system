import React, { useState } from 'react';
import './CreateEmp.scss';
import { useAddEmployeeMutation } from './UserApi';
import { ErrorToast, ToasterContainer } from '../../Components/Toster';

const AddEmployee = ({ onClose }) => {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
  const PhotoURL= <input type ="file"/>
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Location: "",
    BirthDate: "",
    Contact: "",
    Gender: "",
    admin: "",
    PositionID: "",
    ScheduleID: "",
    PhotoURL :PhotoURL,
    Email: "",
    Password: "",
    BankName: "",
    BankBranch: "",
    AccountNumber: "",
    Bio: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(formData).unwrap();
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error("Error adding employee:", error);
      ErrorToast("Failed to add employee");
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
      <ToasterContainer />
      <button className="close" onClick={handleClose}>X</button>
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Add New Employee</h2>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label className="form-label" htmlFor={key}>{key}:</label>
            <input
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? "Loading..." : "Save"}
        </button>
      </form>
    </section>
    </div>
  );
};

export default AddEmployee;
