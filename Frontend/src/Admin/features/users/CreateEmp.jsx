import React, { useState } from 'react';
import './CreateEmp.scss'
import { useAddEmployeeMutation } from './UserApi';
import { ErrorToast, ToasterContainer } from '../../Components/Toster';

const AddEmployee = ({ onClose }) => {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
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
    PhotoURL: "",
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

  return (
    <section className="addEmployee">
      <ToasterContainer />
      {/* <h2>Add a New Employee</h2> */}
      <form onSubmit={handleSubmit} className="form">
        {/* Input fields */}
        {Object.keys(formData).map((key) => (
          <label className="form-input" htmlFor={key} key={key}>
            {key}:
            <input
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </label>
        ))}
        <button type="submit">{isLoading ? "Loading" : "Save"}</button>
      </form>
    </section>
  );
};

export default AddEmployee;
