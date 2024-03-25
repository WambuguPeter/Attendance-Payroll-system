import React, { useState } from 'react';
import RotateLoader from "react-spinners/RotateLoader";
import { useGetAllAdvanceCashQuery, useDeleteAdvanceCashMutation } from './AdvanceCashApi';
import { FaEye, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';

const AdvanceCashlList = () => {
  const {
    data: advanceCashs,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetAllAdvanceCashQuery();

  const [deleteAdvanceCash] = useDeleteAdvanceCashMutation();

  const handleDeleteAdvanceCash = async (AdvanceCashID) =>{
    try {
      await deleteAdvanceCash(AdvanceCashID).unwrap();
      SuccessToast("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting AdvanceCash:", error);
    }
  };

  if (isLoading || isFetching) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  if (error || isError || !advanceCashs || advanceCashs.length === 0) {
    console.log("Error caught or no AdvanceCash");
    ErrorToast("No AdvanceCashs");
    return <div> <h2>No AdvanceCashs at the moment</h2>  </div>;
  }

  const sortedAdvanceCashs = [...advanceCashs].sort((a, b) => b.AdvanceCashID - a.AdvanceCashID);

  return (
    <div className="advanceCashList">
      <section className="advanceCashcontainer">
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Date</th>
              <th>Employee</th>
              <th>Description</th>
              <th>Advance-Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedAdvanceCashs.map((advanceCash) => (
              <tr className="details" key={advanceCash.AdvanceCashID}>                
                <td>{advanceCash.AdvanceCashID}</td>
                <td>{advanceCash.Date}</td>
                <td>{advanceCash.FirstName} {advanceCash.LastName}</td>
                <td>{advanceCash.Description}</td>
                <td>{advanceCash.AdvanceAmount}</td>
                <td>
                  <div className="action-icons">
                    <FaTrash className="icon3" onClick={() => handleDeleteAdvanceCash(advanceCash.AdvanceCashID)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdvanceCashlList;


