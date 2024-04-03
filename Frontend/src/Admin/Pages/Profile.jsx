import './Profile.scss'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUpload } from "react-icons/fa6";
import { useGetEmployeeByIDQuery, useUploadMutation, useUpdateEmployeeMutation } from '../features/users/UserApi';
import { LoadingToast, ErrorToast, SuccessToast } from '../Components/Toster'; // Assuming you have these components for displaying loading, error, and success messages

const Profile = () => {
  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;
  console.log('employeeID', employeeID)
  const { data: employee, isLoading, isError } = useGetEmployeeByIDQuery(employeeID);

  const [switchTab, setSwitchTab] = useState(false);
  const [file, setFile] = useState(null);
  const [upload] = useUploadMutation();
  const [updateUser] = useUpdateEmployeeMutation();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: employeeDetails.username,
      email: employeeDetails.email,
    },
  });

  const validateImage = (file) => {
    console.log('file', file)
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (validTypes.indexOf(file.type) === -1) {
        setFile(null);
        ErrorToast('Invalid file type. Please upload an image with .jpeg, .jpg, or .png extension.');
        return false;
      } else {
        return true;
      }
    }
  }

  useEffect(() => {
    validateImage(file);
  }, [file]);

  if (isLoading) {
    return <LoadingToast message="Loading" />;
  }

  if (isError || !employee) {
    return <ErrorToast message="Failed to fetch employee details" />;
  }

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await upload(formData);
      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  }

  const onSubmitProfile = async (data) => {
    console.log('data', data)
    LoadingToast(true);
    try {
      if (!file) {
        throw new Error('Please select an image to upload.');
      }
      const imageUrl = await uploadImage(file);
      console.log('imageUrl', imageUrl);
  
      const updatedEmployeeData = {
        ...employeeDetails, // Retain other employee details
        img_url: imageUrl, // Add the image URL
        username: data.username, // Update the username from the form
        email: data.email, // Update the email from the form
      };
  
      const res = await updateUser(updatedEmployeeData).unwrap();
      console.log('updatedEmployeeData', updatedEmployeeData)
      if (res.message) {
        localStorage.setItem('employeeDetails', JSON.stringify(updatedEmployeeData)); // Update employee details in local storage
        SuccessToast(res.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      ErrorToast(error.message);
    } finally {
      LoadingToast(false);
    }
  }
  
  return (
    <div>
      <div className="header1">
        <h1>Profile.</h1>
        <div className="generate1">
          <button className={switchTab === false ? "generate" : "visit-profileBtn"} onClick={() => setSwitchTab(!switchTab)}>
            {switchTab === true ? "View" : "Update"}
          </button>
        </div>
      </div>
      {switchTab === false ? (
        <div className="content2">
          <h2>Profile</h2>
          <div className="mydetails">
            <div className="left">
              {employee[0].PhotoURL ? <img src={employee[0].PhotoURL} alt="nopic" /> : <img src="https://via.placeholder.com/150" alt="profile" />}
              <p>my photo</p>
            </div>
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
      ) : (
        <div className="update-profile">
          <div className="profile">
            <h2>Update Profile</h2>
            <div className="pic-profile">
              {file ? <img src={URL.createObjectURL(file)} alt="profile" /> : <img src={employee[0].PhotoURL} alt="profile" />}
              <label htmlFor="fileInput">
                <FaUpload />
                <input type="file" id='fileinput' onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>
            <div className="profile">
              <form onSubmit={handleSubmit(onSubmitProfile)}>
                <div className="inputs">
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" name="username" {...register("username")} />
                </div>
                <div className="inputs">
                  <label htmlFor="email">Email: </label>
                  <input type="email" id="email" name="email" {...register("email")} />
                </div>
                <button type='submit'>Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
