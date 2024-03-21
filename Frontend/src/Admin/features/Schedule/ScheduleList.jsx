import React, { useState } from 'react';
import RotateLoader from "react-spinners/RotateLoader";
import { useGetSchedulesQuery,
     useAddScheduleMutation, useDeleteSchedulesMutation,
    useUpdateSchedulesMutation } from './ScheduleApi';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';
import UpdateScheduleModal from './UpdateList';

const ScheduleList = () => {
  const {
    data: schedules,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetSchedulesQuery();

  const [deleteSchedule] = useDeleteSchedulesMutation();
  const [updateSchedule] = useUpdateSchedulesMutation();
  const [editScheduleData, setEditScheduleData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  if (isLoading || isFetching) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  if (error || isError || !schedules || schedules.length === 0) {
    console.log("Error caught or no Schedule");
    ErrorToast("No Schedule");
    return <div> <h2>No Schedules at the moment</h2>  </div>;
  }
  const sortedSchedules = [...schedules].sort((a, b) => b.ScheduleID - a.ScheduleID);

  const handleDeleteSchedule = async (ScheduleID) =>{
    try {
      await deleteSchedule(ScheduleID).unwrap();
      SuccessToast("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting Schedule:", error);
    }
  };

  const handleEditSchedule = (schedule) => {
    setEditScheduleData(schedule);
    setIsModalOpen(true); // Open the modal when editing an employee
  };

  const handleUpdateSchedule = async (updatedSchedule) => {
    try {
      await updateSchedule(updatedSchedule).unwrap();
      SuccessToast("Schedule details updated successfully");
      setIsModalOpen(false); // Close the modal after updating employee details
    } catch (error) {
      console.error("Error updating Schedule:", error);
      ErrorToast("Failed to update Schedule details");
    }
  };

  return (
    <div className="scheduleList">
      <ToasterContainer />
      <section className="schedulecontainer">
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Name</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedSchedules.map((schedule) => (
              <tr className="details" key={schedule.ScheduleID}>
                <td>{schedule.ScheduleID}</td>
                <td>{schedule.ScheduleName}</td>
                <td>{schedule.StartTime}</td>
                <td>{schedule.EndTime}</td>
                <td>{schedule.Hours}</td>
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
      {isModalOpen && (
        <UpdateScheduleModal
          schedule={editScheduleData}
          onUpdateSchedule={handleUpdateSchedule}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}
    </div>
  );
};

export default ScheduleList;
