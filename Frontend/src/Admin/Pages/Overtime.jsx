import React, { useState } from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import AddPosition from '../features/Position/CreatePosition';
import PositionList from '../features/Position/PositonList';
import { useGetPositionsQuery, useDeletePositionsMutation } from '../features/Position/PositionApi';

const Overtime = () => {
  const {
    data: positions,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetPositionsQuery({ refetchOnReconnect: true });

  const [isOpen, setIsOpen] = useState(false);
  const [deletePosition] = useDeletePositionsMutation();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);}

  const handleDeletePosition = async (PositionID) => {
    try {
      await deletePosition(PositionID).unwrap();
    } catch (err) {
      console.error('Failed to delete Position:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className='ovetimePage'>
       <div className="header1">
        <h1>Overtime.</h1>
        <div className="generate">
          <span onClick={toggleForm}>+ Add</span>
        </div>
      </div>

      <div className="ovetimeRatesList">
      {showForm && <AddPosition onClose={toggleForm} />}
     
     <PositionList positions={positions} onDeletePosition={handleDeletePosition} />
      
      </div>

    </div>
  )
}

export default Overtime;