import './Menu.scss'
import Dashboard from '../assets/images/Dashboard.png';
import Attendance from '../assets/images/Attendance.png';
import Payroll from '../assets/images/Payroll.png';

import { NavLink } from "react-router-dom";

function Menu() {
  const menuItems = [    
    {
      title: "Dashboard",
      icon: Dashboard,
      path: "/E-Dashboard"
    },
    {
      title: "Attendance",
      icon: Attendance,
      path: "/E-Attendance"
    },
    {
      title: "Payroll",
      icon: Payroll,
      path: "/E-Payroll"
    },
  ];

  return (
    
    <div className="menuMain">
      <div className="menu">
      <div className="heading">
        <h3>MENU</h3>
        </div>

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
