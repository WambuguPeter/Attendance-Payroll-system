import React, { useState, useEffect } from 'react';
import './updateEmployee.scss';
import { useGetEmployeeByIDQuery, useUpdateEmployeeMutation } from './UserApi';
import { ErrorToast, ToasterContainer } from '../../Components/Toster';

const UpdateEmployee = ({ employeeID, onClose }) => {
  const { data: employeeData, isLoading, isError } = useGetEmployeeByIDQuery(employeeID);
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Location: "",
    BirthDate: "",
    Contact: "",
    Gender: "",
    admin: "",
    PositionID: "",
    ScheduleID: "",
    Email: "",
    Password: "",
    BankName: "",
    BankBranch: "",
    AccountNumber: "",
    Bio: ""
  });

  useEffect(() => {
    if (employeeData) {
      // Set form data with employee data fetched
      setFormData(employeeData);
    }
  }, [employeeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee({ EmployeeID: employeeID, ...formData }).unwrap();
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error("Error updating employee:", error);
      ErrorToast("Failed to update employee");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    onClose(); // Close the form when close button is clicked
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching employee data</div>;

  return (
    <div className="modal">
      <section className="modal-content">
        <ToasterContainer />
        <button className="close" onClick={handleClose}>X</button>
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Update Employee Details</h2>
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label className="form-label" htmlFor={key}>{key}:</label>
              <input
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          ))}
          <button type="submit" className="form-button" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default UpdateEmployee;













// import React, { useState } from 'react';
// import './updateEmployee.scss'
// import { useUpdateEmployeeMutation
//  } from './UserApi';
//  import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';

// const EditEmployeeModal = ({ employee, onUpdateEmployee, onClose }) => {
//   const [updateEmployee,{isLoading}] = useUpdateEmployeeMutation();
//   const [updatedEmployee, setUpdatedEmployee] = useState({
//     ...employee // Initialize form data with employee details
//   });
//   const employeeID = employee.EmployeeID;
//   console.log('employee', employeeID)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedEmployee(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await updateEmployee(updatedEmployee, employeeID);
//       if (response.error) {
//         throw new Error(response.error.message);
//       }
//       SuccessToast("Employee updated successfully");
//       onClose(); // Close the form upon successful submission
//       onUpdateEmployee(updatedEmployee);
//     } catch (error) {
//       console.error("Error in updating the employee:", error);
//       ErrorToast(error.message); // Render the error message
//       onClose();
//     }
//   };
  
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>X</span>
//         <h2>Update Employee</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             First Name:
//             <input type="text" name="FirstName" value={updatedEmployee.FirstName} onChange={handleChange} />
//           </label>
//           <label>
//             Last Name:
//             <input type="text" name="LastName" value={updatedEmployee.LastName} onChange={handleChange} />
//           </label>
//           <label>
//           Location:
//             <input type="text" name="Location" value={updatedEmployee.Location} onChange={handleChange} />
//           </label>
//           <label>
//             BirthDate:
//             <input type="vachar" name="BirthDate" value={updatedEmployee.BirthDate} onChange={handleChange} />
//           </label>
//           <label>
//             Contact(Phone no):
//             <input type="tel" name="Contact" value={updatedEmployee.Contact} onChange={handleChange} />
//           </label>
//           <label>
//             Gender:
//             <input type="text" name="Gender" value={updatedEmployee.Gender} onChange={handleChange} />
//           </label>
//           <label>
//             Admin:
//             <input type="radio" name="admin" value="true" checked={updatedEmployee.admin === true} onChange={handleChange} />
//             Yes
//           </label>
//           <label>
//             <input type="radio" name="admin" value="false" checked={updatedEmployee.admin === false} onChange={handleChange} />
//             No
//           </label>
//           <label>
//             PositionID:
//             <input type="number" name="PositionID" value={updatedEmployee.PositionID} onChange={handleChange} />
//           </label>
//           <label>
//             ScheduleID:
//             <input type="number" name="ScheduleID" value={updatedEmployee.ScheduleID} onChange={handleChange} />
//           </label>
//           {/* <label>
//             PhotoURL:
//             <input type=" " name="PhotoURL" value={updatedEmployee.PhotoURL} onChange={handleChange} />
//           </label> */}
//           <label>
//             Email:
//             <input type="email" name="Email" value={updatedEmployee.Email} onChange={handleChange} />
//           </label>
//           <label>
//             Password:
//             <input type="password" name="Password" value={updatedEmployee.Password} onChange={handleChange} />
//           </label>
//           <label>
//           BankName:
//             <input type="text" name="text" value={updatedEmployee.text} onChange={handleChange} />
//           </label>
//           <label>
//             BankBranch:
//             <input type="text" name="BankBranch" value={updatedEmployee.BankBranch} onChange={handleChange} />
//           </label>
//           <label>
//             AccountNumber:
//             <input type="number" name="AccountNumber" value={updatedEmployee.AccountNumber} onChange={handleChange} />
//           </label>
//           <label>
//             Bio:
//             <input type="text" name="Bio" value={updatedEmployee.Bio} onChange={handleChange} />
//           </label>
         
//           <div className="buttons">
//             <button type="submit">Update</button>
//             <button type="button" onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditEmployeeModal;
