import React, { useState } from 'react';
import RotateLoader from "react-spinners/RotateLoader";
import { useGetPayrollsByIDQuery } from '../../Admin/features/Payroll/PayrollApi';
// import PayrollDetailsModal from './PayrollDetails';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Admin/Components/Toster';

const payrollList = () => {
  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;

  const {
    data: payrolls,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetPayrollsByIDQuery(employeeID);

//   console.log(payrolls)

//   const [deleteOvertime] = useDeleteOvertimeMutation();
//   const [updateSchedule] = useUpdateSchedulesMutation();
//   const [editScheduleData, setEditScheduleData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility



  if (isLoading || isFetching) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  if (error || isError || !payrolls || payrolls.length === 0) {
    console.log("Error caught or no Payrolls");
    ErrorToast("No Payrolls");
    return <div> <h2>No Payrolls at the moment</h2>  </div>;
  }
  const sortedPayrolls = [...payrolls].sort((a, b) => b.PayrollID - a.PayrollID);

//   const handleDeleteOvertime = async (PayrollID) =>{
//     console.log(PayrollID)
//     try {
//       await deleteOvertime(PayrollID).unwrap();
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

// const handleViewPayrollDetails = (PayrollID) => {
//     setSelectedEmployeeID(PayrollID); 
//     // console.log(PayrollID)
//   };

  return (
    <div className="payrollList">
      <ToasterContainer />
      <section className="payrollcontainer">
        <table>
          <thead>
            <tr className="titles">
              {/* <th>ID</th> */}
              <th>Date</th>
              <th>Employee</th>
              <th>GrossPay</th>
              <th>TotalDeductions</th>
              <th>NetPay</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayrolls.map((payroll) => (
              <tr className="details" key={payroll.PayrollID}>                
                {/* <td>{payroll.EmployeeID}</td> */}
                <td>{payroll.PayrollDate}</td>
                <td>{payroll.FirstName} {payroll.LastName} </td>
                <td>{payroll.GrossPay}</td>
                <td>{payroll.TotalDeductions}</td>
                <td>{payroll.NetPay}</td>
                <td>
                  <div className="action-icons">
                    <FaEye className="icon1"  />
                    {/* <FaEye className="icon1" onClick={() => handleViewPayrollDetails(payroll.PayrollID)} /> */}
                    {/* <FaEdit className="icon2" onClick={() => handleEditSchedule(payroll)} /> */}
                    {/* <FaTrash className="icon3" onClick={() => handleDeletepayroll(payroll.PayrollID)} /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* <PayrollDetailsModal
      isOpen={selectedEmployeeID !== null}
      onClose={() => setSelectedEmployeeID(null)}
      PayrollID={selectedEmployeeID}
       /> */}

    </div>
  );
};

export default payrollList;
