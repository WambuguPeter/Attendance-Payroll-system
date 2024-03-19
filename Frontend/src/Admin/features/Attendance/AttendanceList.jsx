import React from 'react'
import RotateLoader from "react-spinners/RotateLoader";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';
import { useDeleteAttendanceMutation, useGetAttendancesQuery } from './AttendanceApi';

const AttendanceList = () => {
    const {
        data: attendances,
        error,
        isLoading,
        isError,
        isFetching,
      } = useGetAttendancesQuery();

      const [deleteAttendance] = useDeleteAttendanceMutation();

      
  if (isLoading || isFetching) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  if (error || isError || !attendances || attendances.length === 0) {
    console.log("Error caught or no Attendance");
    ErrorToast("No attendance");
    return <div> <h2>No Attendance at the moment</h2>  </div>;
  }

  const handleDeleteAttendance = async (AttendanceID) =>{
    try {
      await deleteAttendance(AttendanceID).unwrap();
      SuccessToast("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting Attendance:", error);
    }
  };
  const sortedAttendance = [...attendances].sort((a, b) => b.AttendanceID - a.AttendanceID);
  return (
    <div className='AttendanceList'>
         <ToasterContainer />

         <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Name</th>
              <th>Time In</th>
              <th>Time out</th>
              <th>Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAttendance.map((attendance) => (
              <tr className="details" key={attendance.AttendanceID}>
                <td>{attendance.AttendanceID}</td>
                <td>{attendance.Name} </td>
                <td>{attendance.TimeIn}</td>
                <td>{attendance.TimeOut}</td>
                <td>{attendance.Hours}</td>
                <td>
                  <div className="action-icons">
                    <FaEye className="icon1" />
                    <FaEdit className="icon2" onClick={() => handleEditEmployee(employee)} />
                    <FaTrash className="icon3" onClick={() => handleDeleteAttendance(attendance.AttendanceID)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        </div>
  )
}

export default AttendanceList