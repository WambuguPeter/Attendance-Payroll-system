import React, { useState } from 'react';
import { useAddScheduleMutation } from './ScheduleApi';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';

const AddSchedule = ({ onClose }) => {
  const [addSchedule, { isLoading }] = useAddScheduleMutation();
  const [formData, setFormData] = useState({
    ScheduleName: "",
    StartTime: "",
    EndTime: "",
    Hours: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSchedule(formData).unwrap();
      SuccessToast(response.message)
      onClose();
       // Close the form upon successful submission
    } catch (error) {
      console.error("Error adding schedule:", error);
      ErrorToast("Failed to add schedule");
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="modal">
    <section className="modal-content ">      
    <span className="close" onClick={onClose}>&times;</span>
      <h2>Add a New Schedule</h2>
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
    </div>
  );
};

export default AddSchedule;
