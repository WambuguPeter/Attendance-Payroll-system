import React, { useState } from 'react';
import { useUpdateSchedulesMutation } from './ScheduleApi';

const UpdateScheduleModal = ({ schedule, onUpdateSchedule, onClose }) => {
  const [updateSchedule,{isLoading}] = useUpdateSchedulesMutation();
  const [updatedSchedule, setUpdatedSchedule] = useState({
    ...schedule 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSchedule(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSchedule(updatedSchedule).unwrap();
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error("Error in Updating the Schedule:", error);
      ErrorToast("Failed to Update Schedule");
    }
    onUpdateSchedule(updatedSchedule);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Schedule</h2>
        <form onSubmit={handleSubmit}>
          <label>
          ScheduleName:
            <input type="text" name="ScheduleName" value={updatedSchedule.ScheduleName} onChange={handleChange} />
          </label>
          <label>
          StartTime:
            <input type="text" name="StartTime" value={updatedSchedule.StartTime} onChange={handleChange} />
          </label>
          <label>
          EndTime:
            <input type="text" name="EndTime" value={updatedSchedule.EndTime} onChange={handleChange} />
          </label>
          <label>
            Hours:
            <input type="Number" name="Hours" value={updatedSchedule.Hours} onChange={handleChange} />
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

export default UpdateScheduleModal;
