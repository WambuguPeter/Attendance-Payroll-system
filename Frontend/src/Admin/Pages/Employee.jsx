import "./Employee.scss"
import React, { useState } from 'react';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import AddEmployee from "../features/users/CreateEmp";
import EmployeesList from "../features/users/UserList";
import { LoadingToast, ErrorToast, SuccessToast } from "../Components/Toster";
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from "../features/users/UserApi";

const Employee = () => {


  const {
    data: employees,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetEmployeesQuery({ refetchOnReconnect: true });

  const [isOpen, setIsOpen] = useState(false);
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);}

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId).unwrap();      
      SuccessToast("Employee deleted successfully");
    } catch (err) {
      console.error('Failed to delete employee:', err);
      ErrorToast("Failed to delete employee");
    }
  };

  if (isLoading) {
    LoadingToast("Loading employees...");
    return <div>Loading...</div>;}

if (error){
  ErrorToast("Failed to fetch employees");
   return <div>Error: {error.message}</div>;}


  return (
    <div className='employeePage'>
      <div className="header1">
        <h1>Employees</h1>
        <div className="generate">
          <span onClick={toggleForm}>+ add</span>
        </div>
        
      </div>
      <div className="list">
          {showForm && <AddEmployee onClose={toggleForm} />}
     
      <EmployeesList employees={employees} onDeleteEmployee={handleDeleteEmployee} />
       
      </div>
    </div>
  );
};

export default Employee;










// import React from 'react'
// // import EmployeesList from '../features/users/UserList'
// const Employee = () => {

//   return (
//     <div className='employeePage'>
//       <div className="header1">
//         <h1>Employees.</h1>
//         <div className="generate">
//           <span>+ Add</span>
//         </div>
//       </div>
//       {/* <EmployeesList/> */}


//     </div>
//   )
// }

// export default Employee;