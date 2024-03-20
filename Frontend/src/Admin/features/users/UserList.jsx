import React, { useState } from 'react';
import RotateLoader from "react-spinners/RotateLoader";
import { useDeleteEmployeeMutation, useGetEmployeesQuery, useUpdateEmployeeMutation, useGetEmployeeByIDQuery } from "./UserApi";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';
import EditEmployeeModal from './updateEmployee';
import EmployeeDetailsModal from './EmployeeDetails';

const EmployeesList = () => {
  const { data: employees, error, isLoading, isError, isFetching } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null); // State to track the selected employee ID

  const { data: singleEmployeeData, isLoading: isSingleEmployeeLoading, isError: isSingleEmployeeError } = useGetEmployeeByIDQuery(selectedEmployeeID);

  if (isLoading || isFetching || isSingleEmployeeLoading) {
    LoadingToast("Loading");
    return <RotateLoader color="#36d7b7" loading={true} size={15} />;
  }

  if (error || isError || !employees || employees.length === 0) {
    console.log("Error caught or no Employee");
    ErrorToast("No Employee");
    return <div> <h2>No Employees at the moment</h2>  </div>;
  }
  const sortedEmployees = [...employees].sort((a, b) => b.EmployeeID - a.EmployeeID);

  const handleDeleteEmployee = async (EmployeeID) =>{
    try {
      await deleteEmployee(EmployeeID).unwrap();
      SuccessToast("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditEmployeeData(employee);
    setIsModalOpen(true); // Open the modal when editing an employee
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      await updateEmployee(updatedEmployee).unwrap();
      SuccessToast("Employee details updated successfully");
      setIsModalOpen(false); // Close the modal after updating employee details
    } catch (error) {
      console.error("Error updating employee:", error);
      ErrorToast("Failed to update employee details");
    }
  };

  const handleViewEmployeeDetails = (EmployeeID) => {
    setSelectedEmployeeID(EmployeeID); // Set the selected employee ID
  };

  return (
    <div className="employeesList">
      <ToasterContainer />
      <section className="employeescontainer">
        <table>
          <thead>
            <tr className="titles">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => (
              <tr className="details" key={employee.EmployeeID}>
                <td>{employee.EmployeeID}</td>
                <td>{`${employee.FirstName} ${employee.LastName}`}</td>
                <td>{employee.Email}</td>
                <td>{employee.Title}</td>
                <td>{employee.ScheduleName}</td>
                <td>
                  <div className="action-icons">
                    <FaEye className="icon1" onClick={() => handleViewEmployeeDetails(employee.EmployeeID)}/>
                    <FaEdit className="icon2" onClick={() => handleEditEmployee(employee)} />
                    <FaTrash className="icon3" onClick={() => handleDeleteEmployee(employee.EmployeeID)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <EmployeeDetailsModal
        isOpen={selectedEmployeeID !== null}
        onClose={() => setSelectedEmployeeID(null)}
        employeeID={selectedEmployeeID}
        singleEmployeeData={singleEmployeeData}
        isLoading={isSingleEmployeeLoading}
        isError={isSingleEmployeeError}
      />
      {isModalOpen && (
        <EditEmployeeModal
          employee={editEmployeeData}
          onUpdateEmployee={handleUpdateEmployee}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}
    </div>
  );
};

export default EmployeesList;
