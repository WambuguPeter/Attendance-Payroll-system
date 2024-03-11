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
      path: "/Dashboard"
    },
    {
      title: "Employees",
      icon: Employees,
      path: "/Employees"
    },
    {
      title: "Schedule",
      icon: Schedule,
      path: "/Schedule"
    },
    {
      title: "Attendance",
      icon: Attendance,
      path: "/Attendance"
    },
    {
      title: "Overtime",
      icon: Overtime,
      path: "/Overtime"
    },
    {
      title: "Payroll",
      icon: Payroll,
      path: "/Payroll"
    },
  ];

  return (
    
    <div className="menuMain">
      <h4>MENU</h4>
      <div className="menu">
        {menuItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <NavLink
              to={item.path}
              className="menu-link"
              activeClassName="active"
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
