import React, { useState } from 'react';
import RotateLoader from "react-spinners/RotateLoader";
import { useDeleteEmployeeMutation, useGetEmployeesQuery,useGetEmployeeByIDQuery } from "./UserApi";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';
import EditEmployeeModal from './updateEmployee';
import EmployeeDetailsModal from './EmployeeDetails';
import UpdateEmployee from './updateEmployee'; // Import UpdateEmployee component

const EmployeesList = () => {
  const { data: employees, error, isLoading, isError, isFetching } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null); // State to track the selected employee ID

  // Handle edit employee
  const handleEditEmployee = (employee) => {
    setEditEmployeeData(employee);
    setIsModalOpen(true); // Open the modal when editing an employee
  };
  const { data: singleEmployeeData, isLoading: isSingleEmployeeLoading, isError: isSingleEmployeeError } = useGetEmployeeByIDQuery(selectedEmployeeID);

   if (isLoading || isFetching) {
    // Render loading indicator or toast
    return (
      <>
        {LoadingToast("Loading")} {/* Assuming LoadingToast returns a message object */}
        <RotateLoader color="#36d7b7" loading={true} size={15} />
      </>
    );
  }

  if (error || isError || !employees || employees.length === 0) {
    // Render error message or toast
    return (
      <div>
        {ErrorToast("No Employee")} {/* Assuming ErrorToast returns a message object */}
        <h2>No Employees at the moment</h2>
      </div>
    );
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

  const handleEditEmployee1 = (employee) => {
    setEditEmployeeData(employee);
    setIsModalOpen(true); // Open the modal when editing an employee
  };

  const handleViewEmployeeDetails = (employeeID) => {
    if (employeeID) {
      setSelectedEmployeeID(employeeID);
      setIsModalOpen(true);
    }
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
                      {/* <FaEdit className="icon2" onClick={() => handleEditEmployee(employee)} /> */}
                      <FaTrash className="icon3" onClick={() => handleDeleteEmployee(employee.EmployeeID)} />
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <EmployeeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employeeID={selectedEmployeeID}
      />
    {editEmployeeData && (
        <UpdateEmployee
          employeeID={editEmployeeData.EmployeeID}
          onClose={() => {
            setEditEmployeeData(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default EmployeesList;
