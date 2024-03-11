import React from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();


  return (
    <div className='loginPage'>
        <div className="login-card">
        <h1>Staff Portal</h1>
        <form >
            <input type="text" placeholder='Enter the Employee ID' />
            <input type="text" placeholder='Password' />
        </form>
        <div className="loginbtns">
        <button onClick={() => navigate('/LoginAdmin')} >As Admin</button>
        <button onClick={() => navigate('/MainContent')} >Login</button>

        </div>
            
        </div>
    </div>
  )
}

export default Login