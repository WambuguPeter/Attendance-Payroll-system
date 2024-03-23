import './Navbar.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/images/logo.jpg'
import search from '../assets/images/search.png'
import msg from '../assets/images/message.png'
import notify from '../assets/images/notification.png'
import admin from '../assets/images/Admin2.jpg'
import dropdown from '../assets/images/chevron-down.png'
import menu from '../assets/images/menu.png'
import profile from '../assets/images/Profile.png'
import setting from '../assets/images/setting.png'
import logout from '../assets/images/logout1.png'



const Navbar = () => {
    const navigate = useNavigate();

    const [showDropDown, setShowDropDown] = useState(false);
    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    }


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
                    {/* <div className="count">2</div> */}
                </div>
                <div className="notify">
                    <img src={notify} alt="notify" />
                    {/* <div className="count">2</div> */}
                </div>
                <div className="avator">
                    <span className='user'>Staff</span>
                    <img src={admin} alt="avater" />
                </div>
                <div className="dropdown" onClick={toggleDropDown}>                    
                    <img src={dropdown} alt="dropdown" />
                    {showDropDown && (
                        <div className='dropdownitems'> 
                            <div className="item" 
                                onClick={() => {
                                    navigate("/profile")
                                }}>
                                    <img src={profile} alt="nopic" />
                                    <span>Profile</span>
                            </div>
                            <div className="item"
                                onClick={() => {
                                    navigate("/setting")
                                }}>
                                    <img src={setting} alt="nopic" />
                                    <span>Setting</span>
                            </div>
                            <div className="item"
                                onClick={() => {
                                    navigate("/")
                                }}>
                                    <img src={logout} alt="nopic" />
                                    <span>LogOut</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Navbar