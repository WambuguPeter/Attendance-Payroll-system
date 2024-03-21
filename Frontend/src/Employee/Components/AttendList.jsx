import React, { useEffect, useState } from 'react';
import { LoadingToast, ErrorToast, SuccessToast } from "../../Admin/Components/Toster";
import { useGetAttendanceByIDQuery, useUpdateAttendanceMutation, useAddAttendancesMutation } from '../../Admin/features/Attendance/AttendanceApi'; // Adjust the import path accordingly

const AttendList = ({ isTimeIn, isTimeOut }) => {

  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;

  const [currentTime, setCurrentTime] = useState(new Date());
  const { data: attendance, error, isLoading, refetch } = useGetAttendanceByIDQuery(employeeID);
  const [updateAttendance] = useUpdateAttendanceMutation(employeeID);
  const [addAttendance] = useAddAttendancesMutation();


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (isTimeIn) {
      const newAttendanceData = {
        EmployeeID: employeeID,
        Date: new Date().toISOString(),
        TimeIn: currentTime.toLocaleTimeString(),
        TimeOut: null,
        Hours: null,
      };
      addAttendance(newAttendanceData)
        .unwrap()
        .then(() => {
          SuccessToast("Attendance recorded successfully");
          refetch()})
        .catch(error => {console.error('Error adding attendance:', error)        
        ErrorToast("Failed to record attendance");
      });
    }

    if (isTimeOut && attendance && attendance.length > 0) {
      const latestAttendance = attendance[0]; // Assuming the latest attendance record is at index 0
      updateAttendance({
        ...latestAttendance,
        TimeOut: currentTime.toLocaleTimeString(),
      })
        .unwrap()
        .then(() => {
          SuccessToast("Attendance updated successfully");
          refetch()})
        .catch(error => {
          console.error('Error updating attendance:', error)
          ErrorToast("Failed to update attendance");});
    }
  }, [isTimeIn, isTimeOut, attendance, updateAttendance, addAttendance, employeeID, refetch]);

  if (isLoading){ 
    LoadingToast("Loading attendance...");
    return <div>Loading...</div>};
  if (error) {
    ErrorToast("Failed to fetch attendance");
    return <div>Error: {error.message}</div>};

  return (
    <div className='attendList'>
      <table>
        <thead>
          <tr className="titles">
            <th>ID</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((item) => (
            <tr className="details" key={item.AttendanceID}>
              <td>{item.AttendanceID}</td>
              <td>{item.Date}</td>
              <td>{item.TimeIn}</td>
              <td>{item.TimeOut}</td>
              <td>{item.Hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendList;





// employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
// const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;