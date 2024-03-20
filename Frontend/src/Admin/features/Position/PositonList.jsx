import React, { useState } from 'react';
import RotateLoader from "react-spinners/RotateLoader";
import { useDeletePositionsMutation,  useGetPositionsQuery, useUpdatePositionsMutation } from './PositionApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';
import UpdatePositionModal from './UpdatePosition';

const PositionList = () => {
  const {
    data: positions,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetPositionsQuery();

  const [deletePosition] = useDeletePositionsMutation();
  const [updatePosition] = useUpdatePositionsMutation();
  const [editPositionData, setEditPositionData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  if (isLoading || isFetching) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  if (error || isError || !positions || positions.length === 0) {
    console.log("Error caught or no Position");
    ErrorToast("No Position");
    return <div> <h2>No Positions at the moment</h2>  </div>;
  }
  const sortedPositions = [...positions].sort((a, b) => b.PositionID - a.PositionID);

  const handleDeletePosition = async (PositionID) =>{
    try {
      await deletePosition(PositionID).unwrap();
      SuccessToast("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting Schedule:", error);
    }
  };

  const handleEditPosition = (position) => {
    setEditPositionData(position);
    setIsModalOpen(true); // Open the modal when editing an employee
  };

  const handleUpdatePosition = async (updatedPosition) => {
    try {
      await updatePosition(updatedPosition).unwrap();
      SuccessToast("Position details updated successfully");
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error updating Position:", error);
      ErrorToast("Failed to update Position details");
    }
  };

  return (
    <div className="positionList">
      <ToasterContainer />
      <section className="positionContainer">
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Positions</th>
              <th>Rate/Hour</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedPositions.map((position) => (
              <tr className="details" key={position.PositionID}>
                <td>{position.PositionID}</td>
                <td>{position.Title}</td>
                <td>{position.OvertimeRate}</td>
                <td>
                  <div className="action-icons">
                    {/* <FaEye className="icon1" /> */}
                    <FaEdit className="icon2" onClick={() => handleEditPosition(position)} />
                    <FaTrash className="icon3" onClick={() => handleDeletePosition(position.PositionID)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {isModalOpen && (
        <UpdatePositionModal
          position={editPositionData}
          onUpdatePosition={handleUpdatePosition}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}
    </div>
  );
};

export default PositionList;
