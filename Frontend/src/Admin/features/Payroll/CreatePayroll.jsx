import React, { useState } from 'react';
import { useAddPayrollMutation } from './PayrollApi';
import { ErrorToast, LoadingToast, SuccessToast, ToasterContainer } from '../../Components/Toster';

const AddPayroll = ({ onClose }) => {
  const [addPayroll, { isLoading }] = useAddPayrollMutation();
  const [formData, setFormData] = useState({
    EmployeeID: ""
  });
console.log('formData', formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPayroll(formData).unwrap();
      SuccessToast(response.message)
      onClose();
       // Close the form upon successful submission
    } catch (error) {
      console.error("Error adding Payroll:", error);
      ErrorToast("Failed to add Payroll");
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
      <h2>Add a New Payroll</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Input fields */}
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

export default AddPayroll;
