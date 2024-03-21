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
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error("Error adding schedule:", error);
      ErrorToast("Failed to add schedule");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="addSchedule">
      <ToasterContainer />
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
  );
};

export default AddSchedule;
