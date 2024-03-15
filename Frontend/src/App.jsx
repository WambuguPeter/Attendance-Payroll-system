import {  Route, Routes} from "react-router-dom";
import './App.css'
import Login from "./Pages/Login";
// import Major from "./Pages/Major";
import MainClient from "./Employee/Layouts/MainClient";
import MainContainer from "./Admin/Layouts/MainContainer";
import Major from "./Pages/Major";



function App() {

  return (
    <Routes>

      <Route path="/" element={<Login/>} />
      {/* <Route path="*" element={<Major/>} /> */}

      <Route path='*' element={<MainContainer/>}/>      
      <Route path='/MainClient/*' element={<MainClient/>}/>


    </Routes>     
    
  )
}

export default App
