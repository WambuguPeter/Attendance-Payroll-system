import React from 'react';
import { useGetEmployeeByIDQuery } from './UserApi';
import { ErrorToast, LoadingToast, ToasterContainer } from '../../Components/Toster';
import Modal from 'react-modal';
import './EmployeeDetails.scss'

Modal.setAppElement('#root'); // Set the root element for accessibility

const EmployeeDetailsModal = ({ isOpen, onClose, EmployeeID }) => {
  const { data: employee, isLoading, isError } = useGetEmployeeByIDQuery(EmployeeID);

  if (isLoading) {
    LoadingToast("Loading");
    return null; // Render nothing while loading
  }

  if (isError || !employee) {
    console.error("Error fetching employee details");
    ErrorToast("Failed to fetch employee details");
    return null; // Render nothing in case of error or no employee data
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Employee Details"
      className="employee-details-modal" // Apply custom class for styling
      overlayClassName="employee-details-modal-overlay" // Apply custom overlay class for styling
    >
      <ToasterContainer />
      <button className="close-button" onClick={onClose}>Close</button>
      <h2 className="modal-title">Employee Details</h2>
      <div className="employee-details-content">
        <p><strong>ID:</strong> {employee.EmployeeID}</p>
        <p><strong>Name:</strong> {`${employee.FirstName} ${employee.LastName}`}</p>
        <p><strong>Email:</strong> {employee.Email}</p>
        <p><strong>Position:</strong> {employee.Title}</p>
        <p><strong>Schedule:</strong> {employee.ScheduleName}</p>
        <p><strong>AccountNumber:</strong> {employee.AccountNumber}</p>
        <p><strong>BasicSalary:</strong> {employee.BasicSalary}</p>
        <p><strong>Bio:</strong> {employee.Bio}</p>
      </div>
    </Modal>
  );
};

export default EmployeeDetailsModal;
