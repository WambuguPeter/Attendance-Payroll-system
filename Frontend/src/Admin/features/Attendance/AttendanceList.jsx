import React, { useState } from 'react'
import RotateLoader from "react-spinners/RotateLoader";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';
import { useDeleteAttendanceMutation, useGetAttendancesQuery, useUpdateAttendanceMutation } from './AttendanceApi';
import UpdateAttendance from './UpdateAttendance';

const AttendanceList = () => {
    const {
        data: attendances,
        error,
        isLoading,
        isError,
        isFetching,
      } = useGetAttendancesQuery();

      const [deleteAttendance] = useDeleteAttendanceMutation();
      const [updateAttendance] = useUpdateAttendanceMutation();
      const [editAttendanceData, setEditAttendanceData] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      
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

  const handleEditAttendance = (attendance) => {
    setEditAttendanceData(attendance);
    setIsModalOpen(true); // Open the modal when editing an employee
  };

  const handleUpdateAttendance = async (updatedAttendance) => {
    try {
      await updateAttendance(updatedAttendance).unwrap();
      SuccessToast("Attendance details updated successfully");
      setIsModalOpen(false); // Close the modal after updating employee details
    } catch (error) {
      console.error("Error updating Attendance:", error);
      ErrorToast("Failed to update Attendance details");
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
                <td>{`${attendance.FirstName} ${attendance.LastName}`}</td>
                <td>{attendance.TimeIn}</td>
                <td>{attendance.TimeOut}</td>
                <td>{attendance.Hours}</td>
                <td>
                  <div className="action-icons">
                    {/* <FaEye className="icon1" /> */}
                    <FaEdit className="icon2" onClick={() => handleEditAttendance(attendance)} />
                    <FaTrash className="icon3" onClick={() => handleDeleteAttendance(attendance.AttendanceID)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {isModalOpen && (
        <UpdateAttendance
          attendance={editAttendanceData}
          onUpdateAttendance={handleUpdateAttendance}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}
        </div>
  )
}

export default AttendanceList