import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Route } from "react-router-dom";
import "./Login.scss";
import { ToasterContainer,
  ErrorToast,
  LoadingToast,
  SuccessToast, } from "./Toster";
import { useNavigate } from "react-router-dom";
import { useLoginEmployeeMutation } from "../Admin/features/users/UserApi";
import MainContainer from "../Admin/Layouts/MainContainer";
import MainClient from "../Employee/Layouts/MainClient";

 
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
 
  // const userDetails = localStorage.getItem()
  const onSubmit = async (data) => {
    try {
      LoadingToast(true);
      const response = await loginEmployee(data).unwrap();
      console.log("Response: ", response);
      if (!response.error) {
        const { token, userDetails } = response;
        localStorage.setItem("token", token);
        localStorage.setItem("employeeDetails", JSON.stringify(userDetails));
        LoadingToast(false);
        SuccessToast("Login successful");
      //   {admin=true ? ( <Route path="/MainContainer" element={<MainContainer/>} />)
      // :(<Route path="/MainClient" element={<MainClient/>} />)} 
        userDetails.admin == true ? navigate("/MainContainer") : navigate("/MainClient");
        // navigate("*")
      } else {
        console.log(response.error.data.message);
        ErrorToast(response.error.data.message);
      }
    } catch (error) {
      LoadingToast(false);
      console.log(error);
      // ErrorToast(error.data.message);
      ErrorToast('Logging failed');

    }
  };
  if (isLoading) {
    return <div>{LoadingToast(true)}</div>;
  }
  return (
    <div className="loginpage">
      <ToasterContainer />
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
      </div>
      </div>
    </div>
  );
};
 
export default Login;


// import './Login.scss'
// import { useNavigate } from 'react-router-dom'
// import { useLoginEmployeeMutation } from '../Admin/features/users/UserApi';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const Login = () => {
//     const navigate = useNavigate();


//   return (
//     <div className='loginPage'>
//         <div className="login-card">
//         <form >
//         <h1>Staff Portal</h1>
//             <input type="text" placeholder='Enter the Employee ID' />
//             <input type="text" placeholder='Password' />
//         </form>
//         <div className="loginbtns">
//         <button onClick={() => navigate('/LoginAdmin')} >As Admin</button>
//         <button onClick={() => navigate('/MainClient')} >Login</button>

//         </div>
            
//         </div>
//     </div>
//   )
// }

// export default Login