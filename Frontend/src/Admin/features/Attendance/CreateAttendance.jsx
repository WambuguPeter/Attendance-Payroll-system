import React from 'react'
import { useState } from 'react';
import { ErrorToast, ToasterContainer } from '../../Components/Toster';
import { useAddAttendancesMutation } from './AttendanceApi';

const CreateAttendance = ({ onClose }) => {
    const [addAttendance, { isLoading }] = useAddAttendancesMutation();
  const [formData, setFormData] = useState({
    EmployeeID: "",
    Date: "",
    ScheduleID: "",
    TimeIn: "",
    TimeOut: "",
    Hours: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAttendance(formData).unwrap();
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error("Error adding Attendance:", error);
      ErrorToast("Failed to add Attendance");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className='modal'>
      <div className="modal-content">
    <span className="close" onClick={onClose}>&times;</span>
        <h2>Add a New Attendance</h2>
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
      </div>

    </div>
  )
}

export default CreateAttendance