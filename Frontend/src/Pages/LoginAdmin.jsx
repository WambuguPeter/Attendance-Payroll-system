import './LoginAdmin.scss'
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const navigate = useNavigate();

  return (
    <div className='loginPage'>
        <div className="login-card">
            <h1>Admin Portal</h1>
            <form >
                <input type="text" placeholder='Enter the Employee ID' />
                <input type="text" placeholder='Password' />
            </form>
            <div className="loginbtns">
                <button onClick={() => navigate('/')} >As Staff</button>
                <button onClick={() => navigate('/MainContent')} >Login</button>
            </div>
      
        </div>
    </div>
  )
}

export default LoginAdmin