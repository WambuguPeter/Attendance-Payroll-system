import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Login from "./Pages/Login";
import MainContainer from "./Layouts/MainContainer";
import LoginAdmin from "./Pages/LoginAdmin";


function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Login/>} />
      <Route path="/LoginAdmin" element={<LoginAdmin/>} />
      <Route path="/MainContent" element={<MainContainer/>} />

    </Routes>     
    </BrowserRouter>
  )
}

export default App
