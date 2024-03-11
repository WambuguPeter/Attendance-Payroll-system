import './Sidebar.scss';
import Menu from '../Components/Menu';

const Sidebar = () => {
  return (
    <div className='sidenav'>
      <div className="menu">
        <Menu />
      </div>
      <h1>SideNav</h1>
    </div>
  )
}

export default Sidebar