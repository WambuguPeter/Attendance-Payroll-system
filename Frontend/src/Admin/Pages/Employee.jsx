import "./Employee.scss"
import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import addEmployee from "../features/users/CreateEmp";
import EmployeesList from "../features/users/UserList";
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

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId).unwrap();
    } catch (err) {
      console.error('Failed to delete employee:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className='employeePage'>
      <div className="header1">
        <h1>Employees</h1>
        <div className="generate">
          <span onClick={toggleModal}>+ add</span>
         
        </div>
      </div>
      <div className="employeeList">
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