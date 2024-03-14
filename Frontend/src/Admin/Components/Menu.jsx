import './Menu.scss'
import Dashboard from '../assets/images/Dashboard.png';
import Employees from '../assets/images/user.png';
import Schedule from '../assets/images/Schedule.png';
import Attendance from '../assets/images/Attendance.png';
import Overtime from '../assets/images/clock.png';
import Payroll from '../assets/images/Payroll.png';

import { NavLink } from "react-router-dom";

function Menu() {
  const menuItems = [    
    {
      title: "Dashboard",
      icon: Dashboard,
      path: "/MainContainer/Dashboard"
    },
    {
      title: "Employees",
      icon: Employees,
      path: "/MainContainer/Employees"
    },
    {
      title: "Schedule",
      icon: Schedule,
      path: "/MainContainer/Schedule"
    },
    {
      title: "Attendance",
      icon: Attendance,
      path: "/MainContainer/Attendance"
    },
    {
      title: "Overtime",
      icon: Overtime,
      path: "/MainContainer/Overtime"
    },
    {
      title: "Payroll",
      icon: Payroll,
      path: "/MainContainer/Payroll"
    },
  ];

  return (
    
    <div className="menuMain">
      
      <div className="menu">
        <div className="heading">
        <h4>MENU</h4>
        </div>
      
        {menuItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <NavLink
              to={item.path}
              className="menu-link"
              activeclassname="active"
            >
              <div className="menu-left">
                <img src={item.icon} alt={item.title} />
                <p className="titles">{item.title}</p>
                {item.value && (
                  <span
                    className="badge"
                    style={{ backgroundColor: "rgb(230, 57, 137)" }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        ))}
      </div>
        
    </div>
    
  );
}

export default Menu;
