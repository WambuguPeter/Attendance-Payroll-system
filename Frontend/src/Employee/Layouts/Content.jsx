import './Content.scss'
import { useNavigate } from "react-router-dom"

const Content = () => {
    const navigate = useNavigate();
    
  return (
    <div className='content'>
               
        <h1>Welcome to the Employee Dashboard!!</h1>
        <button onClick={() => navigate('/')}>logout</button>
    </div>
  )
}

export default Content