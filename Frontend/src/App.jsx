import {  Route, Routes} from "react-router-dom";
import './App.css'
import Login from "./Pages/Login";
import Major from "./Pages/Major";





function App() {

  return (
    <Routes>

      <Route path="/" element={<Login/>} />
      <Route path="*" element={<Major/>} />

      {/* {admin=true ? ( <Route path="/MainContainer" element={<MainContainer/>} />)
      :(<Route path="/*" element={<MainClient/>} />)} */}
      

    

    </Routes>     
    
  )
}

export default App
