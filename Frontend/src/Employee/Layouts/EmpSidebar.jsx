import './EmpSidebar.scss';
import Menu from '../Components/Menu';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='sidenav'>
      <div className="emphome" onClick={ () => navigate("/MainClient")} >
        <h2>DASHBOARD</h2>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  )
}

export default Sidebar