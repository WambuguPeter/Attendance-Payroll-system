import React, { useEffect, useState } from 'react';
import { LoadingToast, ErrorToast, SuccessToast } from "../../Admin/Components/Toster";
import { useGetAttendanceByIDQuery, useUpdateAttendanceMutation, useAddAttendancesMutation } from '../../Admin/features/Attendance/AttendanceApi'; // Adjust the import path accordingly

const AttendList = ({ isTimeIn, isTimeOut, handleTimeOut }) => {
  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;

  const [currentTime, setCurrentTime] = useState(new Date());
  const { data: attendance, error, isLoading, refetch } = useGetAttendanceByIDQuery(employeeID);
  // console.log(attendance)
  // const attendanceID = attendance.AttendanceID;

  const [updateAttendance] = useUpdateAttendanceMutation(); // Update by AttendanceID
  const [addAttendance] = useAddAttendancesMutation();

  // const sortedAttendances = [...attendance].sort((a, b) => b.AttendanceID - a.AttendanceID);

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
      console.log(newAttendanceData)

      addAttendance(newAttendanceData)
        .unwrap()
        .then(() => {
          SuccessToast("Attendance recorded successfully");
          refetch();
        })
        .catch(error => {
          console.error('Error adding attendance:', error);
          ErrorToast("Failed to record attendance");
        });
    }
  // }, [ ]);
  }, [isTimeIn, employeeID, currentTime, addAttendance, refetch]);
  
  // const handleTimeOutClick = (attendanceID, event) => {
  //   event.stopPropagation(); // Prevent event bubbling
  //   handleTimeOut(attendanceID);
  // };

  if (isLoading) {
    LoadingToast("Loading attendance...");
    return <div>Loading...</div>;
  }
  if (error) {
    ErrorToast("Failed to fetch attendance");
    return <div>Error: {error.message}</div>;
  }

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
          {/* {sortedAttendances.map((item) => ( */}
          {newAttendanceData.map((item) => (
            <tr className="details" key={item.AttendanceID}>
              <td>{item.AttendanceID}</td>
              <td>{item.Date}</td>
              <td>{item.TimeIn}</td>              
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