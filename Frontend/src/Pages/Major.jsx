import React from 'react'
import MainClient from '../Employee/Layouts/MainClient'
import MainContainer from '../Admin/Layouts/MainContainer'
// import { useNavigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'

const Major = () => {
    // const navigate = useNavigate();

  return (
    <div>
        <Routes>
         {/* {admin=true ? ( <Route path="/MainContainer" element={<MainContainer/>} />)
      :(<Route path="/MainClient" element={<MainClient/>} />)} */}
            <Route path='/MainContainer/*' element={<MainContainer/>}/>
            <Route path='/MainClient/*' element={<MainClient/>}/>
        </Routes>

    </div>
  )
}

export default Major