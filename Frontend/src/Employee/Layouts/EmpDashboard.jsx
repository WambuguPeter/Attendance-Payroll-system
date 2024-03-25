import React, { useState, useEffect } from 'react';
import './EmpDashboard.scss';
import { useNavigate } from 'react-router-dom';
import emp from '../assets/images/emp1.jpg';
import graph from '../assets/images/graph1.png';
import AttendList from '../Components/AttendList';
import EmployeeAttendanceChart from '../Components/BarGraph';
import { useAddAttendancesMutation, useUpdateAttendanceMutation } from '../../Admin/features/Attendance/AttendanceApi'; // Adjust the import path accordingly

const EmpDashboard = () => {
  const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
  const employeeID = employeeDetails ? employeeDetails.EmployeeID : null;
  // console.log(employeeID)

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTimeIn, setIsTimeIn] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [addAttendance] = useAddAttendancesMutation();
  const [updateAttendance] = useUpdateAttendanceMutation(employeeID);
  const navigate = useNavigate();

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleTimeIn = () => {
    const attendanceData = {
      EmployeeID: employeeID,
      Date: new Date().toISOString(),
      // date: currentTime.toLocaleTimeString(),
      TimeIn: currentTime.toLocaleTimeString(),
      TimeOut: null,
    };
    console.log(attendanceData)

    addAttendance(attendanceData)
      .unwrap()
      .then(() => {
        setIsTimeIn(false);
        setIsTimeOut(true);
      })
      .catch(error => console.error('Error adding attendance:', error));
  };

  const handleTimeOut = () => {
    const attendanceData = {
      EmployeeID: employeeID,
      TimeOut: currentTime.toLocaleTimeString()
    };
    event.stopPropagation();

    updateAttendance(attendanceData)
      .unwrap()
      .then(() => {
        setIsTimeOut(true);
        setIsTimeIn(false);
      })
      .catch(error => console.error('Error updating attendance:', error));
  };

  return (
    <div className="empDashboard">
      <div className="header1">
        <h1>My Dashboard.</h1>
      </div>
      <div className="content1">
        <div className="leftContent">
          <div className="profile">
            <img src={emp} alt="Profile" />
            <div className="details">
              <span>Lydia Wanjiku</span>
              <span>Developer</span>
              <span>@ TillHappens Ltd.</span>
            </div>
          </div>
          <div className="clock">
            {!isTimeOut && (
              <span className="timeOut">
                <div className="time" onClick={handleTimeIn}>Time In</div>
                <div></div>
              </span>
            )}
            {isTimeOut && (
              <span className="timeOut">
                <div></div>
                <div className="time" onClick={handleTimeOut}>Time Out</div>
              </span>
            )}
            <div className='realTimer'>{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>
        <div className="rightContent">
          <div className="graph">
            {/* <h3>Attendance Graph</h3> */}
            <EmployeeAttendanceChart />
            {/* <img src={graph} alt="Attendance Graph" /> */}
          </div>
          <div className="attend">
            {/* <AttendList isTimeIn={isTimeIn} isTimeOut={isTimeOut} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;



// import './EmpDashboard.scss'
// import { useNavigate } from "react-router-dom"
// import emp from "../assets/images/emp1.jpg"
// import clock from "../assets/images/clock1.jpg"
// // import BarGraph from '../Components/BarGraph'
// // import { useState } from 'react'
// import graph from '../assets/images/graph1.png'
// import AttendList from '../Components/AttendList';

// const EmpDashboard = () => {
//   // const [ timeInVisible, setTimeInVisible]= useState(true);

//   // const handleTimeClock = () =>{
//   //   setTimeInVisible(!timeInVisible)
//   // }
  
//     const navigate = useNavigate();
    
//   return (
//     <div className='empDashboard'>
//       <div className="header1">
//         <h1>My Dashboard.</h1>
//         {/* <div className="generate">
//           <span>Generate</span>
//         </div> */}
//       </div>
//       <div className="content1">
//         <div className="leftContent">
//           {/* <div className='clock'>
//             <span className={timeInVisible ? 'timeIn' : 'timeOut'} onClick={handleTimeClock}>
//               {timeInVisible ? 'Time In' : 'Time Out'}
//             </span>
//             <img src='' alt='nopic' />
//             <span className={timeInVisible ? 'timeOut' : 'timeIn'} onClick={handleTimeClock}>
//               {timeInVisible ? 'Time Out' : 'Time In'}
//             </span>
//           </div> */}
//            <div className="profile">
//             <img src={emp} alt="nopic" />
//             <div className="details">
//               <span>Lydia Wanjiku</span>
//               <span>Developer</span>
//               <span>@ TillHappens Ltd.</span>
//             </div>
//           </div>
//           <div className="clock">
//             <span className='timeOut'>
//               <div className='time'>Time In</div>
//             <div></div>
//               </span>
//             <img className='clock1' src={clock} alt="nopic" />
//             <span className='timeOut'>
//               <div></div>
//               <div className='time'>Time Out</div>
//               </span>            
//           </div>
         
//         </div>
//         <div className="rightContent">
//           <div className="graph">
//             <h3>Attendance Graph</h3>
//             {/* <BarGraph /> */}
//             <img src={graph} alt="nopic" />
//           </div>
//           <div className="attend">
//             <AttendList />
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default EmpDashboard