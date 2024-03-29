import React from 'react'
import { useState } from 'react';
import './Attendance.scss'
import AttendanceList from '../features/Attendance/AttendanceList';
import { useDeleteAttendanceMutation, useGetAttendancesQuery } from '../features/Attendance/AttendanceApi';
import CreateAttendance from '../features/Attendance/CreateAttendance';

const Attendance = () => {

const {
  data: attendances,
  error,
  isLoading,
  isError,
  isFetching,
} = useGetAttendancesQuery({ refetchOnReconnect: true });
const [deleteAttendance] = useDeleteAttendanceMutation();
const [showForm, setShowForm] = useState(false);

const toggleForm = () => {
  setShowForm((prevState) => !prevState);}

const handleDeleteAttendance = async (AttendanceID) => {
  try {
    await deleteAttendance(AttendanceID).unwrap();
  } catch (err) {
    console.error('Failed to delete Attendance:', err);
  }
};


// if (isLoading) return <div>Loading...</div>;
// if (error) return <div>Error: {error.message}</div>;



  return (
    <div>
       <div className="header1">
        <h1>Attendance.</h1>
        <div className="generate">
          <span onClick={toggleForm}>+ Add</span>
        </div>
      </div>
      <div className="attendanceList">
      {showForm && <CreateAttendance onClose={toggleForm} />}

        <AttendanceList  attendances={attendances} onDeleteattendance={handleDeleteAttendance}/>

      
        </div>

      
    </div>
  )
}

export default Attendance