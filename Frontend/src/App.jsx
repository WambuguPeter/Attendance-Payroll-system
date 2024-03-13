import {  Route, Routes} from "react-router-dom";
import './App.css'
import Login from "./Pages/Login";
import MainClient from "./Employee/Layouts/MainClient";
import LoginAdmin from "./Pages/LoginAdmin";
import MainContainer from "./Admin/Layouts/MainContainer";


function App() {

  return (
    <Routes>

      <Route path="/" element={<Login/>} />
      <Route path="/MainContainer" element={<MainContainer/>} />
      <Route path="/MainClient" element={<MainClient/>} />

    </Routes>     
    
  )
}

export default App
