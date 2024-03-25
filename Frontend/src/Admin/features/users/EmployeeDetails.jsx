
import React from 'react';
import { useGetEmployeeByIDQuery } from './UserApi';
import { ErrorToast, LoadingToast } from '../../Components/Toster';

const EmployeeDetailsModal = ({ isOpen, onClose, employeeID }) => {
  const { data: employee, isLoading, isError } = useGetEmployeeByIDQuery(employeeID);
//   console.log(employeeID);
// console.log('employee', employee);

  if (!isOpen) return null;

  if (isLoading) {
    return <LoadingToast message="Loading employee details..." />;
  }  
   
  if (isError || !employee || !employee[0]) { // Check if employee or employee[0] is null or undefined
    return <ErrorToast message="Failed to fetch employee details" />;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>👍</button>
        <h2>Employee Details</h2>
        <div>
          <p><strong>ID:</strong> {employee[0].EmployeeID}</p>
         <p><strong>Name:</strong> {employee[0].FirstName} {employee[0].LastName}</p>
         <p><strong>Email:</strong> {employee[0].Email}</p>
         <p><strong>Position:</strong> {employee[0].Title}</p>
         <p><strong>Schedule:</strong> {employee[0].ScheduleName}</p>
         <p><strong>AccountNumber:</strong> {employee[0].AccountNumber}</p>
         <p><strong>BasicSalary:</strong> {employee[0].BasicSalary}</p>
         <p><strong>Bio:</strong> {employee[0].Bio}</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;












// import React from 'react';
// import { useGetEmployeeByIDQuery } from './UserApi';
// import { ErrorToast, LoadingToast, ToasterContainer } from '../../Components/Toster';
// import Modal from 'react-modal';
// import './EmployeeDetails.scss'

// Modal.setAppElement('#root'); // Set the root element for accessibility

// const EmployeeDetailsModal = ({ isOpen, onClose, employeeID }) => {
//   const { data: employeeData, isLoading, isError } = useGetEmployeeByIDQuery(employeeID);
//   console.log(employeeID)

//   if (isLoading) {
//     LoadingToast("Loading");
//     return null; // Render nothing while loading
//   }

//   // if (isError || !employeeData) {
//   //   console.error("Error fetching employee details");
//   //   ErrorToast("Failed to fetch employee details");
//   //   return null; // Render nothing in case of error or no employee data
//   // }

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Employee Details"
//       className="employee-details-modal" // Apply custom class for styling
//       overlayClassName="employee-details-modal-overlay" // Apply custom overlay class for styling
//     >
//       <ToasterContainer />
//       <button className="close-button" onClick={onClose}>👍</button>
//       <h2 className="modal-title">Employee Details</h2>
//       <div className="employee-details-content">
//         {console.log(employeeData)}
//         <p><strong>ID:</strong> {employeeData[0].EmployeeID}</p>
//         <p><strong>Name:</strong> {`${employeeData[0].FirstName} ${employeeData[0].LastName}`}</p>
//         <p><strong>Email:</strong> {employeeData[0].Email}</p>
//         <p><strong>Position:</strong> {employeeData[0].Title}</p>
//         <p><strong>Schedule:</strong> {employeeData[0].ScheduleName}</p>
//         <p><strong>AccountNumber:</strong> {employeeData[0].AccountNumber}</p>
//         <p><strong>BasicSalary:</strong> {employeeData[0].BasicSalary}</p>
//         <p><strong>Bio:</strong> {employeeData[0].Bio}</p>
//       </div>
//     </Modal>
//   );
// };

// export default EmployeeDetailsModal;
