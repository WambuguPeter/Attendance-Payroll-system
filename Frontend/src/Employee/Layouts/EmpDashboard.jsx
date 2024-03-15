import './EmpDashboard.scss'
import { useNavigate } from "react-router-dom"
import emp from "../assets/images/emp1.jpg"
import clock from "../assets/images/clock1.jpg"
// import BarGraph from '../Components/BarGraph'
// import { useState } from 'react'
import graph from '../assets/images/graph1.png'
import AttendList from '../Components/AttendList';

const EmpDashboard = () => {
  // const [ timeInVisible, setTimeInVisible]= useState(true);

  // const handleTimeClock = () =>{
  //   setTimeInVisible(!timeInVisible)
  // }
  
    const navigate = useNavigate();
    
  return (
    <div className='empDashboard'>
      <div className="header1">
        <h1>My Dashboard.</h1>
        {/* <div className="generate">
          <span>Generate</span>
        </div> */}
      </div>
      <div className="content1">
        <div className="leftContent">
          {/* <div className='clock'>
            <span className={timeInVisible ? 'timeIn' : 'timeOut'} onClick={handleTimeClock}>
              {timeInVisible ? 'Time In' : 'Time Out'}
            </span>
            <img src='' alt='nopic' />
            <span className={timeInVisible ? 'timeOut' : 'timeIn'} onClick={handleTimeClock}>
              {timeInVisible ? 'Time Out' : 'Time In'}
            </span>
          </div> */}
           <div className="profile">
            <img src={emp} alt="nopic" />
            <div className="details">
              <span>Lydia Wanjiku</span>
              <span>Developer</span>
              <span>@ TillHappens Ltd.</span>
            </div>
          </div>
          <div className="clock">
            <span className='timeOut'>
              <div className='time'>Time In</div>
            <div></div>
              </span>
            <img className='clock1' src={clock} alt="nopic" />
            <span className='timeOut'>
              <div></div>
              <div className='time'>Time Out</div>
              </span>            
          </div>
         
        </div>
        <div className="rightContent">
          <div className="graph">
            <h3>Attendance Graph</h3>
            {/* <BarGraph /> */}
            <img src={graph} alt="nopic" />
          </div>
          <div className="attend">
            <AttendList />
          </div>

        </div>
      </div>
    </div>
  )
}

export default EmpDashboard