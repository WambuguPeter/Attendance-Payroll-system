import React, { useState } from 'react';
import { useAddAdvanceCashMutation } from './AdvanceCashApi';
import { ErrorToast, LoadingToast, SuccessToast } from '../../Components/Toster';

const AddAdvanceCash = ({ onClose }) => {
  const [addAdvanceCash, { isLoading }] = useAddAdvanceCashMutation();
  const [formData, setFormData] = useState({
    EmployeeID: "",
    Description: "",
    AdvanceAmount: ""
  });
// console.log('formData', formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAdvanceCash(formData).unwrap();
      SuccessToast("Added Successfully")
      onClose();
       // Close the form upon successful submission
    } catch (error) {
      console.error("Error adding AdvanceCash:", error);
      ErrorToast("Failed to add AdvanceCash");
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="modal">
    <section className="modal-content ">
      <h2>Add a New AdvanceCash</h2>
      <form onSubmit={handleSubmit} className="form">
        {Object.keys(formData).map((key) => (
          <label className="form-input" htmlFor={key} key={key}>
            {key}:
            <input
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </label>
        ))}
        <button type="submit">{isLoading ? "Loading" : "Save"}</button>
      </form>
    </section>
    </div>
  );
};

export default AddAdvanceCash;
