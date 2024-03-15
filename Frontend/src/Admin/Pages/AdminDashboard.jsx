import './AdminDashboard.scss'
import Counts from '../Components/Counts'
// import GroupedBarGraph from '../Components/GroupBarGraph'
import graph from '../assets/images/graph1.png'

const AdminDashboard = () => {
    
  return (
    <div className='adminDashboard'>

      <div className="header1">
        <h1>Admin Dashboard!</h1>
        <div className="generate">
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