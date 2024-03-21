import React from 'react';
import './Profile.scss'
import { useGetEmployeeByIDQuery } from '../features/users/UserApi';
import { LoadingToast, ErrorToast } from '../Components/Toster' // Assuming you have these components for displaying loading and error messages

const Profile = () => {
  const employeeID = localStorage.getItem('EmployeeID');

  const { data: employee, isLoading, isError } = useGetEmployeeByIDQuery(employeeID);

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
      <div className="content1">
      <h2>Profile</h2>
            <p>ID: {employee.EmployeeID}</p>
            <p>Name: {`${employee.FirstName} ${employee.LastName}`}</p>
            <p>Email: {employee.Email}</p>
            {/* Add more details as needed */}

       </div>

      
     </div>
    );    
};

export default Profile;






// import React from 'react'
// import './Profile.scss'

// const Profile = () => {
//   return (
//     <div>
//        <div className="header1">
//         <h1>Profile.</h1>
//         <div className="generate">
//           <span>Edit</span>
//         </div>
//       </div>
//       <div className="content1">
//       Profile

//       </div>

      
//     </div>
//   )
// }

// export default Profile