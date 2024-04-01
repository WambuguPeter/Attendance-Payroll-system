import './Profile.scss'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetEmployeeByIDQuery, useUploadMutation, useUpdateEmployeeMutation  } from '../features/users/UserApi';
import { LoadingToast, ErrorToast } from '../Components/Toster' // Assuming you have these components for displaying loading and error messages

const Profile = () => {
  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;
// console.log('employeeID', employeeID)
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
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (validTypes.indexOf(file.type) === -1) {
        setFile(null);
        ErrorToast('File format is incorrect use .jpeg, .pnp or .jpg')
      } else if (file.size > 1024 * 1024 * 5) {
        setFile(null);
        ErrorToast('File size is too large')
      } else {
        return true;
      }
    }
  }
  useEffect(() => {
    validateImage(file)
  }, [file]);


  if (isLoading) {
      return <LoadingToast message="Loading" />;
  }

  if (isError || !employee) {
      return <ErrorToast message="Failed to fetch employee details" />;

  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', file);

    return await upload(formData).unwrap();
  }

  const onSubmitProfile = async (data) => {
    LoadingToast(true);
    const { imageUrl } = await uploadImage();

    if (imageUrl) {
      data.img_url = imageUrl;
      data.id = employeeDetails.id;
      const res = await updateUser(data).unwrap();
      if (res.message) {
        updateemployeeDetails(data);
        LoadingToast(false);
        SuccessToast(res.message)
      }

    } else {
      LoadingToast(false);
      ErrorToast('Image upload failed')
    }
    LoadingToast(false);
  }
    return (
      <div>
        <div className="header1">
        <h1>Profile.</h1>
         <div className="generate1">
           <button className={switchTab == false ? "generate" : "visit-profileBtn"} onClick={() => setSwitchTab(!switchTab)}> 
           {switchTab == true ? "View" : "Update"}
           </button>
         </div>
       </div>
       {switchTab == false ? (
      <div className="content2">
      <h2>Profile</h2>
      <div className="mydetails">
        <div className="left">
        {employee[0].PhotoURL ? <img src={employee[0].PhotoURL} alt="nopic" /> : <img src="https://via.placeholder.com/150" alt="profile" /> }
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
       ):(
        <div className="update-profile">
          <div className="profile">
            <h2>Update Profile</h2>
            <div className="pic-profile">
              {
               file ? <img src={URL.createObjectURL(file)} alt="profile" /> : <img src={employee[0].PhotoURL} /> 
              }
              <label htmlFor="fileInput">
                <img src="" alt="uploadIcon" />
                <input type="file" id='fileinput' onChange={(e)=> setFile(e.target.files[0])} />
              </label>
            </div>
            <div className="profile">
              <form onSubmit={handleSubmit(onSubmitProfile)}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" {...register("username")} />
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name="email" {...register("email")} />
                <input type="submit" value="Update Profile" />
              </form>
            </div>
          </div>
        </div>
       )}

      
     </div>
    );    
};

export default Profile;


