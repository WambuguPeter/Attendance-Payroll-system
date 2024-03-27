import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Route } from "react-router-dom";
import { useState } from "react";
import "./Login.scss";
import { ErrorToast,
  LoadingToast,
  SuccessToast, } from "../Admin/Components/Toster";
import { Link, useNavigate } from "react-router-dom";
import { useLoginEmployeeMutation } from "../Admin/features/users/UserApi";

 
const Login = () => {

  const [loginEmployee, { isLoading }] = useLoginEmployeeMutation();

  const navigate = useNavigate();
  const schema = yup.object().shape({
    Email: yup.string().required("Username is required"),
    Password: yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
 
  const onSubmit = async (data) => {
    try {
      LoadingToast("Logging in...");
      const response = await loginEmployee(data).unwrap();
      SuccessToast(response.message);
      console.log("Response: ", response);
      if (!response.error) {
        const { token, userDetails } = response;
        localStorage.setItem("token", token);
        localStorage.setItem("employeeDetails", JSON.stringify(userDetails));
        LoadingToast(false);
        // SuccessToast(response.message);
        userDetails.admin == true ? navigate("/MainContainer") : navigate("/MainClient");
      } else {
        console.log(response.error.data.message);
        ErrorToast(response.error.data.message);
      }
    } catch (error) {
      console.log(error);
      // ErrorToast(error.data.message);
      ErrorToast('Logging failed');
      LoadingToast(false);

    }
  };
  if (isLoading) {
    return <div>{LoadingToast("false")}</div>;
  } else{
    LoadingToast(false)
  }

  return (
    <div className="loginpage">
      <div className="login-card">

      <div className="form">
        <div className="title">
        
        </div>
        <form action="" className="login" onSubmit={handleSubmit(onSubmit)}>
          <h1>Welcome Back</h1>
          <h1>TillHappens.</h1>
          <input
            type="text"
            name="Email"
            id="Email"
            placeholder="Enter your Email..."
            {...register("Email")}
          />
          <p>{errors.Email?.message}</p>
          <input
            type="password"
            name="Password"
            id="Password"
            placeholder="Enter your Password..."
            {...register("Password")}
          />
          <p>{errors.Password?.message}</p>
          <input type="submit" value="Login" className="loginbtns" />
        </form>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      </div>
     
    </div>
  );
};
 
export default Login;

