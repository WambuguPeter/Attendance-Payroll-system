import React, { useState } from 'react';
import RotateLoader from "react-spinners/RotateLoader";
import { useGetOvertimeQuery } from './OvertimeApi';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';

const overtimeList = () => {
  const {
    data: overtimes,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetOvertimeQuery();

  // console.log(schedules)

//   const [deleteSchedule] = useDeleteSchedulesMutation();
//   const [updateSchedule] = useUpdateSchedulesMutation();
//   const [editScheduleData, setEditScheduleData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  if (isLoading || isFetching) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  if (error || isError || !overtimes || overtimes.length === 0) {
    console.log("Error caught or no Overtime");
    ErrorToast("No Overtime");
    return <div> <h2>No Overtimes at the moment</h2>  </div>;
  }
  const sortedOvertimes = [...overtimes].sort((a, b) => b.OvertimeID - a.OvertimeID);

//   const handleDeleteOvertime = async (OvertimeID) =>{
//     try {
//       await deleteOvertime(OvertimeID).unwrap();
//       SuccessToast("Deleted Successfully");
//     } catch (error) {
//       console.error("Error deleting Overtime:", error);
//     }
//   };

//   const handleEditOvertime = (schedule) => {
//     setEditScheduleData(schedule);
//     setIsModalOpen(true); // Open the modal when editing an employee
//   };

//   const handleUpdateSchedule = async (updatedSchedule) => {
//     try {
//       await updateSchedule(updatedSchedule).unwrap();
//       SuccessToast("Schedule details updated successfully");
//       setIsModalOpen(false); // Close the modal after updating employee details
//     } catch (error) {
//       console.error("Error updating Schedule:", error);
//       ErrorToast("Failed to update Schedule details");
//     }
//   };

  return (
    <div className="overtimeList">
      <ToasterContainer />
      <section className="overtimecontainer">
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Employee</th>
              <th>Attendance</th>
              <th>OTHours</th>
              <th>OT-Earnings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedOvertimes.map((overtime) => (
              <tr className="details" key={overtime.OvertimeID}>
                <td>{overtime.OvertimeID}</td>
                <td>{overtime.EmployeeID}</td>
                <td>{overtime.AttendanceID}</td>
                <td>{overtime.OvertimeHours}</td>
                <td>{overtime.OvertimeEarnings}</td>
                <td>
                  <div className="action-icons">
                    {/* <FaEye className="icon1" /> */}
                    <FaEdit className="icon2" onClick={() => handleEditSchedule(schedule)} />
                    <FaTrash className="icon3" onClick={() => handleDeleteSchedule(schedule.ScheduleID)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* {isModalOpen && (
        <UpdateScheduleModal
          schedule={editScheduleData}
          onUpdateSchedule={handleUpdateSchedule}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )} */}
    </div>
  );
};

export default overtimeList;
