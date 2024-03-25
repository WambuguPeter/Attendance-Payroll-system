import React, { useState } from 'react'
import RotateLoader from "react-spinners/RotateLoader";
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast } from '../../Admin/Components/Toster';
import { useGetAttendanceByIDQuery } from '../../Admin/features/Attendance/AttendanceApi';
// import UpdateAttendance from './UpdateAttendance';

const AttendanceList = () => {

  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  // console.log('employeeDetails', employeeDetails)
const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;
    const {
        data: attendances,
        error,
        isLoading,
        isError,
        isFetching,
      } = useGetAttendanceByIDQuery(employeeID);


      // const [updateAttendance] = useUpdateAttendanceMutation();
      
  if (isLoading || isFetching) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  if (error || isError || !attendances || attendances.length === 0) {
    // console.log("Error caught or no Attendance");
    // ErrorToast("No attendance");
    return <div> <h2>Yet to Attendant </h2>  </div>;
  }

  // const handleUpdateAttendance = async (updatedAttendance) => {
  //   try {
  //     await updateAttendance(updatedAttendance).unwrap();
  //     SuccessToast("Attendance details updated successfully");
  //     setIsModalOpen(false); // Close the modal after updating employee details
  //   } catch (error) {
  //     console.error("Error updating Attendance:", error);
  //     ErrorToast("Failed to update Attendance details");
  //   }
  // };
  const sortedAttendance = [...attendances].sort((a, b) => b.AttendanceID - a.AttendanceID);
  return (
    <div className='AttendanceList'>

         <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Date</th>
              <th>Time In</th>
              <th>Time out</th>
              <th>Hours</th>
              <th>Overtime</th>
            </tr>
          </thead>
          <tbody>
            {sortedAttendance.map((attendance) => (
              <tr className="details" key={attendance.AttendanceID}>
                <td>{attendance.AttendanceID}</td>
                <td>{attendance.Date}</td>
                <td>{attendance.TimeIn}</td>
                <td>{attendance.TimeOut}</td>
                <td>{attendance.Hours}</td>
                <td>{attendance.Overtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* {isModalOpen && (
        <UpdateAttendance
          attendance={editAttendanceData}
          onUpdateAttendance={handleUpdateAttendance}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )} */}
        </div>
  )
}

export default AttendanceList






