// import React, { useState } from 'react';
// import { useUpdatePositionsMutation } from './PositionApi';

// const UpdatePositionModal = ({ position, onUpdatePosition, onClose }) => {
//   const [updatePosition,{isLoading}] = useUpdatePositionsMutation();
//   const [updatedPosition, setUpdatedPosition] = useState({
//     ...position 
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedPosition(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updatePosition(updatedPosition).unwrap();
//       onClose(); // Close the form upon successful submission
//     } catch (error) {
//       console.error("Error in Updating the Position:", error);
//       ErrorToast("Failed to Update Position");
//     }
//     onUpdatePosition(updatedPosition);
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>Edit Overtime</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//           Poition Title:
//             <input type="text" name="Title" value={updatedPosition.Title} onChange={handleChange} />
//           </label>
//           <label>
//           BasicSalary:
//             <input type="number" name="BasicSalary" value={updatedPosition.BasicSalary} onChange={handleChange} />
//           </label>
//           <label>
//           OvertimeRate:
//             <input type="number" name="OvertimeRate" value={updatedPosition.OvertimeRate} onChange={handleChange} />
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

// export default UpdatePositionModal;
