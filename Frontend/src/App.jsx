import {  Route, Routes} from "react-router-dom";
import './App.css'
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/RecoverPassword";
import MainClient from "./Employee/Layouts/MainClient";
import MainContainer from "./Admin/Layouts/MainContainer";
import NotFound from './Pages/NotFound'
import { ToasterContainer } from "./Admin/Components/Toster";



function App() {

  return (
    <>    
       <ToasterContainer />     
      
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/MainContainer/*' element={<MainContainer/>}/>      
      <Route path='/MainClient/*' element={<MainClient/>}/>
      <Route path='*' element={<NotFound />} />
    </Routes>     
    </>
    
  )
}

export default App
