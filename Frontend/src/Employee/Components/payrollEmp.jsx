import React, { useState } from 'react';
import RotateLoader from "react-spinners/RotateLoader";
import { useGetPayrollsByEmpIDQuery, useGetPayrollsByIDQuery } from '../../Admin/features/Payroll/PayrollApi';
import PayrollDetails from '../../Admin/features/Payroll/PayrollDetails';
import { FaEye, FaTrash } from 'react-icons/fa';
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
  } = useGetPayrollsByEmpIDQuery(employeeID);

  console.log(payrolls)
  const [selectedPayrollID, setSelectedPayrollID] = useState(null);

  const { data: payrollDetails, isLoading: detailsLoading } = useGetPayrollsByIDQuery(selectedPayrollID, {
    skip: !selectedPayrollID, // Skip fetching if no payroll ID is selected
  });


  const handleShowDetails = (PayrollID) => {
    setSelectedPayrollID(PayrollID);
  };

  const handleDeletePayroll = async (PayrollID) =>{
    try {
      await deletePayroll(PayrollID).unwrap();
      SuccessToast("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting Payroll:", error);
    }
  };


  // if (isLoading || isFetching) {
  //   LoadingToast("Loading");
  //   return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  // }

  if (error || isError || !payrolls || payrolls.length === 0) {
    console.log("Error caught or no Payrolls");
    ErrorToast("No Payrolls");
    return <div> <h2>Yet to be payed</h2>  </div>;
  }
  const sortedPayrolls = [...payrolls].sort((a, b) => b.PayrollID - a.PayrollID);


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
                    <FaEye className="icon1" onClick={() => handleShowDetails(payroll.PayrollID)} />
                    <FaTrash className="icon3" onClick={() => handleDeletePayroll(payroll.PayrollID)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {selectedPayrollID && (
        <PayrollDetails
          payrollID={selectedPayrollID}
          onClose={() => setSelectedPayrollID(null)}
          isLoading={detailsLoading}
        />
      )}

    </div>
  );
};

export default payrollList;

