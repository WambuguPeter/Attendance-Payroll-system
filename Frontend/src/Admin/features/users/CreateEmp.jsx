import React, { useState } from 'react';
import './CreateEmp.scss';
import { useAddEmployeeMutation } from './UserApi';
import { ErrorToast, ToasterContainer } from '../../Components/Toster';

const AddEmployee = ({ onClose }) => {
  const [addEmployee, { isLoading }] = useAddEmployeeMutation();
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
    PhotoURL: "",
    Email: "",
    Password: "",
    BankName: "",
    BankBranch: "",
    AccountNumber: "",
    Bio: ""
  });
  const [file, setFile] = useState(null); // State for file

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload the file to Cloudinary
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'wdfjbcug');
      data.append('cloud_name', 'diyuy63ue');
      
      const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/diyuy63ue/image/upload", {
        method: 'POST',
        body: data
      });
      
      const responseJson = await cloudinaryRes.json();
      if (cloudinaryRes.ok) {
        const { secure_url } = responseJson;
        setFormData({ ...formData, PhotoURL: secure_url }); // Update PhotoURL in form data
      } else {
        console.error("Cloudinary upload failed:", responseJson);
        throw new Error("Failed to upload image to Cloudinary");
      }

      // Add employee using form data
      await addEmployee(formData).unwrap();
      onClose(); // Close the form upon successful submission
    } catch (error) {
      console.error("Error adding employee:", error);
      ErrorToast("Failed to add employee");
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleClose = () => {
    onClose(); // Close the form when close button is clicked
  };

  return (
    <div className="modal">
      <section className="modal-content">
        <ToasterContainer />
        <button className="close" onClick={handleClose}>X</button>
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Add New Employee</h2>
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
              {key === "PhotoURL" && (
                <input
                  type="file"
                  name="PhotoURL"
                  onChange={handleFileChange}
                  className="form-input"
                />
              )}
            </div>
          ))}
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Save"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddEmployee;




// import React, { useState } from 'react';
// import './CreateEmp.scss';
// import { useAddEmployeeMutation } from './UserApi';
// import { SuccessToast, ErrorToast, LoadingToast } from '../../Components/Toster';
// import { RxDashboard } from "react-icons/rx";
 
// const AddEmployee = ({ closeEmployee }) => {
//     const [formData, setFormData] = useState({
//       FirstName: "",
//       LastName: "",
//       Location: "",
//       BirthDate: "",
//       Contact: "",
//       Gender: "",
//       admin: "",
//       PositionID: "",
//       ScheduleID: "",
//       PhotoURL :"",
//       file: {},
//       Email: "",
//       Password: "",
//       BankName: "",
//       BankBranch: "",
//       AccountNumber: "",
//       Bio: ""


//     });
//     const [file, setFile] = useState(null)
 
//     const [addEmployee, { isLoading, error }] = useAddEmployeeMutation();
 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
 
//         const data = new FormData();
//         const file_data = file;
//         data.append('file', file_data);
//         data.append('upload_preset', 'wdfjbcug');
//         data.append('cloud_name', 'diyuy63ue');
 
 
 
//         const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/diyuy63ue/image/upload", {
//             method: 'POST',
//             body: data
//         });
 
//         const responseJson = await cloudinaryRes.json();
//         if (cloudinaryRes.ok) {
//             const { secure_url } = responseJson
//             formData.PhotoURL = secure_url
//         }
//         else {
//             console.error("Cloudinary upload failed:", responseJson);
//         }
 
//         try {
//             console.log("form data ", formData);
//             const response = await addEmployee(formData).unwrap();
//             SuccessToast(response.message);
//             closeEmployee();
//             setFormData({
//               FirstName: "",
//               LastName: "",
//               Location: "",
//               BirthDate: "",
//               Contact: "",
//               Gender: "",
//               admin: "",
//               PositionID: "",
//               ScheduleID: "",
//               PhotoURL :"",
//               file: null,
//               Email: "",
//               Password: "",
//               BankName: "",
//               BankBranch: "",
//               AccountNumber: "",
//               Bio: ""
//             });
//         } catch (err) {
//             ErrorToast(response.message);
//         }
//     };
//     const handleChange = (e) => {
//         if (e.target.type === 'file') {
//             const file = e.target.files[0];
//             setFormData({ ...formData, [e.target.name]: file }); // Update the state with the file
//         } else {
//             const { name, value } = e.target;
//             setFormData({ ...formData, [name]: value }); // Update the state with other form fields
//         }
//         console.log("new state is ", formData);
//     };
 
 
//     return (
//         <div>
//             <div className="form-container">
//                 <form className='eventWrap' onSubmit={handleSubmit}>
//                     <div className="btn">
//                         {/* <button onClick={closeEmployee}>X</button> */}
//                     </div>
//                     <div className="textarea">
                        
//                          <input
//                             type="text"
//                             placeholder="First Name"
//                             name="Firstname"
//                             value={formData.FirstName}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Last Name"
//                             name="Lastname"
//                             value={formData.LastName}
//                             onChange={handleChange}
//                         />
//                              <input
//                             type="text"
//                             placeholder="Location"
//                             name="Location"
//                             value={formData.Location}
//                             onChange={handleChange}
//                         />
//                          <input
//                             type="date"
//                             placeholder="Date of Birth"
//                             name="BirthDate"
//                             value={formData.BirthDate}
//                             onChange={handleChange}
//                         />
//                         <input
//                        type="text"
//                        placeholder="Contact"
//                        name="Contact"
//                        value={formData.Contact}
//                        onChange={handleChange}
//                    />
                  
//                              <input
//                             type="text"
//                             placeholder="Gender"
//                             name="Gender"
//                             value={formData.Gender}
//                             onChange={handleChange}
//                         />
//                              <input
//                             type="boolean"
//                             placeholder="admin"
//                             name="admin"
//                             value={formData.admin}
//                             onChange={handleChange}
//                         />
                       
//                         <input
//                             type="text"
//                             placeholder="PositionID"
//                             name="PositionID"
//                             value={formData.PositionID}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="text"
//                             placeholder="ScheduleID"
//                             name="ScheduleID"
//                             value={formData.ScheduleID}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="file"
//                             placeholder="Photo URL"
//                             name="PhotoURL"
//                             onChange={(e) => {
//                                 const file = e.target.files[0]; 
//                                 setFile(file)
                                
//                             }}
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             name="Email"
//                             value={formData.Email}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             name="Password"
//                             value={formData.Password}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="text"
//                             placeholder="BankName"
//                             name="BankName"
//                             value={formData.BankName}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="text"
//                             placeholder="BankBranch"
//                             name="BankBranch"
//                             value={formData.BankBranch}
//                             onChange={handleChange}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Account Number"
//                             name="AccountNumber"
//                             value={formData.AccountNumber}
//                             onChange={handleChange}
//                         />
                        
 
//                         <input
//                             type="text"
//                             placeholder="Bio"
//                             name="Bio"
//                             value={formData.Bio}
//                             onChange={handleChange}
//                         />                    
                                               
                       
//                         <div className="footer">
//                             <div className="btn">
//                                 <button type="submit" disabled={isLoading}>Save</button>
//                                 {isLoading && <LoadingToast />}
//                                 {error && <ErrorToast message={error.message} />}
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
 
// export default AddEmployee;



