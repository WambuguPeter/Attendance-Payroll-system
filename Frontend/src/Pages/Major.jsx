import React from 'react'
import MainClient from '../Employee/Layouts/MainClient'
import MainContainer from '../Admin/Layouts/MainContainer'
import { Route, Routes } from 'react-router-dom'

const Major = () => {

  return (
    <div>
        <Routes>
            <Route path='/MainContainer/*' element={<MainContainer/>}/>
            <Route path='/MainClient/*' element={<MainClient/>}/>
        </Routes>

    </div>
  )
}

export default Major