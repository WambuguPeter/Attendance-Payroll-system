import React, { useState } from 'react'
import AddSchedule from '../features/Schedule/CreateSchedule';
import ScheduleList from '../features/Schedule/ScheduleList';

import { useGetSchedulesQuery, useDeleteSchedulesMutation } from '../features/Schedule/ScheduleApi';

const Schedule = () => {
  
  const {
    data: schedules,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetSchedulesQuery({ refetchOnReconnect: true });

  const [isOpen, setIsOpen] = useState(false);
  // const [deleteSchedule] = useDeleteSchedulesMutation();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);}

  // const handleDeleteSchedule = async (ScheduleID) => {
  //   try {
  //     await deleteSchedule(ScheduleID).unwrap();
  //   } catch (err) {
  //     console.error('Failed to delete Schedule:', err);
  //   }
  // };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;



  return (
    <div className='schedulePage'>
       <div className="header1">
        <h1>Schedule.</h1>
        <div className="generate">
          <span onClick={toggleForm}>+ Add</span>
        </div>
      </div>
      <div className="schedulesList">
      {showForm && <AddSchedule onClose={toggleForm} />}
     
     <ScheduleList schedules={schedules}  />
     {/* <ScheduleList schedules={schedules} onDeleteSchedule={handleDeleteSchedule} /> */}
      </div>
    </div>
  )
}

export default Schedule