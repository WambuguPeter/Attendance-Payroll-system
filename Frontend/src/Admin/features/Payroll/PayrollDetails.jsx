import React from 'react';
import './PayrollDetails.scss'
import { useGetPayrollsByIDQuery } from './PayrollApi';
import { ErrorToast, LoadingToast, ToasterContainer } from '../../Components/Toster';
import Modal from 'react-modal';


Modal.setAppElement('#root'); // Set the root element for accessibility

const PayrollDetailsModal = ({ isOpen, onClose, PayrollID }) => {
  const { data: payrollData, isLoading, isError } = useGetPayrollsByIDQuery(PayrollID);
  console.log(PayrollID)
 console.log(payrollData)

  if (isLoading) {
    LoadingToast("Loading");
    return null; // Render nothing while loading
  }

  // if (isError || !payrollData) {
  //   console.error("Error fetching employee details");
  //   ErrorToast("Failed to fetch employee details");
  //   return null; // Render nothing in case of error or no employee data
  // }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Payroll Details"
      className="payroll-details-modal" // Apply custom class for styling
      overlayClassName="payroll-details-modal-overlay" // Apply custom overlay class for styling
    >
      <ToasterContainer />
      <button className="close-button" onClick={onClose}>👍</button>
      <h2 className="modal-title">Payroll Details</h2>
      <div className="payroll-details-content">
      
      {/* console.log(data); */}
        
        {/* <p><strong>EmployeeID:</strong> {payrollData.PayrollID}</p> */}
        {/* <p><strong>Name:</strong> {payrollData.FirstName} {payrollData.LastName}</p>
        <p><strong>Email:</strong> {payrollData.Email}</p>
        <p><strong>Position:</strong> {payrollData.Title}</p>
        <p><strong>Schedule:</strong> {payrollData.ScheduleName}</p>
        <p><strong>AccountNumber:</strong> {payrollData.AccountNumber}</p>
        <p><strong>BasicSalary:</strong> {payrollData.BasicSalary}</p>
        <p><strong>Bio:</strong> {payrollData.Bio}</p> */}
      </div>
    </Modal>
  );
};

export default PayrollDetailsModal;
