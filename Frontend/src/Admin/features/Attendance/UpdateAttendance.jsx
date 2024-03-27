import React, { useState } from 'react'
import { useUpdateAttendanceMutation } from './AttendanceApi'
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';

const UpdateAttendance = ({attendance, onUpdateAttendance, onClose}) => {
    const [ updateAttendance, {isLoading}] = useUpdateAttendanceMutation();
    const [updatedAttendance, setUpdatedAttendance] = useState({ ...attendance});
console.log('attendance', attendance)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedAttendance(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await updateAttendance(updatedAttendance).unwrap();
          onClose(); // Close the form upon successful submission
        } catch (error) {
          console.error("Error in Updating the Attendance:", error);
          ErrorToast("Failed to Update Attendance");
        }
        onUpdateAttendance(updatedAttendance);
       
      };


  return (   
     <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h3>Edit Attendance</h3>
            <form onSubmit={handleSubmit}>
            <label>
            EmployeeID :
                <input type="Int" name="EmployeeID" value= {updatedAttendance.EmployeeID} onChange={handleChange} />
            </label>
            <label>
                TimeIn:
                <input type="DateTime" name="TimeIn" value={updatedAttendance.TimeIn} onChange={handleChange} />
            </label>
            <label>
                TimeOut:
                <input type="DateTime" name="TimeOut" value={updatedAttendance.TimeOut} onChange={handleChange} />
            </label>
            <label>
                Hours:
                <input type="vachar" name="Hours" value={updatedAttendance.Hours} onChange={handleChange} />
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

export default UpdateAttendance