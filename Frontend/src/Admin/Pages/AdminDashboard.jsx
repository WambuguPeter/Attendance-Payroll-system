import './AdminDashboard.scss'
import Counts from '../Components/Counts'

const AdminDashboard = () => {
    
  return (
    <div className='adminDashboard'>

      <div className="header11">
        <h1>Admin Dashboard!</h1>
        <div className="generate">
          <span>Generate</span>
        </div>
      </div>
               
        <Counts />


        
    </div>
  )
}

export default AdminDashboard