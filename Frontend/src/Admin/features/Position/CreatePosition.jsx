// import React, { useState } from 'react';
// import { useAddPositionMutation } from './PositionApi';
// import { ErrorToast, ToasterContainer } from '../../Components/Toster';

// const AddPosition = ({ onClose }) => {
//   const [addPosition, { isLoading }] = useAddPositionMutation();
//   const [formData, setFormData] = useState({
//     Title: "",
//     BasicSalary: "",
//     OvertimeRate: ""
   
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addPosition(formData).unwrap();
//       onClose(); // Close the form upon successful submission
//     } catch (error) {
//       console.error("Error adding Position:", error);
//       ErrorToast("Failed to add Position");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <section className="addPosition">
//       <ToasterContainer />
//       <h2>Add a New OverTime</h2>
//       <form onSubmit={handleSubmit} className="form">
//         {/* Input fields */}
//         {Object.keys(formData).map((key) => (
//           <label className="form-input" htmlFor={key} key={key}>
//             {key}:
//             <input
//               id={key}
//               name={key}
//               value={formData[key]}
//               onChange={handleChange}
//             />
//           </label>
//         ))}
//         <button type="submit">{isLoading ? "Loading" : "Save"}</button>
//       </form>
//     </section>
//   );
// };

// export default AddPosition;
