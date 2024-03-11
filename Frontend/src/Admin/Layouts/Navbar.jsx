import './Navbar.scss'

import logo from '../assets/images/logo.jpg'
import search from '../assets/images/search.png'
import msg from '../assets/images/message.png'
import notify from '../assets/images/notification.png'
import admin from '../assets/images/Admin2.jpg'
import dropdown from '../assets/images/chevron-down.png'
import menu from '../assets/images/menu.png'



const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navLeft">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="companyName">
                <h1>T-HAPPENS</h1>
            </div>
            <div className="menu">
                <img src={menu} alt="menu" />
            </div>
        </div>
        <div className="navRight">
            <div className="search">
                <img src={search} alt="search" />
                <input type="text" placeholder=' Search...' />
            </div>
            <div className="rightend">
                <div className="msg">
                    <img src={msg} alt="msg" />
                    <div className="count">2</div>
                </div>
                <div className="notify">
                    <img src={notify} alt="notify" />
                    <div className="count">2</div>
                </div>
                <div className="avator">
                    <span className='user'>Admin</span>
                    <img src={admin} alt="avater" />
                </div>
                <div className="dropdown">                    
                    <img src={dropdown} alt="dropdown" />
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Navbar