import './EmpSidebar.scss';
import Menu from '../Components/Menu';
import { useNavigate } from 'react-router-dom';
import home from "../assets/images/Dashboard.png"
const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='sidenav'>
      <div className="emphome" onClick={ () => navigate("/MainClient")} >
        <img src={home} alt="" />
        <h2>DASHBOARD</h2>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  )
}

export default Sidebar