import './AdminDashboard.scss'
import { useNavigate } from 'react-router-dom'
import Counts from '../Components/Counts'
// import GroupedBarGraph from '../Components/GroupBarGraph'
import graph from '../assets/images/graph1.png'

const AdminDashboard = () => {
  const navigate = useNavigate();
    
  return (
    <div className='adminDashboard'>

      <div className="header1">
        <h1>Admin Dashboard!</h1>
        <div className="generate" onClick={ () => navigate()}>
          <span>Generate</span>
        </div>
      </div>
      <div className="counts"><Counts /></div>
      <div className="charts">
        <div className="chart1">
        <img src={graph} alt="nopic" />
          {/* <GroupedBarGraph /> */}
        </div>
      </div>
               
        


        
    </div>
  )
}

export default AdminDashboard