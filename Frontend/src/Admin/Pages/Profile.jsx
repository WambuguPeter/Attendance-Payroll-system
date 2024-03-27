import React from 'react';
import './Profile.scss'
import { useGetEmployeeByIDQuery } from '../features/users/UserApi';
import { LoadingToast, ErrorToast } from '../Components/Toster' // Assuming you have these components for displaying loading and error messages

const Profile = () => {
  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;
// console.log('employeeID', employeeID)
  const { data: employee, isLoading, isError } = useGetEmployeeByIDQuery(employeeID);
// console.log('employee', employee)
  if (isLoading) {
      return <LoadingToast message="Loading" />;
  }

  if (isError || !employee) {
      return <ErrorToast message="Failed to fetch employee details" />;
  }

    return (
      <div>
        <div className="header1">
        <h1>Profile.</h1>
         <div className="generate">
           <span>Edit</span>
         </div>
       </div>
      <div className="content2">
      <h2>Profile</h2>
      <div className="mydetails">
        {/* <div className="left">
        {employee[0].PhotoURL}
        <p>my photo</p>
        </div> */}
        <div className="right">
          <p><strong>Emp-ID: </strong>{employeeID}</p>
          <p><strong>Name: </strong> {`${employee[0].FirstName} ${employee[0].LastName}`}</p>
          <p><strong>Email: </strong>{employee[0].Email}</p>
          <p><strong>Contact: </strong>{employee[0].Contact}</p>
          <p><strong>Position: </strong>{employee[0].Title}</p>
          <p><strong>Schedule: </strong>{employee[0].ScheduleName}</p>
          <p><strong>Bio: </strong>{employee[0].Bio}</p>

        </div>
      </div>
            
       </div>

      
     </div>
    );    
};

export default Profile;


