import {  Route, Routes} from "react-router-dom";
import './App.css'
import Login from "./Pages/Login";
import MainClient from "./Employee/Layouts/MainClient";
import MainContainer from "./Admin/Layouts/MainContainer";

// import LoginAdmin from "./Pages/LoginAdmin";
// import EmpAttendance from "./Employee/Pages/EmpAttendance";
// import EmpDashboard from "./Employee/Layouts/EmpDashboard";
// import EmpPayroll from "./Employee/Pages/EmpPayroll";
// import Profile from "./Employee/Pages/EmpProfile";
// import Settings from "./Employee/Pages/EmpSettings";


function App() {

  return (
    <Routes>

      <Route path="/" element={<Login/>} />
      <Route path="/MainContainer" element={<MainContainer/>} />
      <Route path="/*" element={<MainClient/>} />

      {/* <Route path='/MainClient/E-Dashboard' element={<EmpDashboard />} />
      <Route path='/MainClient/E-Attendance' element={<EmpAttendance/>} />
      <Route path='/MainClient/E-Payroll' element={<EmpPayroll/>} />
      <Route path='/MainClient/E-profile' element={<Profile />} />
      <Route path='/MainClient/E-setting' element={<Settings />} />
           */}

    </Routes>     
    
  )
}

export default App
