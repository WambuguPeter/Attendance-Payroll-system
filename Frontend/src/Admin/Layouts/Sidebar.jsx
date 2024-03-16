import React from 'react';
import './Sidebar.scss';
import Menu from '../Components/Menu';
import home from '../assets/images/Dashboard.png'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className='sidenav'>
      <div className="adminHome" onClick={() => navigate("/MainContainer")} >
      <img src={home} alt="nopic" />
      <h2 >DASHBOARD</h2>
      </div>
      
      <Menu />


    </div>
  )
}

export default Sidebar