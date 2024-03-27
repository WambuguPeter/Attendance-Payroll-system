import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useGetForgotByEmailQuery } from "../Admin/features/users/UserApi";
import { LoadingToast, SuccessToast, ErrorToast } from "../Admin/Components/Toster";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: employeeData, isLoading: isEmployeeLoading, isError: isEmployeeError } = useGetForgotByEmailQuery(selectedEmail, { skip: true });
  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      
      // Trigger the query to get employee by email
      await employeeData.refetch({ Email: formData.email });
      
      setIsLoading(false);
      
      if (employeeData.data) {
        // Send password recovery email
        // Assuming you have an API endpoint to send password recovery email
        // You can call it here passing the email address
        SuccessToast("Password recovery email sent successfully.");
        navigate('/');
      } else {
        ErrorToast("Employee with this email does not exist.");
      }
    } catch (error) {
      setIsLoading(false);
      ErrorToast("Failed to fetch employee data.");
      navigate('/');
    }
  };
  
//   SuccessToast("check on your Email.");
  return (
    <div className="forgot-password">
        <div className="login-card">

      <form className="forgot" onSubmit={handleSubmit(onSubmit)}>
      <h2>Forgot Password</h2>
        <input type="email" name="email" placeholder="Enter your email" {...register("email")} />
        <p>{errors.email?.message}</p>
        <button className="loginbtns" type="submit">Submit</button>
      </form>
      <Link to="/">Back to Login</Link>
        </div>
    </div>
  );
};

export default ForgotPassword;
