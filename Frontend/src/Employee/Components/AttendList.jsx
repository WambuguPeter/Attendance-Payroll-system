import React, { useEffect } from 'react';
import { useGetAttendanceByIDQuery, useUpdateAttendanceMutation, useAddAttendancesMutation } from '../../Admin/features/Attendance/AttendanceApi'; // Adjust the import path accordingly

const AttendList = ({ isTimeIn, isTimeOut }) => {
  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;
  const { data: attendance, error, isLoading, refetch } = useGetAttendanceByIDQuery(employeeID);
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [addAttendance] = useAddAttendancesMutation();

  useEffect(() => {
    if (isTimeIn) {
      const newAttendanceData = {
        employeeID: employeeID,
        date: new Date().toISOString(),
        timeIn: new Date().toISOString(),
        timeOut: null,
        hours: null,
      };
      addAttendance(newAttendanceData)
        .unwrap()
        .then(() => refetch())
        .catch(error => console.error('Error adding attendance:', error));
    }

    if (isTimeOut && attendance && attendance.length > 0) {
      const latestAttendance = attendance[0]; // Assuming the latest attendance record is at index 0
      updateAttendance({
        ...latestAttendance,
        timeOut: new Date().toISOString()
      })
        .unwrap()
        .then(() => refetch())
        .catch(error => console.error('Error updating attendance:', error));
    }
  }, [isTimeIn, isTimeOut, attendance, updateAttendance, addAttendance, employeeID, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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